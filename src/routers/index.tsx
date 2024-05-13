import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRouter.tsx'

import Error from '~/components/shared/Error/Error.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import NavBar from '~/layout/AdminLayout/NavBar/index.tsx'
import Login from '~/components/Login.tsx'
import Logout from '~/components/Logout.tsx'
import Example from '~/pages/Example.tsx'
import Employee from '~/pages/Admin/Employee/Employee.tsx'
import Home from '../pages/landing_page/Home.tsx'
import Layout from '~/pages/landing_page/Layout.tsx'
import About from '~/pages/landing_page/About.tsx'
import Blogs from '~/pages/landing_page/Blogs.tsx'
import BlogsComp from '~/components/landing_page/Blogs/BlogsComp.tsx'

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
            <AdminLayout>
              <NavBar />
            </AdminLayout>
          )
        },
        {
          path: '/employee',
          element: (
            <AdminLayout>
              <Employee />
            </AdminLayout>
          )
        },
        {
          path: '/logout',
          element: (
            <AdminLayout>
              <Logout />
            </AdminLayout>
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
    // {
    //   path: '/',
    //   element: <Navigate to='/' />
    // },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/example',
      element: <Example />
    },
    {
      path: '/landing',
      element: <Home />,
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
