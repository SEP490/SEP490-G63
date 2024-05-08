import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRouter.tsx'

import Error from '~/components/shared/Error/Error.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import NavBar from '~/layout/AdminLayout/NavBar/index.tsx'
import Login from '~/components/Login.tsx'
import Logout from '~/components/Logout.tsx'
import Example from '~/pages/Example.tsx'

const Routes = () => {
  const { token } = useAuth()
  let routes: Array<any>
  //   const routesForAdmin = [
  //     {
  //       path: '/',
  //       element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //       children: [
  //         {
  //           path: '/',
  //           element: <Navigate to='/account' />
  //         },
  //         {
  //           path: 'account',
  //           element: <Account />
  //         },
  //         {
  //           path: 'profile',
  //           element: <UserProfile />
  //         },
  //         {
  //           path: 'logout',
  //           element: <Logout />
  //         },
  //         {
  //           path: '*',
  //           element: <ErrorPage />
  //         }
  //       ]
  //     }
  //   ]
  //   const routesForUser = [
  //     {
  //       path: '/',
  //       element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
  //       children: [
  //         {
  //           path: '/',
  //           element: <Navigate to='/home' />
  //         },
  //         {
  //           path: 'home',
  //           element: <HomePage />
  //         },
  //         {
  //           path: 'preferjob',
  //           element: <PreferJob />
  //         },
  //         {
  //           path: 'applyjob',
  //           element: <ApplyJob />
  //         },
  //         {
  //           path: 'profile',
  //           element: <UserProfile />
  //         },
  //         {
  //           path: 'calendar',
  //           element: <ScheduleCalendar />
  //         },
  //         {
  //           path: 'cv',
  //           element: <CV />
  //         },
  //         {
  //           path: 'jobpostingdetail/:ID',
  //           element: <JobPostingDetail />
  //         },
  //         {
  //           path: 'listgeneraltest',
  //           element: <ListExamForCandidate />
  //         },
  //         {
  //           path: 'exam',
  //           element: <ExamPage />
  //         },
  //         {
  //           path: 'speexam',
  //           element: <SpeExamPage />
  //         },

  //         {
  //           path: 'detailCv',
  //           element: <DetailsFillingPage />
  //         },
  //         {
  //           path: 'logout',
  //           element: <Logout />
  //         },
  //         {
  //           path: 'submit-success',
  //           element: <SubmitSpeExam />
  //         },
  //         {
  //           path: '*',
  //           element: <ErrorPage />
  //         },
  //         {
  //           path: 'noti',
  //           element: <ContentNoti />
  //         }
  //       ]
  //     }
  //   ]
  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/admin',
          element: (
            <AdminLayout>
              <NavBar />
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
      element: <NavBar />
    },
    //   {
    //     path: 'loginforexpert',
    //     element: <LoginForExpert />
    //   },
    //   {
    //     path: 'forgotPass',
    //     element: <ForgotPass />
    //   },
    //   {
    //     path: 'jobpostingdetailguest/:ID',
    //     element: <JobPostingDetailGuest />
    //   },
    //   {
    //     path: 'verification-success/:token',
    //     element: <ConfirmEmail />
    //   },
    //   {
    //     path: 'set-password/:token',
    //     element: <ConfirmEmailPassword />
    //   },
    {
      path: '/logout',
      element: <Logout />
    },
    {
      path: '/example',
      element: <Example />
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
