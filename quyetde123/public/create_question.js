window.onload = () => {
    // find element
    const textArea = document.getElementById('content');

    // .addEventListener()
    textArea.addEventListener('input', (event) => {
        const contentLength = textArea.value.length;
    
    // find element
    const remainCharacter = document.getElementById('remain-character');

    // change content
    remainCharacter.innerText = `${200 - contentLength} characters left`;
    }); 
};