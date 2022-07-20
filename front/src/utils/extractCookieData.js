import Cookies from 'js-cookie'

export default function extractCookieData(){
    let token = Cookies.get('token')
    let admin = Cookies.get('isAdmin'); // true or false
    let userId = Cookies.get('userId');

    console.log(userId);

    return {userId: userId, token: token, admin: admin}
}
