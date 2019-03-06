// ajax
$(document).ready(() => {
    const pathname = window.location.pathname;
    const questionId = pathname.split('/')[pathname.split('/').length - 1];
    $.ajax({
        url: `/get-question-by-id?questionId=${questionId}`,
        type: 'GET',
        success: (data) => {
            if (data.id) {
                document.getElementById('question-content').innerText = data.content;
                document.getElementById('total-vote').innerText = data.yes + data.no;

                const yesPercent = data.yes / (data.yes + data.no) * 100;
                const noPercent = 100 - yesPercent;
                document.getElementById('yes-percent').innerText = `${yesPercent.toFixed(2)} %`;
                document.getElementById('no-percent').innerText = `${noPercent.toFixed(2)} %`;
            } else {
                document.getElementById('question-content').innerText = 'question not found';
            }
        },
        error: (error) => {
            console.log(error); 
        },
    });
})