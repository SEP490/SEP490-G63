import { useState } from 'react'
import { useQuery } from 'react-query'
import LoadingIcon from '~/assets/LoadingIcon'
import { formatPrice } from '~/common/utils/formatPrice'
import { useFormData } from '~/context/formProvider'
import { getPaySlipFormula } from '~/services/pay.formula.service'

const PaySlipFormula = () => {
  const { listData, loading, addNewData } = useFormData()

  return (
    <>
      {loading ? (
        <div className='w-full h-[300px] flex justify-center items-center'>
          <LoadingIcon className='w-10 h-10' />
        </div>
      ) : (
        <>
          <button
            onClick={() => addNewData()}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          >
            Tạo
          </button>
          <table className='w-full text-sm text-left rtl:text-right text-black dark:text-gray-400 '>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>Giá trị hợp đồng(VND)</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {formatPrice(d.toValueContract)}
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>Lương cứng(VND)</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {formatPrice(d.baseSalary)}
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>% doanh số</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {d.commissionPercentage}(%)
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>% triển khai KH</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {d.clientDeploymentPercentage}(%)
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>Thưởng đạt ngưỡng(VND)</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {formatPrice(d.bonusReachesThreshold)}
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>Trợ cấp ăn(VND)</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {formatPrice(d.foodAllowance)}
                </td>
              ))}
            </tr>
            <tr className='bg-white dark:bg-gray-800'>
              <td className='px-1 py-2 font-bold'>Phụ cấp xăng xe,điện thoại(VND)</td>
              {listData?.map((d: any) => (
                <td className='px-1 py-2 border-l' key={d.id} align='center'>
                  {formatPrice(d.transportationOrPhoneAllowance)}
                </td>
              ))}
            </tr>
          </table>
        </>
      )}
    </>
  )
}
export default PaySlipFormula
