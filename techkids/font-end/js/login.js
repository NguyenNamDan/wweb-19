window.onload = () => {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", e => {
    event.preventDefault();

    if (!form.email.value || !form.password.value) {
      document.getElementById("error-login").innerText = "empty";
    }

    const loginInfo = [form.email.value, form.password.value];

    // send ajax
    $.ajax({
      type: "post",
      url: "/api/auth/login",
      data: {
        loginInfo: JSON.stringify(loginInfo)
      },
      success: data => {
        window.alert(data.message);
      },
      error: error => {
        console.log(error);
      }
    });
  });
};
