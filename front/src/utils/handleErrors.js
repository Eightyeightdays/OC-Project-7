export default function handleErrors(response){
    if(!response.ok){
        throw new Error(response.statusText)
    }else{
        return response.json();
    }
}