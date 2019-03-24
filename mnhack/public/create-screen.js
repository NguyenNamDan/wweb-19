window.onload = () => {

  document.getElementById('create-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get question content
    const form = document.getElementById('create-form');
    const keeper1 = form.keeper1.value; 
    const keeper2 = form.keeper2.value; 
    const keeper3 = form.keeper3.value; 
    const keeper4 = form.keeper4.value;

    if (!keeper1 && !keeper2 && !keeper3 && !keeper4) {
      document.getElementById('error-keeper').innerText = 'Please input keeper';
    } else {
      $.ajax({
        url: '/create-keeper',
        type: 'POST',
        data: {
          keeper1: keeper1,
          keeper2: keeper2,
          keeper3: keeper3,
          keeper4: keeper4 
        },
        success: (data) => {
          if (data.id !== null) {  
            window.location.href = `/games/${data.id}`   
          } else {
            window.alert('Failed to create keeper');
          }
        },
        error: (error) => {},
      });
    }
  });
};
