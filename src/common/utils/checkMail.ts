import axios from 'axios'

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(func, args)
    }, delay)
  }
}

export async function validateEmail(email: string) {
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

export async function validateEmailWithDebounce(email: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const apiKey = '5e309805ed0446e2949c9c8722d5b02d'

  try {
    const response = await axios.get('https://emailvalidation.abstractapi.com/v1/', {
      params: {
        api_key: apiKey,
        email: email
      }
    })

    const isValid = response.data.deliverability === 'DELIVERABLE'

    if (isValid) {
      console.log('Email hợp lệ.')
    } else {
      alert('Email không hợp lệ.')
    }

    return isValid
  } catch (error) {
    console.error('Lỗi khi kiểm tra email:', error)
    return false
  }
}
export const validateEmailDebounced = debounce(validateEmailWithDebounce, 3000)

export const handleSubmitBank = async (bin: string, accountNumber: number) => {
  const clientID = '258d5960-4516-48c5-9316-bb95b978424f'
  const apiKey = '5fe49afb-2e07-4079-baf6-ca58356deadd'
  try {
    const response = await axios.post(
      'https://api.vietqr.io/v2/lookup',
      {
        bin,
        accountNumber
      },
      {
        headers: {
          'x-client-id': clientID,
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    const data = response.data
    if (data.code === '00') {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    alert('Lỗi khi truy cập API')
  }
}
