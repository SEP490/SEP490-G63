import Error from '~/components/shared/Error/Error'
import { RouteType } from './type'
const routers: RouteType[] = [{ path: '*', element: Error }]
export { routers }
