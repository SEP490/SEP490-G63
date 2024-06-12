import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRouter.tsx'
import { lazy, Suspense } from 'react'
import Error from '~/components/shared/Error/Error.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import Loading from '~/components/shared/Loading/Loading.tsx'

import About from '~/pages/landing_page/About.tsx'
import Blogs from '~/pages/landing_page/Blogs.tsx'
import { ADMIN, USER } from '~/common/const/role.ts'
import ContractHistory from '~/pages/Admin/ContractHistory.tsx'
import AdminOfficer from '~/middleware/AdminOfficer/index.tsx'
import UserLayout from '~/layout/UserLayout/index.tsx'
import { permissionObject } from '~/common/const/permissions.ts'
import Sale from '~/middleware/Sale/index.tsx'
import StaffOfficer from '~/middleware/StaffOfficer/index.tsx'
import Dashboard from '~/pages/Admin/Dashboard.tsx'
const Login = lazy(() => import('~/components/Login.tsx'))
const Logout = lazy(() => import('~/components/Logout.tsx'))
const Example = lazy(() => import('~/pages/Example.tsx'))
const Employee = lazy(() => import('~/pages/Admin/Employee.tsx'))
const Register = lazy(() => import('~/components/Register.tsx'))
const Home = lazy(() => import('~/pages/landing_page/Home.tsx'))
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
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <SearchPage />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <ViewSignContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <SearchPageResult />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/profile',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <Profile />
              </AdminLayout>
            </Suspense>
          )
        },

        {
          path: '/send-mail/:id/:type',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <SendMailContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/employee',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <Employee />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/old-contract',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <OldContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/template-contract',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <TemplateContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <Contract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/create',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <CreateContract />
              </AdminLayout>
            </Suspense>
          )
        },
        {
          path: '/contract/history/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <AdminLayout>
                <ContractHistory />
              </AdminLayout>
            </Suspense>
          )
        },

        {
          path: '/logout',
          element: (
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <UserLayout>
                <AdminOfficer>
                  <SearchPage />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <UserLayout>
                <AdminOfficer>
                  <SendMailContract />
                </AdminOfficer>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/employee',
          element: (
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <UserLayout>
                <Sale>
                  <SearchPage />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <UserLayout>
                <Sale>
                  <SendMailContract />
                </Sale>
              </UserLayout>
            </Suspense>
          )
        },

        {
          path: '/old-contract',
          element: (
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
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
            <Suspense fallback={<Loading />}>
              <UserLayout>
                <StaffOfficer>
                  <Logout />
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
      path: '/view/:id',
      element: (
        <Suspense fallback={<Loading />}>
          <ViewSignContract />
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      )
    },
    {
      path: '/dashboard',
      element: (
        <Suspense fallback={<Loading />}>
          <Dashboard />
        </Suspense>
      )
    },
    {
      path: '/register',
      element: (
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      )
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      )
    },
    {
      path: '/example',
      element: (
        <Suspense fallback={<Loading />}>
          <Example />
        </Suspense>
      )
    },

    {
      path: '/landing',
      element: <Home />
    },
    {
      path: '/blogs',
      element: <Blogs />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '*',
      element: <Error />
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
