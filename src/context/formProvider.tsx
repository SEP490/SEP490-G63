import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from './authProvider'
import { BASE_URL } from '~/common/const'
import { getNotification } from '~/services/user.service'
import { deleteNotify, getNumberUnreadNotify, readNotify } from '~/services/notification.service'
import { useMutation, useQuery } from 'react-query'
import { getPaySlipFormula } from '~/services/pay.formula.service'
import { AxiosError } from 'axios'
import useToast from '~/hooks/useToast'

export type FormData = {
  id: string
  fromValueContract: number
  toValueContract: number
  transportationOrPhoneAllowance: number
  foodAllowance: number
  commissionPercentage: number
  bonusReachesThreshold: number
  bonusAfter1Year: number
  baseSalary: number
  status: 'ACTIVE' | 'INACTIVE'
}

type MyContextValue = {
  listData: FormData[] | []
  addNewData: () => void
  loading: boolean
}

interface Props {
  children: React.ReactNode
}

const FormContext = createContext<MyContextValue>({
  listData: [],
  addNewData: () => {},
  loading: false
})

const FormProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<any>([])
  const { errorNotification, successNotification } = useToast()
  const initialData = useMemo(
    () => ({
      id: '',
      fromValueContract: 0,
      toValueContract: 0,
      transportationOrPhoneAllowance: 0,
      foodAllowance: 0,
      commissionPercentage: 0,
      bonusReachesThreshold: 0,
      bonusAfter1Year: 0,
      baseSalary: 0,
      status: 'ACTIVE'
    }),
    [data]
  )
  const addNewData = () => {
    setData((data: any) => [...data, initialData])
  }
  const dataQuery = useQuery('payslip-data', getPaySlipFormula, {
    onSuccess: (result) => {
      if (result?.object) {
        setData(result.object?.content)
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      errorNotification(error.response?.data?.message || 'Lỗi hệ thống')
    }
  })

  const contextValue = useMemo(
    () => ({ listData: data, addNewData, loading: dataQuery.isLoading }),
    [data, dataQuery.isLoading]
  )

  return (
    <>
      <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
    </>
  )
}

export const useFormData = () => {
  return useContext(FormContext)
}

export default FormProvider
