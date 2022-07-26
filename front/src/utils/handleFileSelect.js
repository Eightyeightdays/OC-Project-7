export default function handleFileSelect(event, file, error, src){
    let currentFile = event.target.files[0];
    file(currentFile.name);
    if(currentFile.type !== "image/png" && currentFile.type !== "image/jpg" && currentFile.type !== "image/jpeg" && currentFile.type !== "image/gif"){
        error("File must be either png, jpg or gif format only");
        const errorElement = document.getElementById("error"); // target popup element
        errorElement.className="visible";   // make error popup visible
        setTimeout(()=>{
            errorElement.className = errorElement.className.replace("visible", "")}, // remove popup
            5000);
    }else{
        let url = URL.createObjectURL(currentFile);   // create a preview of the selected file
        src(url);
    }
}