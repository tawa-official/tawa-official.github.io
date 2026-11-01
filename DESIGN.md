---
name: 타와 田和 (TAWA)
description: 시청역 숯불 장어덮밥 · 나고야식 히츠마부시 전문점의 홈페이지 — 옻칠 찬합처럼 검고 고요한 바탕 위에 음식 사진이 빛나는 프리미엄 원페이지.
colors:
  lacquer: "#121010"
  lacquer-raised: "#1a1716"
  text: "#ece5d8"
  text-muted: "#b4aa9a"
  text-faint: "#8d8476"
  washi: "#f1efeb"
  washi-deep: "#e7e4de"
  ink: "#1b1816"
  ink-muted: "#57504a"
  ink-faint: "#6f675e"
  shu: "#b03a26"
typography:
  display:
    fontFamily: "Hahmlet, Apple SD Gothic Neo, serif"
    fontSize: "clamp(36px, 6.2vw, 84px)"
    fontWeight: 300
    lineHeight: 1.18
    letterSpacing: "-0.03em"
  heading:
    fontFamily: "Hahmlet, Apple SD Gothic Neo, serif"
    fontSize: "clamp(30px, 4.4vw, 56px)"
    fontWeight: 300
    lineHeight: 1.32
    letterSpacing: "-0.02em"
  dish-name:
    fontFamily: "Hahmlet, serif"
    fontSize: "19px"
    fontWeight: 500
    lineHeight: 1.32
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Noto Sans KR, Apple SD Gothic Neo, Malgun Gothic, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: "-0.005em"
  label-jp:
    fontFamily: "Shippori Mincho, serif"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.12em"
  wordmark:
    fontFamily: "Shippori Mincho, serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.42em"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 5vw, 80px)"
  section: "clamp(96px, 14vw, 180px)"
  row: "20px"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.lacquer}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "52px"
  button-primary-on-washi:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.washi}"
    rounded: "{rounded.none}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    borderColor: "rgba(236,229,216,.38)"
    rounded: "{rounded.none}"
  recommend-mark:
    textColor: "{colors.shu}"
    fontSize: "11px"
---

# Design System: 타와 田和

## Overview

찬합(重箱)을 위에서 내려다본 모습이 이 사이트의 세계입니다. 바깥은 검은 옻칠, 안쪽은 빛나는 음식. 사진이 모든 것을 말하고, 화면 장치는 1px 선과 여백으로 물러납니다. 사장님이 정한 기준은 "고급 · 프리미엄"이며, 붓글씨 글꼴·나무 무늬·과한 일본풍 장식은 촌스럽다고 거절된 방향입니다.

## Colors

### Primary
- **Lacquer `#121010`** — 페이지 바탕. 찬합의 먹빛 옻칠.
- **Text `#ece5d8`** — 바탕 위 글자와 주 버튼. 순백이 아닌 따뜻한 미색.

### Secondary
- **Washi `#f1efeb`** — 메뉴 구역만의 바탕. 매장 메뉴판의 화지 색과 같아서 요리 사진의 배경과 이어집니다.

### Tertiary
- **Shu `#b03a26`** — 찬합 안쪽의 주홍. '추천' 표시, 인용문 위 짧은 선, 영업시간의 '오늘' 표시에만 씁니다.

### Neutral
- text-muted `#b4aa9a`, text-faint `#8d8476` (먹빛 위 보조 글자), ink `#1b1816`, ink-muted `#57504a`, ink-faint `#6f675e` (화지 위 글자).

### Named Rules
- **One drop of shu.** 주홍은 한 화면에 한두 군데, 작은 크기로만. 버튼이나 넓은 면에 쓰지 않습니다.
- **No gold.** 금색은 쓰지 않습니다. 고급스러움은 절제와 여백에서 나옵니다.

## Typography

제목은 Hahmlet Light(300), 본문은 Noto Sans KR, 일본어 부제와 TAWA 워드마크는 Shippori Mincho. 모든 글꼴은 `assets/fonts/`에서 직접 제공합니다.

### Hierarchy
- Display(첫 화면 제목) clamp(36–84px) / 300 / -0.03em
- Heading(구역 제목) clamp(30–56px) / 300
- Dish name 19px / 500
- Body 16px / 1.8
- Japanese label 12.5px / 0.12em 자간

### Named Rules
- **Light headlines, quiet labels.** 큰 제목은 가늘게, 작은 정보는 작고 차분하게. 굵고 큰 글씨로 외치지 않습니다.

## Layout

최대 폭 1280px, 좌우 여백 clamp(20px, 5vw, 80px), 구역 간격 clamp(96px, 14vw, 180px). PC 메뉴는 왼쪽에 분류 제목이 붙어 있고 오른쪽에 요리 목록이 흐르는 2단 구조이며, 상단에 분류 바로가기가 따라옵니다. 휴대폰은 한 줄 흐름에 하단 예약 바가 첫 화면 이후 나타납니다.

## Elevation & Depth

그림자를 쓰지 않습니다. 깊이는 사진과 1px 선(`rgba(236,229,216,.14)` / 화지 위 `rgba(27,24,22,.14)`)으로만 만듭니다. 예외는 첫 화면 사진 위의 어둡게 깔리는 막(글자 가독성용)과 고정 머리글·하단 바의 반투명 바탕입니다.

## Shapes

모서리는 모두 직각(0px). 둥근 것은 영업 상태 점뿐입니다.

## Components

### Buttons
- 주 버튼: 미색 바탕 + 먹색 글자, 높이 52px, 직각. 화지 구역에서는 반전(먹색 바탕).
- 보조 버튼: 투명 + 미색 1px 테두리.
- 머리글 '예약': 작은 테두리 버튼, 마우스를 올리면 채워집니다.

### Menu row
76/96px 정사각 사진 · 요리 이름(+특/중/소, 추천) · 가격(오른쪽, 고정폭 숫자) · 일본어 부제 · 설명. 위아래 1px 선.

## Do's and Don'ts

- Do: 사장님이 준 실제 사진과 문장만 씁니다. 메뉴판·안내판에 보이는 '無和' 글자는 잘라 냅니다.
- Do: 가격은 메뉴판 그대로, 원 단위 숫자만.
- Don't: 붓글씨 글꼴, 나무 무늬, 그라데이션 장식, 그림자, 금색.
- Don't: 제목 위 작은 영문 라벨(eyebrow), 이모지 아이콘.
