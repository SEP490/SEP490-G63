import { createContext } from 'react'
import useToast from '../hooks/useToast'
import { useDispatch } from 'react-redux'
import { setStatusLoading } from '../redux/LoadingSlice'

export const GetTokenV2Context = createContext<any>(undefined)

export const GetTokenV2ContextProvider = (props: any) => {
  const { successNotification, errorNotification } = useToast()
  const dispatch = useDispatch()

  function handleSuccessToast(message: string, callback: any, res: any) {
    dispatch(setStatusLoading(false))
    message && successNotification(message)
    callback && callback(res)
  }
  // function handleWarningToast(message: string, callback: any, res: any) {
  //   dispatch(setStatusLoading(false))
  //   message && warningNotification({ type: 'warning', message: message })
  //   callback && callback(res)
  // }
  function handleErrorToast(message: string, callback: any) {
    dispatch(setStatusLoading(false))
    errorNotification(message)
    callback && callback()
  }

  // function getToken(api, message, callbackSuccess, callbackError, body, ...para) {
  //     if (inProgress === InteractionStatus.None) {
  //         dispatch(setStatusLoading(true));
  //         const accessTokenRequest = {
  //             account: accounts[0]
  //         };
  //         instance
  //             .acquireTokenSilent(accessTokenRequest)
  //             .then((accessTokenResponse) => {
  //                 // Acquire token silent success
  //                 let accessToken = accessTokenResponse.accessToken;
  //                 let token = {
  //                     headers: {
  //                         Authorization: `Bearer ${accessToken}`
  //                     }
  //                 };
  //                 // Call your API with token
  //                 //api here
  //                 api(token, ...para, body)
  //                     .then((res) => {
  //                         handleSuccessToast(message, callbackSuccess, res);
  //                     })
  //                     .catch(function (error) {
  //                         handleErrorToast(error, callbackError);
  //                     });
  //             })
  //             .catch((error) => {
  //                 if (error instanceof InteractionRequiredAuthError) {
  //                     instance
  //                         .acquireTokenPopup(accessTokenRequest)
  //                         .then(function (accessTokenResponse) {
  //                             // Acquire token interactive success
  //                             let accessToken = accessTokenResponse.accessToken;
  //                             let token = {
  //                                 headers: {
  //                                     Authorization: `Bearer ${accessToken}`
  //                                 }
  //                             };
  //                             //api here
  //                             api(token, ...para, body).then((res) => {
  //                                 handleSuccessToast(message, callbackSuccess, res);
  //                             });
  //                         })
  //                         .catch(function (error) {
  //                             handleErrorToast(error, callbackError);
  //                         });
  //                 } else {
  //                     handleErrorToast(error, callbackError);
  //                 }
  //             });
  //     }
  // }
  function getToken(api: any, message: string, callbackSuccess: any, callbackError: any, body: any, ...para: any) {
    dispatch(setStatusLoading(true))
    // Call your API without the Authorization header
    api(...para, body)
      .then((res: any) => {
        handleSuccessToast(message, callbackSuccess, res)
      })
      .catch((error: any) => {
        handleErrorToast(error, callbackError)
      })
  }

  function getTokenDownloadCV(
    api: any,
    message: string,
    callbackSuccess: any,
    callbackError: any,
    ID: any,
    fileName: any
  ) {
    api(ID)
      .then((res: any) => {
        try {
          const blob = new Blob([res.data], { type: 'application/octet-stream' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `CV_${fileName || ''}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error: any) {
          handleErrorToast(error, callbackError)
        }
      })
      .catch(function (error: any) {
        handleErrorToast(error, callbackError)
      })
  }
  function getTokenDownloadFile(
    api: any,
    message: string,
    callbackSuccess: any,
    callbackError: any,
    ID: any,
    fileName: any
  ) {
    api(ID)
      .then((res: any) => {
        try {
          const blob = new Blob([res.data], { type: 'application/octet-stream' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `${fileName}.rar`
          document.body.appendChild(link)
          link.click()
        } catch (error: any) {
          handleErrorToast(error, callbackError)
        }
      })
      .catch(function (error: any) {
        handleErrorToast(error, callbackError)
      })
  }

  function getTokenFormData(
    api: any,
    message: string,
    callbackSuccess: any,
    callbackError: any,
    body: any,
    ...para: any
  ) {
    api(...para, body) // Gọi API trực tiếp mà không cần token
      .then((res: any) => {
        handleSuccessToast(message, callbackSuccess, res)
      })
      .catch(function (error: any) {
        handleErrorToast(error, callbackError)
      })
  }

  const getTokenPromise = (api: any, ...para: any) => {
    return api(...para)
      .then((res: any) => {
        return res
      })
      .catch((error: any) => {
        console.log(error)

        // Handle error here
      })
  }

  return (
    <GetTokenV2Context.Provider
      value={{
        getToken,
        getTokenFormData,
        getTokenDownloadCV,
        getTokenPromise,
        getTokenDownloadFile
      }}
    >
      {props.children}
    </GetTokenV2Context.Provider>
  )
}
