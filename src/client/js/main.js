import "../scss/style.scss";
const videoInput = document.getElementById("video");

export const handlevideoInput = (event) =>{
    // console.log("이벤트발생");
    document.getElementById("videoLoading").style.visibility = "visible";
    const reader = new FileReader();
  reader.onload = () => {
    // console.log('파일 업로드 완료.');
    document.getElementById("videoLoading").style.visibility = "hidden";
    console.log(event.target.files[0].name);
  };
  reader.readAsText(event.target.files[0]);
}
export const handleLoading = () =>{
    document.getElementById("page").style.display = "block";
    document.getElementById("loading").style.display = "none";
}
window.addEventListener("load", handleLoading);
if(videoInput){
videoInput.addEventListener("input",handlevideoInput);
}