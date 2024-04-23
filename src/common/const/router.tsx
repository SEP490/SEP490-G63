import Error from '~/components/shared/Error/Error'
import { RouteType } from './type'
import NavBar from '~/components/Navbar'
const routers: RouteType[] = [
  { path: '*', element: Error },
  { path: '/', element: NavBar }
]
export { routers }
