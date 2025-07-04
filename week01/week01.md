## 리액트 1주차 정리
--------------------
- ### 리액트란?
기본적으로 **싱글 페이지 애플리케이션(SPA)** 구조를 따르며, 페이지 전체를 새로고침하지 않고 필요한 부분만 **리렌더링**함으로써 빠르고 부드러운 사용자 경험(UX)을 제공하는 라이브러리이다.


- 리액트의 실행 환경
  리액트는 다양한 빌드 도구와 함께 사용할 수 있으며, 최근에는 **Vite**라는 최신 프론트엔드 빌드 도구를 많이 사용한다.  
  Vite는 기존의 CRA(Create React App)보다 훨씬 빠른 번들링과 **HMR(Hot Module Replacement)**을 지원하여 개발 효율성이 높다.
  주로 컴포넌트 기반(button, nav, sidebar) 등등을 컴포넌트화 시켜 필요할 때마다 가져다가 쓸 수 있다.

- 리액트에서 알아둬야할 기본 개념
  props와 state라는 개념이 있다. 간단히 말하자면 props는 properties의 줄임말, 즉 html 태그에 속성에 들어가는 값으로, 외부에서 정의한 컴포넌트를
  만들어서 쓸 때 같이 넣어주는 값인데, 이 값은 컴포넌트 함수나 파일 내부 안에선 변경할 수 없다.
  부모 → 자식으로 데이터를 전달할 때 사용됨
  
  state는 컴포넌트 내에서 선언하고 다루는 값으로, 이 값은 애초에 컴포넌트 내부에서 선언되었기 때문에 자유롭게 핸들링이 가능하다.
  `import {useState} from 'react'` 이런식으로 선언 후,
  `const [a, setA] = useState("")` (보통은 [변수이름, set(변수이름)])이런식으로 파이썬의 언패킹 식으로 사용되며, useState()안의 매개변수로
  다루는 값의 타입과 초깃값을 지정한다. a는 그 값이 할당된 변수, setA는 함수로 a의 값을 바꾸는 함수이며 두가지 방식으로 사용이 되는데
    1.setA("1") 이런식으로 값을 지정하거나
    2.setA((prev) => !prev) 이런식으로 함수를 지정해서 사용하기도 한다.
  state 값이 변경되면 해당 컴포넌트는 자동으로 리렌더링되므로, 동적인 UI 구현에 핵심적인 역할을 한다
  set(변수명)의 활용도는 생각보다 엄청 다양하다.
  
  `const [formData, setFormData] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    height : "",
    weight : ""
  })`
  이런식으로도 가능!
  
### 설치하는 방법

1. `npm create vite@latest my-app -- --template react`  
   → 터미널에 입력하면 Vite 기반의 React 프로젝트를 생성합니다.  
   여기서:
   - `create`는 “새 프로젝트를 만들어줘!”라는 뜻
   - `vite@latest`는 최신 버전의 Vite를 사용하겠다는 의미
   - `my-app`은 생성할 프로젝트 폴더 이름
   - `--template react`는 “React 템플릿으로 만들어줘” 라는 설정입니다.

2. `cd my-app`  
   → 생성된 프로젝트 폴더로 이동합니다.

3. `npm install`  
   → 명세서(package.json)에 따라 필요한 패키지를 설치합니다.

### 전체적인 구조

frontend 안에는
- index.html
index.html의 <div id="root">에 main.jsx를 통해 전체 앱을 렌더링한다.

- main.jsx
리액트 앱의 진입점(Entry Point) 역할을 하는 파일
ReactDOM이 App 컴포넌트를 index.html에 렌더링하는 코드가 있음

- app.jsx
전체 앱의 중심 컴포넌트
라우팅이 들어가면 여기서 <Routes>와 <Route>들을 배치하게 됨
또는 초기에는 하위 컴포넌트들을 여기에 불러와서 렌더링함

- index.css
앱 전체에 적용되는 전역 스타일 파일
예: body, html, * 셀렉터 등의 공통 스타일
main.jsx에서 import './index.css'로 불러옴
페이지/컴포넌트 단위 스타일과는 구분됨

- app.css
보통 App.jsx에만 적용되는 CSS
컴포넌트 단위 스타일링 (모듈 스타일링 아님)
보통 컴포넌트 단위는 이렇게 파일하나하나 css를 넣음

- pages/
페이지 단위 구성요소를 넣는 폴더
예: HomePage, LoginPage, MyClosetPage 등
- components/
재사용 가능한 UI 조각들을 넣는 폴더
예: 버튼, 네비게이션바, 카드, 폼 등

- assets/
이미지, 아이콘, 폰트, 동영상 등의 정적 리소스를 저장
예: 로고 이미지, 백그라운드 이미지
