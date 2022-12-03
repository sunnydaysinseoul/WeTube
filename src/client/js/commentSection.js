const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtns = document.querySelectorAll("#deleteBtn");

const deleteNewComment = async(event) =>{
    const videoComments = document.querySelector(".video__comments ul");
    const comment = event.target.parentElement;
    videoComments.removeChild(comment);
    const commentId = comment.dataset.id;
    await fetch(`/api/videos/${commentId}/delete`, {method: "POST"});
};

const handleDeleteComment = async (event) =>{
    // console.log(event.target.parentElement);
    // const videoComments = document.querySelector(".video__comments ul");
    const comment = event.target.parentElement;
    const videoComments = comment.parentElement;
    console.log(videoComments);
    console.log(comment);

    videoComments.removeChild(comment);

    const commentId = comment.dataset.id;
    await fetch(`/api/videos/${commentId}/delete`, {method: "POST"});

};


const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  console.log(videoComments);
  const newComment = document.createElement("div");
  newComment.dataset.id = id; //삭제를 위해 backend에서 만드는 dataset과 똑같이 만들어줌.
  newComment.className = "container video__comment";
  const icon = document.createElement("i");
  icon.className = "fa-regular fa-comment";
  const span = document.createElement("span");
  span.className = "commentText";
  span.innerText = `${text}`;
  const span2 = document.createElement("span");
  span2.className = "fa-solid fa-delete-left";
  span2.id = "newComt"+Math.random();
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);

  span2.addEventListener("click",deleteNewComment);

};

const handleSubmit = async (event) => {
  event.preventDefault(); //submit event가 발생하면 자동으로 url refresh하는 걸 막아줌.
  const textarea = form.querySelector("textarea");

  const text = textarea.value;
  const videoId = videoContainer.dataset.id; //comment단 해당 video의 dataset가져오기.
  if (text === "" || text.trim() === "") {
    return;
  }
  const response  = await fetch(`/api/videos/${videoId}/comment`, {
    //fetch request를 보낼때는 cookie도 같이 보내기때문에 backend에서 session.user값도 사용할 수 있음.
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  }); //backend에서 req.body로 데이터 사용!
  textarea.value = "";
  const { newComment } = await response.json();
  if (response.status === 201) { //realtime용 fakeComment 만들기
    addComment(text, newComment._id); //newCommentId는 backend createComment()에서 오는 값
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  Array.from(deleteBtns).forEach(button => button.addEventListener("click", handleDeleteComment));
}
