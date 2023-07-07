# router-without-react-router-dom
react-router-dom 라이브러리 사용 X, History API 사용으로 라우터 구현하기

## Tech Stack
<p>
  <img src="https://img.shields.io/badge/TypeScript-5587ED?style=flat-square&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-squar&logo=react&logoColor=black"> 
</p>

<br /><br />
## 요구사항

**1) 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.**

- `/` → `root` 페이지
- `/about` → `about` 페이지

**2) 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.**

- 힌트) `window.onpopstate`, `window.location.pathname` History API(`pushState`)

**3) Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.**

```tsx
ReactDOM.createRoot(container).render(
  <Router>
    <Route path='/' component={<Root />} />
    <Route path='/about' component={<About />} />
  </Router>
);
```

**4) 최소한의 push 기능을 가진 useRouter Hook을 작성한다.**

```tsx
const { push } = useRouter();
```

<br />

## Directory

```
📦src
 ┣ 📂hooks
 ┃ ┗ 📜useRouter.tsx
 ┣ 📂router
 ┃ ┗ 📂hooks
 ┃ ┃ ┣ 📜usePath.tsx
 ┃ ┗ 📜Route.tsx
 ┃ ┗ 📜Router.tsx
 ┣ 📂pages
 ┃ ┣ 📜About.tsx
 ┃ ┗ 📜Root.tsx
 ┣ 📂shared
 ┃ ┣ 📜interface.ts
 ┣ 📜App.tsx
 ┣ 📜main.tsx

```
<br />

## 실행

```
npm install
npm run dev
```
<br />

## Code

**useRouter.tsx**
```
const useRouter = () => { //about, root 페이지에서 호출
  const push = (path: string) => { //각 페이지 버튼 클릭 시 해당 메소드 호출
    history.pushState(null, '', path)
    //pushState
    //첫번째 인자 state : 브라우저 이동 시 넘겨줄 데이터 (popstate 에서 받아서 원하는 처리를 해줄 수 있음)
    //두번째 인자 title : 변경할 브라우저 제목 (변경 원치 않으면 null)
    //세번째 인자 url : 변경할 주소
    window.dispatchEvent(new Event('onpopstate')) //dispatchEvent로 이벤트 객체만들어서 이벤트 호출
  }

  return { push } //push 메소드 반환
}

export default useRouter
```
<br />

**usePath.tsx**
```
import { useEffect, useState } from 'react'

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname) //현재 경로로 state 변수 초기화

  const updatePath = () => {
    //path state update
    setPath(window.location.pathname)
  }

  useEffect(() => {
    //popstate event 등록
    window.addEventListener('onpopstate', updatePath)
    return () => {
      window.removeEventListener('onpopstate', updatePath)
    }
  }, [])

  return path
}

export default usePath
```

라우터 관련 훅은 위에 2개다.


<br />

**Router.tsx**

```
export const Router = ({ children }: RouterProps) => {
  const currentPath = usePath() //현재 경로로 state 초기화하고, 이벤트등록하는 hooks

  return (
    <>
      {children?.map((router: React.ReactElement<RouteProps>) => {
        //props로 전달받은 chidren을 map 돌리면서 props.path와 현재 경로가 동일하다면 router 즉, <Route ~/> 컴포넌트 반환
        if (router.props.path == currentPath) return router
      })}
    </>
  )
}
```


Route.tsx
-> props로 받은 component를 그대로 JSX 삽입 밖에 하지 않는다.
