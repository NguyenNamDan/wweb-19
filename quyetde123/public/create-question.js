console.log('qweqweqweqwe');

window.onload = () => {
  // find element
  const textArea = document.getElementById('content');

  // .addEventListener()
  textArea.addEventListener('input', (event) => {
    const contentLength = textArea.value.length;
    
    // find element
    const remainCharacters = document.getElementById('remain-characters');

    // change content
    remainCharacters.innerText = `${200 - contentLength} characters left`;
  });

  document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get question content
    const form = document.getElementById('create-form');
    const questionContent = form.content.value;
    if (!questionContent) {
      document.getElementById('error-message').innerText = 'Please input question';
    } else {
      $.ajax({
        url: '/create-question',
        type: 'POST',
        data: {
          content: questionContent,
        },
        success: (data) => {
          if (data._id !== null) {
            window.location.href = `/result/${data._id}`
          } else {
            window.alert('Failed to create question');
          }
        },
        error: (error) => {},
      });
    }
  });
};
