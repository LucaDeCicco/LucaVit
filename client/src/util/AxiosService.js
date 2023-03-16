// import axios from 'axios';
//
// const backend = process.env.REACT_APP_BACKEND;
// let token = null;
// const user = JSON.parse(localStorage.getItem('user'));
// if (user){
//     token = user.token;
// }
//
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response.status === 401) {
//             console.log("401 error")
//             // window.location.replace('/login');
//         }
//         else {
//             console.log("ceva")
//             // window.location.replace('/');
//         }
//         return Promise.reject(error);
//     }
// );
//
// export const newPost =async (data) => {
//     try {
//         await axios.post(backend + "announcement/add", {
//             data
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + token
//             }
//         });
//         // window.location.replace("/");
//     } catch (e) {
//         console.log(e);
//     }
//
// }
