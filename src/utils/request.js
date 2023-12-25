// // // request.js
// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
// // });

// // export const httpGet = async (url, params = {}) => {
// //   try {
// //     const response = await api.get(url, { params });
// //     return response.data;
// //   } catch (error) {
// //     console.error('GET request error:', error);
// //     throw error; // Re-throw to handle in components
// //   }
// // };

// // export const httpPost = async (url, data) => {
// //   try {
// //     const response = await api.post(url, data);
// //     return response.data;
// //   } catch (error) {
// //     console.error('POST request error:', error);
// //     throw error; // Re-throw to handle in components
// //   }
// // };



































// /*global SYSTEM_CONFIG*/
// /*eslint no-undef: "error"*/

// import axios from "axios";
// import store from "@/store";
// import Qs from "qs";
// import { getBaseURL } from "./baseURL";
// import router from "@/router/index";

// let TIMEOUT = 5 * 60 * 1000; //Converted Minute to MilliSeconds
// let requestCounter = 0;


// const service = axios.create({
//   baseURL: getBaseURL(),
//   withCredentials: false,
//   timeout: TIMEOUT,
//   paramsSerializer: params => Qs.stringify(params, { arrayFormat: "repeat" })
// });


// const errorTemplate = errorList => {
//   let errorMsgTemplate = "";
//   errorList.forEach((errObj) => {
//     if (isLocalEnv) {
//       errorMsgTemplate += "Error Code : " + errObj.code +
//         "\n" + "Message : " + errObj.message + "\n";
//     } else {
//       errorMsgTemplate += errObj.message + "\n";
//     }
//   });
//   return errorMsgTemplate;
// }

// const isErrorHandlerEnabled = (config = {}) => {
//   // return config.hasOwnProperty("errorHandlerEnabled") &&
//   //   !config.isErrorHandlerEnabled
//   //   ? false
//   //   : true;
//   return config.hasOwnProperty("errorHandlerEnabled") ?
//     config.errorHandlerEnabled
//     : true;
// };

// // const requesthandler = request => {
// //   // NOTE: 
// //   // isAnonymous: if API type is Anonymous (API which is not requried any type of token in header) set this object key to true 
// //   // isPublicApi: if API type is public (API which is required the public auth token) set this object key to true
// //   let cultureName = globalMixins.methods.getCultureName();
// //   requestCounter++;
// //   NProgress.start();
// //   toggleOverlay(true);
// //   if(cultureName && request.headers != "" && request.headers != null && !request.headers.hasOwnProperty("culture-name")) {
// //     request.headers["culture-name"] = cultureName;
// //   } else {
// //     if(request.headers === "") {
// //       request.headers = {};
// //       request.headers["culture-name"] = cultureName;
// //     }  
// //   }
// //   if (request.isAnonymous == null) { 
// //     if (request.isPublicApi) {
// //       if (store.state.master.public != null && store.state.master.public.token != null) {
// //         //request.headers["culture-name"] = cultureName;
// //         request.headers["public-auth-token"] = store.state.master.public.token;
// //       }
// //     } else {
// //       if (store.state.master.auth != null && store.state.master.auth.token != null) {
// //        // request.headers["culture-name"] = cultureName;
// //         request.headers["auth-token"] = store.state.master.auth.token;
// //       }
// //     } 
// //   }
// //   return request;
// // };

// const requestErrorHandler = error => {
//   if (--requestCounter == 0) {
//     NProgress.done();
//     NProgress.remove();
//     toggleOverlay(false);
//   }
//   return error;
// };

// const responseSucessHandler = response => {
//   if (--requestCounter == 0) {
//     NProgress.done();
//     NProgress.remove();
//     toggleOverlay(false);
//   }
//   return response;
// };

// const responseErrorHandler = error => {
//   let errorList = [];
//   if (isErrorHandlerEnabled(error.config)) {
//     let res = error.response;

//     if (res && res.data) {
//       let requestId = res.headers["request-id"];
//       switch (res.status) {
//         case 400:
//         case 401:
//         case 403:
//         case 500:
//         case 405:
//         case 406: {
//           --requestCounter;
//           if (res.status === 401 && res.data.errors[0].code === AUTH0013) {
//             //remove token
//             localStorage.removeItem("settings"); 
//             // store.state.master.auth = null;
//             if(router.history.current.name != "UnauthorizedAccess" && router.history.current.name != "Login"){
//               localStorage.clear();
//               //document.cookie = CookieName.Language_Cookie+ "=; Max-Age=0; path=/";
//               // store.dispatch("subscriber/clearEntities");
//               router.go({ name: "Login" });
//             }
//             NProgress.done();
//             NProgress.remove();
//             toggleOverlay(false);
//             return;
//           }
          
//           // when response type is arraybuffer , then we need to parse the response to get errors
//           if (res.data instanceof ArrayBuffer) {
//             const text = String.fromCharCode.apply(null, Array.from(new Uint8Array(res.data)));
//             res.data = JSON.parse(text) //Override response data
//             errorList = res.data.errors;
//           } else {
//             errorList = res.data.errors;
//           }
//           let statusTextRef;
//           if (res.status === 403 && !isLocalEnv) {
//             statusTextRef = null;
//           } else {
//             statusTextRef = res.statusText;
//           }

//           NotificationUtil.error(
//             res.status === 406 ? "Error" : statusTextRef,
//             isLocalEnv ? localErrorTemplate(res.data, requestId) : errorTemplate(errorList)
//           );
//           break;
//         }
//         case 422: {
//           --requestCounter;
//           let validationData = res.data;
          
//           // when response type is arraybuffer , then we need to parse the response to get errors
//           if (res.data instanceof ArrayBuffer) {
//             const text = String.fromCharCode.apply(null, Array.from(new Uint8Array(res.data)));
//             res.data = JSON.parse(text) //Override response data
//             validationData = res.data;
//           } else {
//             validationData = res.data;
//           }

//           if(res.data.hasOwnProperty("validationErrors")){
//             validationData = res.data.validationErrors;
//           }
          
//           let multipleErrors = "";
//           if (validationData.length > 0) {
//             validationData.forEach((data) => {
//               errorList = data.errors;
//               multipleErrors += errorTemplate(errorList);
//             });
//             NotificationUtil.error(
//               res.statusText,
//               multipleErrors
//             );
//           }
//           break;
//         }
//         case 503: {
//           //Don't Remove this case. 503 is using for Under Maintenance
//           break;
//         }

//         default: {
//           --requestCounter;
//           errorList = res.data.errors;
//           NotificationUtil.error(
//             res.statusText,
//             isLocalEnv ? localErrorTemplate(res.data, requestId) : errorTemplate(errorList)
//           );
//           break;
//         }
//       }
//     } else {
//       --requestCounter;
//       NotificationUtil.error(
//         "Error",
//         "Connection Timeout Error, Please try again"
//       );
//     }
//   } else if (
//     error.config &&
//     error.response &&
//     (error.response.status === 400 ||
//       error.response.status === 403 ||
//       error.response.status === 405 ||
//       error.response.status === 406 ||
//       error.response.status === 417 ||
//       error.response.status === 422 ||
//       error.response.status === 500)
//   ) {
//     --requestCounter;
//   } else {
//     --requestCounter;
//   }

//   underMaintenance(error);

//   NProgress.done();
//   NProgress.remove();
//   toggleOverlay(false);
//   return Promise.reject(error);
// };

// const underMaintenance = (error) => {
//   if(error.config && error.response && error.response.status === 503){
//     --requestCounter;
//     store.dispatch("master/setUndermaintenance", true);
//     if (router.history.current.name != "UnderMaintenance") {
//       router.push({ name: "UnderMaintenance" });
//     }
//   } else {
//     store.dispatch("master/setUndermaintenance", false);
//   }
// }

// service.interceptors.request.use(
//   request => requesthandler(request),
//   error => requestErrorHandler(error)
// );

// service.interceptors.response.use(
//   response => responseSucessHandler(response),
//   error => responseErrorHandler(error)
// );

// export default service;
