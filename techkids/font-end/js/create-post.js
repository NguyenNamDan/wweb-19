window.onload = () => {
  const form = document.getElementById("create-post-form");
  form.addEventListener("submit", e => {
    event.preventDefault();

    const postContent = form.content.value;
    if (!postContent) {
      document.getElementById("error-message").innerText =
        "Please input post content";
    } else {
      const postInfo = [
        form.title.value,
        form.content.value,
        form.dataset.value
      ];
      $.ajax({
        url: "/api/auth/get-post",
        type: "post",
        data: {
          postInfo: JSON.stringify(postInfo)
        },
        success: data => {},
        error: error => {}
      });
    }
  });
};
