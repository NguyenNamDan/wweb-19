console.log("namdan");
window.onload = () => {
  const form = document.getElementById("create-user-form");
  form.addEventListener("submit", e => {
    event.preventDefault();

    if (
      !form.email.value ||
      !form.password.value ||
      !form.firstName.value ||
      !form.lastName.value
    ) {
      document.getElementById("error-register").innerText = "empty";
    }

    const userInfo = [
      form.email.value,
      form.password.value,
      form.firstName.value,
      form.lastName.value
    ];

    // send ajax
    $.ajax({
      type: "post",
      url: "/api/auth/register",
      data: {
        userInfo: JSON.stringify(userInfo)
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
