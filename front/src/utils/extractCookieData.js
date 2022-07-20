export default function extractCookieData(cookie){
    let tokenStart = 6;
    let tokenEnd = cookie.search("_USERID_");
    let token = cookie.slice(tokenStart, tokenEnd);
    let userStart =  tokenEnd + 8;
    let userEnd = userStart + 24;
    let userId = cookie.slice(userStart, userEnd);
    let admin = cookie.includes("ADMIN"); // true or false

    return {userId: userId, token: token, admin: admin}
}