import AsyncCreatableSelect from 'react-select/async-creatable'
import useToast from '~/hooks/useToast'
import { validateEmail } from '~/common/utils/checkMail'

const AsyncCreatableSelectComponent = ({ selected, setSelected, option }: any) => {
  const { errorNotification } = useToast()

  const filterColors = (inputValue: string) => {
    return option?.filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 300)
    })
  const createOption = async (inputValue: string) => {
    // const isValidEmail = await validateEmail(inputValue)

    // if (isValidEmail) {
    return {
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\s+/g, '_')
    }
    // } else {
    //   errorNotification('Email không tồn tại hoặc không hợp lệ!')
    //   return null
    // }
  }
  const handleCreate = async (inputValue: string) => {
    const newOption = await createOption(inputValue)
    if (newOption) {
      setSelected((prevOptions: any) => [...prevOptions, newOption])
    }
  }

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: '1px solid transparent',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid transparent'
      }
    }),
    input: (provided: any) => ({
      ...provided,
      boxShadow: 'none',
      '& input': {
        boxShadow: 'none !important',
        border: 'none !important',
        '&:focus': {
          boxShadow: 'none !important',
          border: 'none !important'
        }
      }
    })
  }

  return (
    <div className='w-full'>
      <AsyncCreatableSelect
        cacheOptions
        loadOptions={promiseOptions}
        defaultOptions={option}
        isMulti
        value={selected}
        onChange={setSelected}
        onCreateOption={handleCreate}
        styles={customStyles}
      />
    </div>
  )
}

export default AsyncCreatableSelectComponent
