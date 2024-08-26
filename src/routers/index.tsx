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
import ListReason from '~/components/Admin/Reason/ListReason.tsx'
import DashboardAdmin from '~/components/Dashboard/DashboardAdmin.tsx'
import SelectAutoComplete from '~/components/BaseComponent/SelectAutoComplete.tsx'
import NotifyProvider from '~/context/notiProvider.tsx'
import ViewAppendicesContract from '~/components/Admin/Appendices/ViewAppendicesContract.tsx'

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
            <NotifyProvider>
              <AdminLayout>
                <SearchPage />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/dashboard',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <DashboardAdmin />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <CreateAppendices />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <AppendicesContract />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id/detail/:idDetail',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ViewAppendicesContract />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/manage-reason',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ListReason />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/department',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Department />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ViewSignContract />
              </AdminLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ViewSignAppendicesContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <SearchPageResult />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/profile',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Profile />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/change-password',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ChangePassword />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/employee',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Employee />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/old-contract',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <OldContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <TemplateContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/type-contract',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <TypeContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/contract',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Contract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/company',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <CompanyInformation />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/pay-slip',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <PaySlipFormula />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/contract/detail/:id',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ViewDetailContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/contract/create',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <CreateContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <CreateTemplateContract />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/contract/history/:id',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <ContractHistory />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/salary',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <FormProvider>
                  <Salary />
                </FormProvider>
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '/logout',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Logout />
              </AdminLayout>{' '}
            </NotifyProvider>
          )
        },
        {
          path: '*',
          element: (
            <NotifyProvider>
              <AdminLayout>
                <Error />
              </AdminLayout>
            </NotifyProvider>
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
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <SearchPage />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <CreateAppendices />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <AppendicesContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id/detail/:idDetail',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <ViewAppendicesContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/profile',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Profile />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/change-password',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <ChangePassword />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <SearchPageResult />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/type-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <TypeContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <CreateTemplateContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <ViewSignContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <ViewSignAppendicesContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/employee',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Employee />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/old-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <OldContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <TemplateContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract/detail/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <ViewDetailContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Contract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract/create',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <CreateContract />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/salary',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Salary />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/logout',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Logout />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '*',
          element: (
            <NotifyProvider>
              <UserLayout>
                <AdminOfficer>
                  <Error />
                </AdminOfficer>
              </UserLayout>
            </NotifyProvider>
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
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <SearchPage />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/dashboard',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <DashboardSale />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices-create/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <CreateAppendices />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <AppendicesContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/appendices/:id/detail/:idDetail',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <ViewAppendicesContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/profile',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <Profile />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/change-password',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <ChangePassword />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign/:customer',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <ViewSignContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/view/:id/sign-appendices/:customer',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <ViewSignAppendicesContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract/detail/:id',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <ViewDetailContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/search/:fieldSearch/:searchText',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <SearchPageResult />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/type-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <TypeContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract/create',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <CreateTemplateContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/old-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <OldContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/template-contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <TemplateContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <Contract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/contract/create',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <CreateContract />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/salary',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <Salary />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/logout',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <Logout />
                </Sale>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '*',
          element: (
            <NotifyProvider>
              <UserLayout>
                <Sale>
                  <Error />
                </Sale>
              </UserLayout>
            </NotifyProvider>
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
            <NotifyProvider>
              <UserLayout>
                <StaffOfficer>
                  <HomeUser />
                </StaffOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/logout',
          element: (
            <NotifyProvider>
              <UserLayout>
                <StaffOfficer>
                  <Logout />
                </StaffOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '/profile',
          element: (
            <NotifyProvider>
              <UserLayout>
                <StaffOfficer>
                  <Profile />
                </StaffOfficer>
              </UserLayout>
            </NotifyProvider>
          )
        },
        {
          path: '*',
          element: (
            <NotifyProvider>
              <UserLayout>
                <StaffOfficer>
                  <Error />
                </StaffOfficer>
              </UserLayout>
            </NotifyProvider>
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
