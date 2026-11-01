(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ── 영업 상태: 서울 시간 기준 ── */
  var OPEN = 600, BREAK_START = 900, BREAK_END = 960, LAST = 1220, CLOSE = 1260; // 분 단위

  function seoulNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(map.weekday);
    return { day: day, min: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10) };
  }

  function statusText(now) {
    var d = now.day, m = now.min;
    if (d === 0) return { state: "closed", main: "오늘은 정기휴무입니다", sub: "월요일 10:00에 문을 엽니다" };
    if (m < OPEN) return { state: "closed", main: "영업 전", sub: "오늘 10:00에 문을 엽니다" };
    if (m < BREAK_START) return { state: "open", main: "지금 영업 중", sub: "15:00부터 브레이크타임" };
    if (m < BREAK_END) return { state: "break", main: "브레이크타임", sub: "16:00에 다시 엽니다" };
    if (m < LAST) return { state: "open", main: "지금 영업 중", sub: "라스트오더 20:20" };
    if (m < CLOSE) return { state: "last", main: "주문 마감", sub: "21:00 영업 종료" };
    return { state: "closed", main: "영업 종료", sub: d === 6 ? "월요일 10:00에 문을 엽니다" : "내일 10:00에 문을 엽니다" };
  }

  function paintStatus() {
    var now = seoulNow();
    var s = statusText(now);
    document.querySelectorAll("[data-status]").forEach(function (el) {
      el.dataset.state = s.state;
      el.querySelector(".status-main").textContent = s.main;
      el.querySelector(".status-sub").textContent = s.sub;
      el.hidden = false;
    });
    var week = document.querySelector(".hours tr[data-week]");
    var sun = document.querySelector(".hours tr[data-sun]");
    if (week) week.classList.toggle("is-today", now.day !== 0);
    if (sun) sun.classList.toggle("is-today", now.day === 0);
  }
  try { paintStatus(); setInterval(paintStatus, 60000); } catch (e) { /* 상태 표시는 선택 사항입니다 */ }

  if (!("IntersectionObserver" in window)) return;

  /* ── 첫 화면을 지나면 머리글에 바탕을 깔고, 휴대폰 하단 예약 바를 보여 줍니다 ── */
  var head = document.querySelector(".head");
  var dock = document.querySelector(".dock");
  var hero = document.querySelector(".hero");
  var heroActions = document.querySelector(".hero-actions");
  if (head && hero) {
    new IntersectionObserver(function (en) {
      head.classList.toggle("is-solid", en[0].intersectionRatio < 0.92);
    }, { threshold: [0, 0.92] }).observe(hero);
  }
  if (dock && heroActions) {
    new IntersectionObserver(function (en) {
      var past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      dock.classList.toggle("is-on", past);
      dock.setAttribute("aria-hidden", past ? "false" : "true");
      dock.querySelectorAll("a").forEach(function (a) { a.tabIndex = past ? 0 : -1; });
    }).observe(heroActions);
  }

  /* ── 메뉴 분류: 지금 보고 있는 분류를 표시합니다 ── */
  var links = {};
  document.querySelectorAll(".cats a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var catIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      Object.keys(links).forEach(function (id) { links[id].removeAttribute("aria-current"); });
      var a = links[en.target.id];
      if (a) {
        a.setAttribute("aria-current", "true");
        a.parentNode.scrollTo({ left: Math.max(0, a.offsetLeft - 24) });
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll(".cat").forEach(function (c) { catIO.observe(c); });

  /* ── 주소 복사 ── */
  var copyBtn = document.querySelector("[data-copy]");
  if (copyBtn && navigator.clipboard) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", function () {
      var label = copyBtn.querySelector("span");
      navigator.clipboard.writeText(copyBtn.dataset.copy).then(function () {
        label.textContent = "복사했습니다";
        setTimeout(function () { label.textContent = "주소 복사"; }, 2200);
      }, function () { label.textContent = "복사하지 못했습니다"; });
    });
  }
})();
