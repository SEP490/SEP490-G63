import { debounce } from 'lodash'
import { useForm } from 'react-hook-form'
type FormField = {
  title: string
  description: string
}
const EditTypeContract = ({ onSubmit, selectedContract }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormField>({ defaultValues: selectedContract })
  return (
    <form
      onSubmit={handleSubmit(debounce(onSubmit, 300))}
      className='items-center w-full rounded-lg mt-2  flex flex-wrap justify-between bg-white z-50 '
    >
      <div className='w-[100%] relative'>
        <label className=' flex items-center'>
          <div className='font-bold'>
            Tên loại hợp đồng <sup className='text-red-500'>*</sup>
          </div>
        </label>
        <input
          className={`${errors.title ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Nhập tiêu đề'
          {...register('title', {
            required: 'Tiêu đề không được bỏ trống'
          })}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.title ? 'visible' : 'invisible'}`}>
          {errors.title?.message}
        </div>
      </div>
      <div className='w-[100%] pt-3 relative'>
        <label className=' flex items-center'>
          <div className='font-bold'>Mô tả</div>
        </label>
        <textarea
          className={`${errors.description ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder='Mô tả loại hợp đồng'
          rows={10}
          style={{ resize: 'none' }}
          {...register('description')}
        />
        <div className={`text-red-500 absolute text-[12px] ${errors.description ? 'visible' : 'invisible'}`}>
          {errors.description?.message}
        </div>
      </div>

      <div className='w-full flex justify-end'>
        <button
          type='submit'
          className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
          data-ripple-light='true'
        >
          Lưu
        </button>
      </div>
    </form>
  )
}
export default EditTypeContract
