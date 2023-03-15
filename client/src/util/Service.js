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

export function setupTokenExpirationChecking() {
    const user = JSON.parse(localStorage.getItem('user'));
    let token = null
    if (user) {
        token = user.token
    }
    // console.log(token);
    if (!token) {
        return false;
    }
    const expirationDate = getTokenExpirationDate(token);
    if (!expirationDate) {
        return false;
    }
    if (new Date() >= expirationDate) {
        localStorage.removeItem('user');
        // localStorage.removeItem('loggedIn');
        return false;
    }
    return true;
}

export function checkLogin(value, setter){
    // let expirationChecking = true;
    const intervalId = setInterval(() => {
        let expirationChecking = setupTokenExpirationChecking();
        // console.log("aaa:" + expirationChecking);
        if (!expirationChecking) {
            clearInterval(intervalId);
            console.log("Interval cleared");
            setter(!value);
            // window.location.replace("/login")
            // window.location.reload()
        }
    }, 1000);

    return () => clearInterval(intervalId);
}
