import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { MdClear } from 'react-icons/md'

type Option = {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'phantutunao@gmail.com', value: 'phantutunao@gmail.com' },
  { label: 'ytbstart962@gmail.com', value: 'ytbstart962@gmail.com' }
]

const handleNewField = (value: string): Option => ({
  label: value,
  value: value.toUpperCase().replace(/\s+/g, '_')
})

const ComboboxMail = ({ selected, setSelected }: any) => {
  // const [selected, setSelected] = useState<Option[]>([])

  const handleRemove = (value: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelected(selected.filter((option: any) => option.value !== value))
  }

  const customValueRenderer = (selected: Option[], _options: Option[]) => {
    // console.log('selected', selected)

    return selected.length
      ? selected.map(({ label, value }: Option) => (
          <div key={value} className='inline-block bg-slate-200 mx-1 px-4 py-1 rounded relative'>
            {label}
            <MdClear
              className='absolute top-1 right-0 cursor-pointer'
              onClick={(event) => handleRemove(value, event)}
            />
          </div>
        ))
      : 'Tìm kiếm'
  }

  return (
    <div className='w-full'>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy='Tìm kiếm'
        isCreatable={true}
        onCreateOption={handleNewField}
        valueRenderer={customValueRenderer}
      />
    </div>
  )
}

export default ComboboxMail
