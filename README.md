# Wander Roll

필름 카메라로 담은 여행 사진 포트폴리오 — https://hogyuwart.github.io

빌드 도구 없이 HTML · CSS · JS만으로 된 정적 사이트예요. 디자인은 **Wander Roll 디자인 시스템**(Daylight / Darkroom 테마, 인화 사진·필름 스트립·스탬프 컴포넌트)을 따릅니다.

## 구조

```
index.html          홈 (히어로, 필름 스트립, 롤 목록, Picks, About)
pai.html            롤 페이지
bangkok.html
hawaii.html
404.html
assets/css/style.css   디자인 토큰 + 컴포넌트
assets/js/main.js      테마 토글, 라이트박스
assets/photos/         사진 (이름-800.jpg, 이름-1600.jpg)
.nojekyll
```

## 사진 추가하기

1. 사진을 긴 변 800px, 1600px 두 장으로 저장해 `assets/photos/`에 넣어요 (`장소-장면-800.jpg`, `장소-장면-1600.jpg`).
2. 롤 페이지의 `<div class="loose">` 안에 인화 사진 하나를 복사해 붙이고 파일명, `alt`, 캡션을 바꿔요.

```html
<figure class="print">
  <button type="button" data-full="assets/photos/pai-new-1600.jpg" data-cap="Pai, TH · 35mm" aria-label="크게 보기: 사진 설명">
    <img src="assets/photos/pai-new-800.jpg"
         srcset="assets/photos/pai-new-800.jpg 800w, assets/photos/pai-new-1600.jpg 1600w"
         sizes="(max-width: 600px) 100vw, 33vw" alt="사진 설명" loading="lazy">
  </button>
  <figcaption><span>Pai, TH</span><span>▸ 11A</span></figcaption>
</figure>
```

## 배포 (GitHub Pages)

1. GitHub에서 **`hogyuwart.github.io`** 라는 이름의 공개 저장소를 만들어요.
2. 이 폴더의 파일을 전부 저장소 루트에 올려요 (`.nojekyll` 포함).
   ```bash
   git init && git add . && git commit -m "Wander Roll 포트폴리오"
   git branch -M main
   git remote add origin https://github.com/hogyuwart/hogyuwart.github.io.git
   git push -u origin main
   ```
3. 저장소 **Settings → Pages → Build and deployment**에서 Source를 `Deploy from a branch`, Branch를 `main` / `/ (root)`로 두고 저장해요.
4. 1–2분 뒤 https://hogyuwart.github.io 에서 확인할 수 있어요.
