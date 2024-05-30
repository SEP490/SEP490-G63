import { useForm } from 'react-hook-form'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import '../../css/suneditor.css'
interface FormType {
  contractName: string
  contractNumber: string
}
interface CompanyInfo {
  name: string
  address: string
  taxNumber: string
  presenter: string
  position: string
  businessNumber: string
  bankId: string
  bankName: string
  bankAccOwer: string
}
const CreateContract = () => {
  const {
    register,
    getValues,
    formState: { errors }
  } = useForm<FormType>()
  const formInfoPartA = useForm<CompanyInfo>()
  const formInfoPartB = useForm<CompanyInfo>()
  const onSubmit = async () => {
    console.log(getValues())
    console.log(formInfoPartB.getValues())
    console.log(formInfoPartA.getValues())
    const rule: any = document.getElementsByName('rule')[0]
    const term: any = document.getElementsByName('term')[0]
    const bodyData = {
      ...getValues(),
      rule: rule.value,
      term: term.value,
      partyA: formInfoPartA.getValues(),
      partyB: formInfoPartB.getValues()
    }
    console.log(bodyData)
  }
  return (
    <div className='bg-[#e8eaed] h-fit min-h-full flex justify-center py-6'>
      <form
        className='justify-center sm:justify-between w-[90%] md:w-[90%] rounded-md border flex flex-wrap px-4 h-fit bg-white py-4'
        autoComplete='on'
      >
        <div className='w-full mt-3 font-bold'>Thông tin cơ bản</div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Tên hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.contractName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            placeholder='Nhập tên hợp đồng'
            {...register('contractName', {
              required: 'Tên hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px]  ${errors.contractName ? 'visible' : 'invisible'}`}>
            {errors.contractName?.message}
          </div>
        </div>
        <div className='w-full mt-5 relative'>
          <label className='font-light '>
            Số hợp đồng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${errors.contractNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập số hợp đồng'
            {...register('contractNumber', {
              required: 'Số hợp đồng không được để trống'
            })}
          />
          <div className={`text-red-500 absolute text-[12px] ${errors.contractNumber ? 'visible' : 'invisible'}`}>
            {errors.contractNumber?.message}
          </div>
        </div>
        <div className='w-full mt-5 font-bold'>Điều khoản thông tin các bên</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='rule'
            placeholder='Căn cứ vào điều luật...'
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight']
              ]
            }}
          />
        </div>
        <div className='w-full mt-5 font-bold'>Thông tin bên A</div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên công ty'
            {...formInfoPartA.register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.name ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập địa chỉ công ty'
            {...formInfoPartA.register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.address ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.address?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập mã số thuế'
            {...formInfoPartA.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.taxNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên người đại diện'
            {...formInfoPartA.register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.presenter ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập vị trí làm việc'
            {...formInfoPartA.register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.position ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập thông tin'
            {...formInfoPartA.register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.businessNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập STK'
            {...formInfoPartA.register('bankId', {
              required: 'STK không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankId ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankId?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartA.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartA.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên tài khoản ngân hàng'
            {...formInfoPartA.register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartA.formState.errors.bankAccOwer ? 'visible' : 'invisible'}`}
          >
            {formInfoPartA.formState.errors.bankAccOwer?.message}
          </div>
        </div>
        {/* Thông tin công ty B */}
        <div className='w-full mt-5 font-bold'>Thông tin bên B</div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên công ty<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.name ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên công ty'
            {...formInfoPartB.register('name', {
              required: 'Tên công ty không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.name ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.name?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Địa chỉ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.address ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập địa chỉ công ty'
            {...formInfoPartB.register('address', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.address ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.address?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Mã số thuế<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.taxNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập mã số thuế'
            {...formInfoPartB.register('taxNumber', {
              required: 'Mã số thuế không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.taxNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.taxNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Người đại diện<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.presenter ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên người đại diện'
            {...formInfoPartB.register('presenter', {
              required: 'Người đại diện không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.presenter ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.presenter?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Chức vụ<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.position ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập vị trí làm việc'
            {...formInfoPartB.register('position', {
              required: 'Vị trí làm việc không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.position ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.position?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Giấy phép đăng ký kinh doanh<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.businessNumber ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập thông tin'
            {...formInfoPartB.register('businessNumber', {
              required: 'Giấy phép ĐKKD không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.businessNumber ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.businessNumber?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Số TK ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankId ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập STK'
            {...formInfoPartB.register('bankId', {
              required: 'STK không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankId ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankId?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative '>
          <label className='font-light '>
            Tên ngân hàng<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankName ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên ngân hàng'
            {...formInfoPartB.register('bankName', {
              required: 'Tên ngân hàng không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankName ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankName?.message}
          </div>
        </div>
        <div className='w-full md:w-[30%] mt-5 relative'>
          <label className='font-light '>
            Chủ tài khoản<sup className='text-red-500'>*</sup>
          </label>
          <input
            className={`${formInfoPartB.formState.errors.bankAccOwer ? 'ring-red-600' : ''} block w-full rounded-md border-0 py-1.5 px-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
            type='text'
            placeholder='Nhập tên tài khoản ngân hàng'
            {...formInfoPartB.register('bankAccOwer', {
              required: 'Tên tài khoản không được để trống'
            })}
          />
          <div
            className={`text-red-500 absolute text-[12px] ${formInfoPartB.formState.errors.bankAccOwer ? 'visible' : 'invisible'}`}
          >
            {formInfoPartB.formState.errors.bankAccOwer?.message}
          </div>
        </div>
        <div className='w-full mt-5 font-bold'>Điều khoản hợp đồng</div>
        <div className='w-full mt-3'>
          <SunEditor
            name='term'
            placeholder='Điều khoản'
            height='100vh'
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['font', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['table', 'link', 'image'],
                ['fullScreen', 'showBlocks', 'codeView'],
                ['preview', 'print']
              ],

              imageUploadUrl: '/upload/image',
              imageUploadSizeLimit: 5 * 1024 * 1024
            }}
          />
        </div>
        <div className='w-full flex justify-end'>
          <button
            type='button'
            onClick={async () => {
              // const result = await trigger()
              // const result2 = await formInfoPartB.trigger()
              // const result3 = await formInfoPartA.trigger()

              // if (result && result2 && result3) {
              onSubmit()
              // }
            }}
            className='middle my-3 none center mr-4 rounded-lg bg-[#0070f4] py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-[#0072f491] focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
            data-ripple-light='true'
          >
            Tạo
          </button>
        </div>
      </form>
    </div>
  )
}
export default CreateContract
