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

  var EN = (document.documentElement.lang || "").indexOf("en") === 0;
  var T = EN ? {
    sunday: ["We're closed on Sundays", "Opens Monday at 10:00"],
    before: ["Not open yet", "Opens today at 10:00"],
    lunch: ["Open now", "Break time from 15:00"],
    brk: ["Break time", "Reopens at 16:00"],
    dinner: ["Open now", "Last order 20:20"],
    last: ["Last order has passed", "Closes at 21:00"],
    closed: "Closed for today", toMon: "Opens Monday at 10:00", toTmr: "Opens tomorrow at 10:00",
    copy: "Copy address", copied: "Copied", copyFail: "Couldn't copy"
  } : {
    sunday: ["오늘은 정기휴무입니다", "월요일 10:00에 문을 엽니다"],
    before: ["영업 전", "오늘 10:00에 문을 엽니다"],
    lunch: ["지금 영업 중", "15:00부터 브레이크타임"],
    brk: ["브레이크타임", "16:00에 다시 엽니다"],
    dinner: ["지금 영업 중", "라스트오더 20:20"],
    last: ["주문 마감", "21:00 영업 종료"],
    closed: "영업 종료", toMon: "월요일 10:00에 문을 엽니다", toTmr: "내일 10:00에 문을 엽니다",
    copy: "주소 복사", copied: "복사했습니다", copyFail: "복사하지 못했습니다"
  };

  function st(state, pair) { return { state: state, main: pair[0], sub: pair[1] }; }

  function statusText(now) {
    var d = now.day, m = now.min;
    if (d === 0) return st("closed", T.sunday);
    if (m < OPEN) return st("closed", T.before);
    if (m < BREAK_START) return st("open", T.lunch);
    if (m < BREAK_END) return st("break", T.brk);
    if (m < LAST) return st("open", T.dinner);
    if (m < CLOSE) return st("last", T.last);
    return { state: "closed", main: T.closed, sub: d === 6 ? T.toMon : T.toTmr };
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
        label.textContent = T.copied;
        setTimeout(function () { label.textContent = T.copy; }, 2200);
      }, function () { label.textContent = T.copyFail; });
    });
  }
})();
