import "../scss/style.scss";
const videoInput = document.getElementById("video");

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
  document.getElementById("loading").style.display = "none";
};
window.addEventListener("load", handleLoading);

if (videoInput) {
  videoInput.addEventListener("click", handleVideoClick);
  videoInput.addEventListener("input", handleVideoInput);
}
