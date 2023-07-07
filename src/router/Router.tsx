import { RouteProps } from '../shared/interface'
import usePath from './hooks/usePath'

interface RouterProps {
  children: React.ReactElement<RouteProps>[]
}
export const Router = ({ children }: RouterProps) => {
  const currentPath = usePath()
  return (
    <>
      {children?.map((router: React.ReactElement<RouteProps>) => {
        if (router.props.path == currentPath) return router
      })}
    </>
  )
}
