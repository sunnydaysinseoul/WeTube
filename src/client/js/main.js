import "../scss/style.scss";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

/////// get elements
const videoInput = document.getElementById("video");
const closebtn = document.getElementById("closebtn");
const openbtn = document.getElementById("openbtn");
const inputImage = document.getElementsByClassName("inputImage")[0];

/////// 메뉴바(sidenav) 여닫기
export const handleOpenSidenav=()=> {
  document.getElementById("sidenav").style.width = "250px";
}
/* Set the width of the side navigation to 0 */
export const handleCloseSidenav=()=> {
  document.getElementById("sidenav").style.width = "0";
}


//////// video upload시
export const handleVideoClick = (event) => {
  document.getElementById("videoLoading").style.visibility = "visible";
};
export const handleVideoInput = (event) => {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("videoLoading").style.visibility = "hidden";
    // console.log(event.target.files[0].name);
  };
  document.getElementById("videoLoading").style.visibility = "hidden";
  
  ffmpeg.FS("writeFile", "videoUpload.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "videoUpload.webm", "-r", "60", "output.mp4");

};
export const handleLoading = () => {
  document.getElementById("page").style.display = "block";
  document.getElementById("pageLoading").style.display = "none";
};



/////// avatar upload 미리보기
export const handleInputImage= (e) => {
  const input = e.target;
  console.log(input);
  // 인풋 태그에 파일이 있는 경우
  if(input.files && input.files[0]) {
    // 이미지 파일인지 검사 (생략)
    // FileReader 인스턴스 생성
    const reader = new FileReader();
    // 이미지가 로드가 된 경우
    reader.onload = e => {
        const previewImage = document.getElementById("preview-image");
        previewImage.src = e.target.result;
    }
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL(input.files[0])
}
}

/////// event listener
window.addEventListener("load", handleLoading);

if (videoInput) {
  videoInput.addEventListener("click", handleVideoClick);
  videoInput.addEventListener("input", handleVideoInput);
}

// closebtn.addEventListener("click",handleCloseSidenav);
// openbtn.addEventListener("click",handleOpenSidenav);
openbtn.addEventListener("mouseover",handleOpenSidenav);
openbtn.addEventListener("mouseout",()=>{
  setTimeout(handleCloseSidenav,1500)});
inputImage.addEventListener("change",handleInputImage);