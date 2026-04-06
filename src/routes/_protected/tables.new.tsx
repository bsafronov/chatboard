import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tables/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tables/new"!</div>
}
