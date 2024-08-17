import {
  EyeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline'
//Admin: tổng quan, employee, hợp đồng, hợp đồng cũ, hợp đồng mẫu, gửi mail, ký, hợp đòng với admin tdocman
//AdminOficer: tổng quan, employee, hợp đồng, hợp đồng cũ, hợp đồng mẫu, gửi mail,
//sale: tổng quan, hợp đồng, hợp đồng cũ, hợp đồng mẫu, gửi mail,
//staffOfficer:profile
export const routerAdmin = [
  {
    id: 1,
    title: 'Tổng quan',
    slug: '/',
    icon: <EyeIcon className='h-4 w-4' />
  },
  {
    id: 2,
    title: 'Hợp đồng',
    slug: '/contract',
    icon: <DocumentTextIcon className='h-4 w-4' />
  },
  {
    id: 3,
    title: 'Hợp đồng cũ',
    slug: '/old-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 4,
    title: 'Hợp đồng mẫu',
    slug: '/template-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 5,
    title: 'Loại hợp đồng',
    slug: '/type-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 6,
    title: 'Nhân viên',
    slug: '/employee',
    icon: <UserGroupIcon className='h-4 w-4' />
  },
  {
    id: 7,
    title: 'Bảng lương',
    slug: '/salary',
    icon: <CircleStackIcon className='h-4 w-4' />
  }
]
export const routerAdminOfficer = [
  {
    id: 1,
    title: 'Tổng quan',
    slug: '/',
    icon: <EyeIcon className='h-4 w-4' />
  },

  {
    id: 2,
    title: 'Hợp đồng',
    slug: '/contract',
    icon: <DocumentTextIcon className='h-4 w-4' />
  },
  {
    id: 3,
    title: 'Hợp đồng cũ',
    slug: '/old-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 4,
    title: 'Hợp đồng mẫu',
    slug: '/template-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 5,
    title: 'Loại hợp đồng',
    slug: '/type-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 6,
    title: 'Nhân viên',
    slug: '/employee',
    icon: <UserGroupIcon className='h-4 w-4' />
  }
]
export const routerSale = [
  {
    id: 1,
    title: 'Tổng quan',
    slug: '/dashboard',
    icon: <EyeIcon className='h-4 w-4' />
  },
  {
    id: 2,
    title: 'Hợp đồng',
    slug: '/contract',
    icon: <DocumentTextIcon className='h-4 w-4' />
  },
  {
    id: 3,
    title: 'Hợp đồng cũ',
    slug: '/old-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 4,
    title: 'Hợp đồng mẫu',
    slug: '/template-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 5,
    title: 'Loại hợp đồng',
    slug: '/type-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  },
  {
    id: 6,
    title: 'Bảng lương',
    slug: '/salary',
    icon: <CircleStackIcon className='h-4 w-4' />
  }
]
