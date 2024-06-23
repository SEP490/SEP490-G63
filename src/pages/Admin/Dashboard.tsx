import ChartOne from '~/components/Admin/Charts/ChartOne'
import ChartThree from '~/components/Admin/Charts/ChartThree'
import ChartTwo from '~/components/Admin/Charts/ChartTwo'
import DefaultLayout from '~/layout/DashboardSidebar/DefaultLayout'
import CardDataStats from '~/layout/DashboardSidebar/CardDataStats'
import TableOne from '~/components/Admin/Charts/Tables/TableOne'
import ChatCard from '~/components/Admin/Charts/Chat/ChatCard'
import {
  BanknotesIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentListIcon,
  QueueListIcon,
  UserCircleIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardDataStats title='Số hợp đồng chưa ký' total='$3.456K' rate='0.43%' levelUp>
          <ClipboardDocumentIcon className='w-10 h-10' />
        </CardDataStats>
        <CardDataStats title='Doanh thu' total='$45,2K' rate='4.35%' levelUp>
          <BanknotesIcon className='w-10 h-10' />
        </CardDataStats>
        <CardDataStats title='Số hợp đồng đã ký' total='2.450' rate='2.59%' levelUp>
          <ClipboardDocumentListIcon className='w-10 h-10' />
        </CardDataStats>
        <CardDataStats title='Số lượng đối tác' total='3.456' rate='0.95%' levelDown>
          <UsersIcon className='w-10 h-10' />
        </CardDataStats>
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  )
}
