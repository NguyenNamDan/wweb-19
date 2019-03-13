$(document).ready(() => {
  const pathname = window.location.pathname;
  const questionId = pathname.split('/')[pathname.split('/').length - 1];

  $.ajax({
    url: `/get-question-by-id?questionId=${questionId}`, 
    type: 'GET',
    success: (data) => {
      console.log(data);
      if (data._id !== null) { 
        document.getElementById('question-content').innerText = data.content;
        const totalVotes = data.yes + data.no;
        document.getElementById('total-votes').innerText = totalVotes;

        if (totalVotes != 0) {
          const yesPercent = data.yes / (data.yes + data.no) * 100;
          const noPercent = 100 - yesPercent;
          document.getElementById('yes-percent').innerText = `${yesPercent.toFixed(3)}%`;
          document.getElementById('no-percent').innerText = `${noPercent.toFixed(3)}%`;
        } else {
          document.getElementById('yes-percent').innerText = '50%';
          document.getElementById('no-percent').innerText = '50%';
        }
      } else {
        document.getElementById('question-content').innerText = 'Question not found';
      }
    },
    error: (error) => {
      console.log(error);
    },
  });
})
