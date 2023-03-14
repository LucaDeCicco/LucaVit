// import jwt_decode from 'jsonwebtoken/decode';
import jwt_decode from 'jwt-decode';
//
export function getTokenExpirationDate(token) {
    const decodedToken = jwt_decode(token);
    // const decodedToken = "jwt_decode(token)";
    if (!decodedToken.exp) {
        return null;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    return expirationDate;
}

// export function setupTokenExpirationChecking() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     let token = user.token
//     // const token = localStorage.getItem('user').token;
//     console.log(token);
//     if (!token) {
//         return;
//     }
//     const expirationDate = getTokenExpirationDate(token);
//     if (!expirationDate) {
//         return;
//     }
//     const intervalId = setInterval(() => {
//         if (new Date() >= expirationDate) {
//             clearInterval(intervalId);
//             localStorage.removeItem('jwtToken');
//         }
//     }, 1000); // Verificați intervalul de expirare la fiecare 1000ms (1 secundă)
// }

