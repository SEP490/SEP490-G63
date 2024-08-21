import AsyncCreatableSelect from 'react-select/async-creatable'
const SelectAutoComplete = () => {
  const option = [{ label: '123', value: '123' }]
  const filterColors = (inputValue: string) => {
    return option?.filter((i: any) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const promiseOptions = (inputValue: string) =>
    new Promise<any[]>((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue))
      }, 300)
    })
  const customStyles = {
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
    <>
      <AsyncCreatableSelect
        cacheOptions
        className='block w-[250px] disabled:bg-gray-200  rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        loadOptions={promiseOptions}
        defaultOptions={option}
        styles={customStyles}
      />
    </>
  )
}
export default SelectAutoComplete
