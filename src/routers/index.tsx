import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRouter.tsx'
import { lazy, Suspense } from 'react'
import Error from '~/components/shared/Error/Error.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import NavBar from '~/layout/AdminLayout/NavBar/index.tsx'
import Loading from '~/components/shared/Loading/Loading.tsx'
import Layout from '~/pages/landing_page/Layout.tsx'
import About from '~/pages/landing_page/About.tsx'
import Blogs from '~/pages/landing_page/Blogs.tsx'
import BlogsComp from '~/components/landing_page/Blogs/BlogsComp.tsx'

const Login = lazy(() => import('~/components/Login.tsx'))
const Logout = lazy(() => import('~/components/Logout.tsx'))
const Example = lazy(() => import('~/pages/Example.tsx'))
const Employee = lazy(() => import('~/pages/Admin/Employee.tsx'))
const Register = lazy(() => import('~/components/Register.tsx'))
const Home = lazy(() => import('~/pages/landing_page/Home.tsx'))
const Routes = () => {
  const { token } = useAuth()
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
                <Employee />
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
          element: <Error />
        }
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Home />
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
      // children: [
      //   {
      //     path: '/',
      //     element: <Home />
      //   },
      //   {
      //     path: '/about',
      //     element: <About />
      //   }
      // ]
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
    routes = routesForAuthenticatedOnly
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
