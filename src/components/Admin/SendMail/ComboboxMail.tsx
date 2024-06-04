import React, { useState, useEffect } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import axios from 'axios'
import useToast from '~/hooks/useToast'

const colourOptions: any[] = [
  { label: 'tu@gmail.com', value: 'tu@gmail.com' },
  { label: 'ha@gmail.com', value: 'ha@gmail.com' },
  { label: 'hai@gmail.com', value: 'hai@gmail.com' }
]

const filterColors = (inputValue: string) => {
  return colourOptions.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
}

const promiseOptions = (inputValue: string) =>
  new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve(filterColors(inputValue))
    }, 500)
  })

const validateEmail = async (email: string) => {
  const apiKey = '5e309805ed0446e2949c9c8722d5b02d'

  try {
    const response = await axios.get('https://emailvalidation.abstractapi.com/v1/', {
      params: {
        api_key: apiKey,
        email: email
      }
    })

    return response.data.deliverability === 'DELIVERABLE'
  } catch (error) {
    console.error('Error checking email:', error)
    return false
  }
}

const AsyncCreatableSelectComponent = ({ selected, setSelected }: any) => {
  const { successNotification, errorNotification } = useToast()

  const createOption = async (inputValue: string) => {
    const isValidEmail = await validateEmail(inputValue)

    if (isValidEmail) {
      return {
        label: inputValue,
        value: inputValue.toLowerCase().replace(/\s+/g, '_')
      }
    } else {
      errorNotification('Email không tồn tại hoặc không hợp lệ!')
      return null
    }
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
