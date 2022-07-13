export default function extractCookieData(cookie){
    let admin = cookie.includes("ADMIN"); // true or false
    let userStart =  + 7;
    let userEnd = userStart + 24;
    let userId = cookie.slice(userStart, userEnd);
    let tokenStart = 6;
    let tokenEnd = cookie.search("_USERID_");
    let token = cookie.slice(tokenStart, tokenEnd);

    return {userId: userId, token: token, admin: admin}
}