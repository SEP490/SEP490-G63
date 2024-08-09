import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../context/authProvider.tsx'
import { ProtectedRoute } from './ProtectedRouter.tsx'
import { lazy, Suspense } from 'react'
import { permissionObject } from '~/common/const/permissions.ts'
import { ADMIN, USER } from '~/common/const/role.ts'
import Salary from '~/pages/Admin/Salary/Salary.tsx'
import Employee from '~/pages/Admin/Employee.tsx'
import AdminLayout from '~/layout/AdminLayout/index.tsx'
import SearchPage from '~/pages/Admin/Search/SearchPage.tsx'
import CreateAppendices from '~/components/Admin/Appendices/CreateAppendices.tsx'
import AppendicesContract from '~/pages/Admin/Appendices/AppendicesContract.tsx'
import ViewSignContract from '~/pages/BasePage/ViewSignContract.tsx'
import SearchPageResult from '~/pages/Admin/Search/SearchPageResult.tsx'
import Profile from '~/pages/Profile.tsx'
import OldContract from '~/pages/Admin/OldContract.tsx'
import TemplateContract from '~/pages/Admin/TemplateContract.tsx'
import TypeContract from '~/pages/Admin/TypeContract.tsx'
import Contract from '~/pages/Admin/Contract.tsx'
import CreateContract from '~/pages/Admin/CreateContract.tsx'
import ContractHistory from '~/pages/Admin/ContractHistory.tsx'
import Logout from '~/components/Logout.tsx'
import Error from '~/components/shared/Error/Error.tsx'
import UserLayout from '~/layout/UserLayout/index.tsx'
import AdminOfficer from '~/middleware/AdminOfficer/index.tsx'
import Sale from '~/middleware/Sale/index.tsx'
import DashboardSale from '~/components/Dashboard/DashboardSale.tsx'
import StaffOfficer from '~/middleware/StaffOfficer/index.tsx'
import HomeUser from '~/pages/User/HomeUser.tsx'
import Login from '~/components/Login.tsx'
import ChangePassword from '~/components/ChangePassword.tsx'
import Department from '~/pages/Admin/Department/Department.tsx'
import FormProvider from '~/context/formProvider.tsx'
import CreateTemplateContract from '~/components/Admin/TemplateContract/CreateTemplateContract.tsx'
import ViewSignAppendicesContract from '~/pages/BasePage/ViewSignAppendicesContract.tsx'
import ViewDetailContract from '~/components/Admin/NewContract/ViewDetailContract.tsx'
import PaySlipFormula from '~/pages/Admin/Salary/PaySlipFormula.tsx'
import CompanyInformation from '~/components/Company/CompanyInformation.tsx'

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
            <AdminLayout>
              <SearchPage />
            </AdminLayout>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <AdminLayout>
              <CreateAppendices />
            </AdminLayout>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <AdminLayout>
              <AppendicesContract />
            </AdminLayout>
          )
        },
        {
          path: '/department',
          element: (
            <AdminLayout>
              <Department />
            </AdminLayout>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <AdminLayout>
              <ViewSignContract />
            </AdminLayout>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <AdminLayout>
              <ViewSignAppendicesContract />
            </AdminLayout>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <AdminLayout>
              <SearchPageResult />
            </AdminLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <AdminLayout>
              <Profile />
            </AdminLayout>
          )
        },
        {
          path: '/change-password',
          element: (
            <AdminLayout>
              <ChangePassword />
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
          path: '/old-contract',
          element: (
            <AdminLayout>
              <OldContract />
            </AdminLayout>
          )
        },
        {
          path: '/template-contract',
          element: (
            <AdminLayout>
              <TemplateContract />
            </AdminLayout>
          )
        },
        {
          path: '/type-contract',
          element: (
            <AdminLayout>
              <TypeContract />
            </AdminLayout>
          )
        },
        {
          path: '/contract',
          element: (
            <AdminLayout>
              <Contract />
            </AdminLayout>
          )
        },
        {
          path: '/company',
          element: (
            <AdminLayout>
              <CompanyInformation />
            </AdminLayout>
          )
        },
        {
          path: '/pay-slip',
          element: (
            <AdminLayout>
              <PaySlipFormula />
            </AdminLayout>
          )
        },
        {
          path: '/contract/detail/:id',
          element: (
            <AdminLayout>
              <ViewDetailContract />
            </AdminLayout>
          )
        },
        {
          path: '/contract/create',
          element: (
            <AdminLayout>
              <CreateContract />
            </AdminLayout>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <AdminLayout>
              <CreateTemplateContract />
            </AdminLayout>
          )
        },
        {
          path: '/contract/history/:id',
          element: (
            <AdminLayout>
              <ContractHistory />
            </AdminLayout>
          )
        },
        {
          path: '/salary',
          element: (
            <AdminLayout>
              <FormProvider>
                <Salary />
              </FormProvider>
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
            <UserLayout>
              <AdminOfficer>
                <SearchPage />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <UserLayout>
              <AdminOfficer>
                <CreateAppendices />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <UserLayout>
              <AdminOfficer>
                <AppendicesContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Profile />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/change-password',
          element: (
            <UserLayout>
              <AdminOfficer>
                <ChangePassword />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <UserLayout>
              <AdminOfficer>
                <SearchPageResult />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/type-contract',
          element: (
            <UserLayout>
              <AdminOfficer>
                <TypeContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <UserLayout>
              <AdminOfficer>
                <CreateTemplateContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <UserLayout>
              <AdminOfficer>
                <ViewSignContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <UserLayout>
              <AdminOfficer>
                <ViewSignAppendicesContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/employee',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Employee />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/old-contract',
          element: (
            <UserLayout>
              <AdminOfficer>
                <OldContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/template-contract',
          element: (
            <UserLayout>
              <AdminOfficer>
                <TemplateContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/contract',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Contract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/contract/create',
          element: (
            <UserLayout>
              <AdminOfficer>
                <CreateContract />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/salary',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Salary />
              </AdminOfficer>
            </UserLayout>
          )
        },
        {
          path: '/logout',
          element: (
            <UserLayout>
              <AdminOfficer>
                <Logout />
              </AdminOfficer>
            </UserLayout>
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
            <UserLayout>
              <Sale>
                <DashboardSale />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <UserLayout>
              <Sale>
                <CreateAppendices />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <UserLayout>
              <Sale>
                <AppendicesContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <UserLayout>
              <Sale>
                <Profile />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/change-password',
          element: (
            <UserLayout>
              <Sale>
                <ChangePassword />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <UserLayout>
              <Sale>
                <ViewSignContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <UserLayout>
              <Sale>
                <ViewSignAppendicesContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <UserLayout>
              <Sale>
                <SearchPageResult />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/type-contract',
          element: (
            <UserLayout>
              <Sale>
                <TypeContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <UserLayout>
              <Sale>
                <CreateTemplateContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/old-contract',
          element: (
            <UserLayout>
              <Sale>
                <OldContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/template-contract',
          element: (
            <UserLayout>
              <Sale>
                <TemplateContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/contract',
          element: (
            <UserLayout>
              <Sale>
                <Contract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/contract/create',
          element: (
            <UserLayout>
              <Sale>
                <CreateContract />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/salary',
          element: (
            <UserLayout>
              <Sale>
                <Salary />
              </Sale>
            </UserLayout>
          )
        },
        {
          path: '/logout',
          element: (
            <UserLayout>
              <Sale>
                <Logout />
              </Sale>
            </UserLayout>
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
            <UserLayout>
              <StaffOfficer>
                <HomeUser />
              </StaffOfficer>
            </UserLayout>
          )
        },
        {
          path: '/logout',
          element: (
            <UserLayout>
              <StaffOfficer>
                <Logout />
              </StaffOfficer>
            </UserLayout>
          )
        },
        {
          path: '/profile',
          element: (
            <UserLayout>
              <StaffOfficer>
                <Profile />
              </StaffOfficer>
            </UserLayout>
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
        <div className='w-[100vw] h-[100vh]'>
          <ViewSignContract />
        </div>
      )
    },
    {
      path: '/view/:id/sign-appendices/:customer',
      element: (
        <div className='w-[100vw] h-[100vh]'>
          <ViewSignAppendicesContract />
        </div>
      )
    },
    {
      path: '/change-password',
      element: (
        <div className='w-[100vw] h-[100vh]'>
          <ChangePassword />
        </div>
      )
    },
    {
      path: '/',
      element: <Login />
    },
    {
      path: '*',
      element: <Error />
    }
  ]

  if (token) {
    if (user?.role == ADMIN || (user?.role == USER && user?.permissions.includes(permissionObject.MANAGER))) {
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
