$(document).ready(() => {
  let tableRound = document.getElementById("tableRound");
  let tableLength = tableRound.rows.length;
  document.getElementById("add").addEventListener("click", e => {
    const addRound = `
        <tr> 
        <td>Round${tableLength}</td>
        <td><input type="text" id='r${tableLength}k1'></td>
        <td><input type="text" id='r${tableLength}k2'></td>
        <td><input type="text" id='r${tableLength}k3'></td>
        <td><input type="text" id='r${tableLength}k4'></td>
        </tr>
        `;
    $("#add-round").append(addRound);
    tableLength++;
  });

  const pathname = window.location.pathname;
  const gameId = pathname.split("/")[pathname.split("/").length - 1];

  $.ajax({
    url: `/get-player-screen/${gameId}`,
    type: "get",
    success: data => {
      document.getElementById("keeper1").innerText = data.keeper1;
      document.getElementById("keeper2").innerText = data.keeper2;
      document.getElementById("keeper3").innerText = data.keeper3;
      document.getElementById("keeper4").innerText = data.keeper4;
      document.getElementById("total1").innerText = data.total1;
      document.getElementById("total2").innerText = data.total2;
      document.getElementById("total3").innerText = data.total3;
      document.getElementById("total4").innerText = data.total4;
    }
  });
});
