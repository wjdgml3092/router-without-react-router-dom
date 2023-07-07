import { useEffect, useState } from 'react'

const usePath = () => {
  const [path, setPath] = useState(window.location.pathname)

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
