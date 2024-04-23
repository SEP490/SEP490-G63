// import { useMsal } from '@azure/msal-react';
// import { useEffect, useState } from 'react';
// import { InteractionRequiredAuthError, InteractionStatus } from '@azure/msal-browser';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setStatusLoading } from '../store/LoadingSlice';

// const useRefreshToken = (api, ...parameter) => {
//     const { instance, inProgress, accounts } = useMsal();
//     const [data, setData] = useState(null);
//     const navigate = useHistory();
//     const [refresh, setRefresh] = useState();
//     const dispatch = useDispatch();
//
// const handleCallApi = (accessTokenResponse, isMounted) => {
//         api(token, ...parameter)
//             .then((res) => {
//                 setData(res);
//                 setTimeout(() => {
//                     dispatch(setStatusLoading(false));
//                 }, 300);
//             })
//             .catch(() => {
//                 dispatch(setStatusLoading(false));
//             });
//     };
//     useEffect(() => {
//         const controller = new AbortController();
//         let isMounted = true;
//         dispatch(setStatusLoading(true));
//         if (inProgress === InteractionStatus.None) {
//             const accessTokenRequest = {
//                 account: accounts[0]
//             };
//             instance
//                 .acquireTokenSilent(accessTokenRequest)
//                 .then((accessTokenResponse) => {
//                     handleCallApi(accessTokenResponse, isMounted);
//                 })
//                 .catch((error) => {
//                     dispatch(setStatusLoading(false));
//                     if (error instanceof InteractionRequiredAuthError) {
//                         instance
//                             .acquireTokenPopup(accessTokenRequest)
//                             .then(function (accessTokenResponse) {
//                                 handleCallApi(accessTokenResponse, isMounted);
//                             })
//                             .catch(function (error) {
//                                 dispatch(setStatusLoading(false));
//                                 navigate.replace('/page-error-503');
//                             });
//                     } else {
//                         navigate.replace('/page-error-503');
//                     }
//                 });
//         }
//         return () => {
//             isMounted = false;
//             dispatch(setStatusLoading(false));
//             controller.abort();
//         };
//     }, [instance, accounts, inProgress, ...parameter, refresh]);

//     return [data, setRefresh, setData];
// };

// export default useRefreshToken;
// useRefreshToken.js
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStatusLoading } from '../redux/LoadingSlice'

const useRefreshToken = (api: any, ...parameter: any) => {
  const [data, setData] = useState<any>(null)
  const [refresh, setRefresh] = useState<any>() // Initialize to false
  const dispatch = useDispatch()

  const handleCallApi = () => {
    dispatch(setStatusLoading(true))

    api(...parameter)
      .then((res: any) => {
        setData(res)
        setTimeout(() => {
          dispatch(setStatusLoading(false))
        }, 500)
      })
      .catch((error: any) => {
        console.log(error)

        dispatch(setStatusLoading(false))
      })
  }

  useEffect(() => {
    handleCallApi()
  }, [refresh, ...parameter])

  return [data, () => setRefresh(new Date())] // Change setRefresh to a function that triggers a refresh
}

export default useRefreshToken
