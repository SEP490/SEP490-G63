import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

type Option = {
  label: string
  value: string
}

const options: Option[] = [
  { label: 'Junggie@gmail.com', value: 'grapes' },
  { label: 'Yujinnie@gmail.com', value: 'mango' },
  { label: 'Minjeong@gmail.com', value: 'strawberry' }
]

const handleNewField = (value: string): Option => ({
  label: value,
  value: value.toUpperCase().replace(/\s+/g, '_')
})

const customValueRenderer = (selected: any, _options: any) => {
  return selected.length ? selected.map(({ label }: any) => label) : 'Tìm kiếm'
}

const ComboboxMail = () => {
  const [selected, setSelected] = useState<Option[]>([])

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
