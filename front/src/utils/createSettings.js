import Cookies from "js-cookie";

export default function createSettings(method, type, body){
    let settings = {
        method: method,
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Authorization": Cookies.get("token"),
        },
        body: body
    }
    
    if(type){
        settings.headers["content-type"] = "application/json";
    }
    return settings
}