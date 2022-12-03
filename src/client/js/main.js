import "../scss/style.scss";


/////// get elements
const videoInput = document.getElementById("video");
const closebtn = document.getElementById("closebtn");
const openbtn = document.getElementById("openbtn");


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
};
export const handleLoading = () => {
  document.getElementById("page").style.display = "block";
  document.getElementById("pageLoading").style.display = "none";
};



/////// event listener
window.addEventListener("load", handleLoading);

if (videoInput) {
  videoInput.addEventListener("click", handleVideoClick);
  videoInput.addEventListener("input", handleVideoInput);
}

closebtn.addEventListener("click",handleCloseSidenav);
openbtn.addEventListener("click",handleOpenSidenav);