import { useMemo, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useQuery } from 'react-query'
import { useAuth } from '~/context/authProvider'
import { getTotalReject, numberContractSuccess, totalRejectAndUser } from '~/services/dashboard.service'
import avatar from '../../assets/images/avatar1.png'
import { TypeAnimation } from 'react-type-animation'
const DashboardAdmin = () => {
  const { user } = useAuth()

  const { data: dataSuccess } = useQuery('data-get', numberContractSuccess)
  const { data: dataRejectUser } = useQuery('data-get-total-user', totalRejectAndUser)
  const totalSuccess = useMemo(() => {
    return dataSuccess?.object.reduce((total: number, e) => {
      total += parseInt(e.numberOfSuccess)
      return total
    }, 0)
  }, [dataSuccess])
  const optionData = useMemo(() => {
    const list = dataSuccess?.object
    const dataNumber: any[] = []
    const dataLabel: any[] = []
    list?.forEach((element: any) => {
      dataNumber.push(element?.numberOfSuccess)
      dataLabel.push(element?.createBy)
    })
    return {
      series: [
        {
          name: 'Số hợp đồng thành công',
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
  }, [dataSuccess])
  const optionPie = useMemo(() => {
    const list = dataRejectUser?.object
    const dataNumber: number[] = []
    const dataLabel: any[] = []
    list?.forEach((element: any) => {
      dataNumber.push(parseInt(element?.totalNumberOfRejected))
      dataLabel.push(element?.reasonTitle)
    })
    return {
      series: dataNumber,
      options: {
        chart: {
          width: 380,
          type: 'pie'
        },
        labels: dataLabel,
        responsive: [
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 380
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      }
    }
  }, [dataRejectUser])
  return (
    <div className='w-full h-full flex flex-col pb-6 bg-white overflow-auto'>
      <div className='w-full flex items-center justify-start gap-10 px-10 my-4'>
        {/* <div className='w-[300px] h-[100px] flex rounded-lg  flex-col justify-center items-center border-2 shadow-md text-blue-600 hover:text-white hover:bg-blue-600 '>
          <label className='text-[20px] font-bold'>Đang xử lí</label>
          <div>60 hợp đồng</div>
        </div>
        <div className='w-[300px] h-[100px]  flex rounded-lg  flex-col justify-center items-center border-2 shadow-md text-green-400 hover:text-white hover:bg-green-400'>
          <label className='text-[20px] font-bold'>Thành công</label>
          <div>60 hợp đồng</div>
        </div>
        <div className='w-[300px] h-[100px] flex rounded-lg  flex-col justify-center items-center border-2 shadow-md text-red-600 hover:text-white hover:bg-red-600'>
          <label className='text-[20px] font-bold'>Thất bại</label>
          <div>60 hợp đồng</div>
        </div> */}
        Tổng số hợp đồng thành công: {totalSuccess}
      </div>
      <div className='w-full h-full flex px-6 justify-between'>
        <div className='w-[78%] overflow-y-auto overflow-x-hidden'>
          <div className='flex flex-col items-center'>
            <div className='w-full'>
              <ReactApexChart options={optionData.options} series={optionData.series} type='bar' height={350} />
            </div>

            <label>Thống kê số hợp đồng thành công theo nhân viên</label>
          </div>
          <div className='flex flex-col items-center mt-6'>
            <ReactApexChart options={optionPie.options} series={optionPie.series} type='pie' width={380} />

            <label>Thống kê các nguyên nhân được chọn khi hợp đồng bị từ chối</label>
          </div>
        </div>
        <div className='w-[20%]'>
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
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin
