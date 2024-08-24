import { statusContract } from '~/common/const/status'
import StepProgressBar from '../BaseComponent/StepProgressBar'
import ReactApexChart from 'react-apexcharts'
import { TypeAnimation } from 'react-type-animation'
import { useMemo } from 'react'
import { useAuth } from '~/context/authProvider'
import { useQuery } from 'react-query'
import { getTotalReject, numberContractSuccess } from '~/services/dashboard.service'
import avatar from '../../assets/images/avatar1.png'

const DashboardSale = () => {
  const { user } = useAuth()

  const { data: dataSuccess } = useQuery('data-get', numberContractSuccess)
  const { data: dataRejectUser } = useQuery('data-get-total-user', getTotalReject)
  const optionData = useMemo(() => {
    const list = dataRejectUser?.object
    const dataNumber: any[] = []
    const dataLabel: any[] = []
    list?.forEach((element: any) => {
      if (element?.reasonTitle != null && element?.reasonTitle != 'null') {
        dataNumber.push(element?.numberOfRejected)
        dataLabel.push(element?.reasonTitle)
      }
    })
    return {
      series: [
        {
          name: 'Số lượng',
          data: dataNumber
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '20px',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: dataLabel
        },
        yaxis: {
          title: {
            text: 'Số lượng'
          },
          stepSize: 1,
          min: 0,
          max: 10
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return '' + val + ' hợp đồng'
            }
          }
        }
      }
    }
  }, [dataSuccess, dataRejectUser])

  return (
    <div className='w-full h-full flex flex-col pb-6 bg-white overflow-auto'>
      <div className={`bg-white h-full pt-4 w-full`}>
        <StepProgressBar status={statusContract} />
      </div>
      <div className='w-full flex px-6 justify-between'>
        <div className='md:w-[78%] w-full'>
          <div className='flex flex-col items-center'>
            <div className='w-full'>
              <ReactApexChart options={optionData.options} series={optionData.series} type='bar' height={350} />
            </div>
            <label>Thống kê nguyên nhân bị từ chối hợp đồng</label>
          </div>
        </div>
        <div className='w-[20%] md:visible invisible'>
          <div className='w-full h-[200px] border-2 rounded-2xl flex flex-col items-center justify-around'>
            <TypeAnimation
              sequence={['Xin chào', 2000, 'Chúc bạn...', 2000, 'Một ngày làm việc vui vẻ', 2000]}
              wrapper='span'
              cursor={true}
              repeat={Infinity}
              style={{ fontSize: '16px', display: 'inline-block' }}
            />
            <img src={user?.avatar ? user?.avatar : avatar} className='w-[100px] h-[100px] rounded-[50%]'></img>
            <div className='font-bold'>{user?.name}</div>
            <div>{user?.email}</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
export default DashboardSale
