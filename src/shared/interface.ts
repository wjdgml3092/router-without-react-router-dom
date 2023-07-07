export interface RouteProps {
  path: string
  component: React.ReactNode
}

export interface RouterProps {
  children: React.ReactElement<RouteProps>[]
}
