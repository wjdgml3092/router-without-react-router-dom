# router-without-react-router-dom
react-router-dom 라이브러리 사용 X, History API 사용으로 라우터 구현하기

### Tech Stack
<p>
  <img src="https://img.shields.io/badge/TypeScript-5587ED?style=flat-square&logo=TypeScript&logoColor=white"/> 
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-squar&logo=react&logoColor=black"> 
</p>

### Directory
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

### Code

useRouter.tsx
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

usePath.tsx
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

Router.tsx
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
