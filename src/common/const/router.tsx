import { EyeIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export const routerAdmin = [
  {
    id: 1,
    title: 'Tổng quan',
    slug: '/',
    icon: <EyeIcon className='h-4 w-4' />
  },
  {
    id: 2,
    title: 'Nhân viên',
    slug: '/employee',
    icon: <UserGroupIcon className='h-4 w-4' />
  },
  {
    id: 3,
    title: 'Hợp đồng cũ',
    slug: '/old-contract',
    icon: <ClipboardDocumentListIcon className='h-4 w-4' />
  }
]
