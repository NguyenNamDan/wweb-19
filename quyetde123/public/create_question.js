$(document).ready(() => {
  const textArea = document.getElementById("content");
  textArea.addEventListener('input', event => {
    const contentLength = textArea.value.length; 
    const remainCharacter = document.getElementById("remain-character");
    remainCharacter.innerText = `${200 - contentLength} characters left`;
  });   
  const submit = document.getElementById('submit');
  submit.addEventListener("click", event => {
    $.ajax({
      url: `/create_question?contentQuestion=${textArea.value}`, 
      type: "GET",
      success: (data) => {
        console.log("ok!"); 
      }
    });
  });
});
