import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../context/authProvider.tsx'
import { ProtectedRoute } from './ProtectedRouter.tsx'
import { lazy, Suspense } from 'react'
import { permissionObject } from '~/common/const/permissions.ts'
import { ADMIN, USER } from '~/common/const/role.ts'

const ContractHistory = lazy(() => import('~/pages/Admin/ContractHistory.tsx'))
const AdminOfficer = lazy(() => import('~/middleware/AdminOfficer/index.tsx'))
const UserLayout = lazy(() => import('~/layout/UserLayout/index.tsx'))
const Error = lazy(() => import('~/components/shared/Error/Error.tsx'))
const AdminLayout = lazy(() => import('~/layout/AdminLayout/index.tsx'))
const StaffOfficer = lazy(() => import('~/middleware/StaffOfficer/index.tsx'))
const Sale = lazy(() => import('~/middleware/Sale/index.tsx'))
const Login = lazy(() => import('~/components/Login.tsx'))
const Logout = lazy(() => import('~/components/Logout.tsx'))
const Employee = lazy(() => import('~/pages/Admin/Employee.tsx'))
const HomeUser = lazy(() => import('~/pages/User/HomeUser.tsx'))
const Profile = lazy(() => import('~/pages/Profile.tsx'))
const OldContract = lazy(() => import('~/pages/Admin/OldContract.tsx'))
const Contract = lazy(() => import('~/pages/Admin/Contract.tsx'))
const CreateContract = lazy(() => import('~/pages/Admin/CreateContract.tsx'))
const TemplateContract = lazy(() => import('~/pages/Admin/TemplateContract.tsx'))
const SendMailContract = lazy(() => import('~/components/Admin/NewContract/SendMailContract.tsx'))
const ViewSignContract = lazy(() => import('~/pages/BasePage/ViewSignContract.tsx'))
const SearchPage = lazy(() => import('~/pages/Admin/Search/SearchPage.tsx'))
const SearchPageResult = lazy(() => import('~/pages/Admin/Search/SearchPageResult.tsx'))
const DashboardSale = lazy(() => import('~/components/Dashboard/DashboardSale.tsx'))
const AppendicesContract = lazy(() => import('~/pages/Admin/Appendices/AppendicesContract.tsx'))
const CreateAppendices = lazy(() => import('~/components/Admin/Appendices/CreateAppendices.tsx'))
const TypeContract = lazy(() => import('~/pages/Admin/TypeContract.tsx'))
const LoadingPage = lazy(() => import('~/components/shared/LoadingPage/LoadingPage.tsx'))
const Dashboard = lazy(() => import('~/pages/Admin/Dashboard.tsx'))
const Routes = () => {
  const { token, user } = useAuth()
  let routes: Array<any>

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <SearchPage />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/dashboard',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Dashboard />
            </Suspense>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <ViewSignContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <SearchPageResult />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Profile />
              </AdminLayout>
            </Suspense>
          )
        },

        {
          path: '/send-mail/:id/:type',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <SendMailContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/employee',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Employee />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/old-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <OldContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/template-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <TemplateContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/type-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <TypeContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Contract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/create',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <CreateContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/history/:id',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <ContractHistory />
              </AdminLayout>
            </Suspense>
          )
        },

        {
          path: '/logout',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminLayout>
                <Logout />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <AdminLayout>
              <Error />
            </AdminLayout>
          )
        }
      ]
    }
  ]
  const routesForAdminOfficer = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <SearchPage />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <Profile />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <SearchPageResult />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/send-mail/:id/:type',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <SendMailContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/type-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <TypeContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <ViewSignContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/employee',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <Employee />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/old-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <OldContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/template-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <TemplateContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <Contract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/create',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <CreateContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/logout',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <AdminOfficer>
                  <Logout />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Error />
              </AdminOfficer>
            </UserLayout>
          )
        }
      ]
    }
  ]
  const routesForSale = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <DashboardSale />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <CreateAppendices />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <AppendicesContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <Profile />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <ViewSignContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <SearchPageResult />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/send-mail/:id/:type',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <SendMailContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/type-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <TypeContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/old-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <OldContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/template-contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <TemplateContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/contract',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <Contract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/create',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <CreateContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/logout',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <Sale>
                  <Logout />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <UserLayout>
              <Sale>
                <Error />
              </Sale>
            </UserLayout>
          )
        }
      ]
    }
  ]
  const routesForStaff = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <StaffOfficer>
                  <HomeUser />
                </StaffOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/logout',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <StaffOfficer>
                  <Logout />
                </StaffOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<LoadingPage />}>
              <UserLayout>
                <StaffOfficer>
                  <Profile />
                </StaffOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '*',
          element: (
            <UserLayout>
              <StaffOfficer>
                <Error />
              </StaffOfficer>
            </UserLayout>
          )
        }
      ]
    }
  ]
  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/view/:id/sign/:customer',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <div className='w-[100vw] h-[100vh]'>
            <ViewSignContract />
          </div>
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Login />
        </Suspense>
      )
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Error />
        </Suspense>
      )
    }
  ]

  if (token) {
    if (user?.role == ADMIN) {
      routes = routesForAuthenticatedOnly
    } else if (user?.role == USER && user?.permissions.includes(permissionObject.OFFICE_ADMIN)) {
      routes = routesForAdminOfficer
    } else if (user?.role == USER && user?.permissions.includes(permissionObject.SALE)) {
      routes = routesForSale
    } else if (user?.role == USER && user?.permissions.includes(permissionObject.OFFICE_STAFF)) {
      routes = routesForStaff
    } else routes = routesForNotAuthenticatedOnly
  } else {
    routes = routesForNotAuthenticatedOnly
  }
  const router = createBrowserRouter([...routes])
  // Provide the router configuration using RouterProvider
  return (
    // <Spin spinning={isLoading} size='large' style={{ maxHeight: '100%', zIndex: 1001 }}>
    <RouterProvider router={router} />
    // </Spin>
  )
}

export default Routes
