import LoadingIcon from '~/assets/LoadingIcon'
import { formatPrice } from '~/common/utils/formatPrice'
import { useFormData } from '~/context/formProvider'
const PaySlipFormula = () => {
  const { listData, loading } = useFormData()
  return (
    <>
      {loading ? (
        <div className='w-full h-[300px] flex justify-center items-center'>
          <LoadingIcon className='w-10 h-10' />
        </div>
      ) : (
        <>
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
