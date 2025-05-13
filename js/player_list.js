$(document).ready(function () {
  $("#player_table").DataTable({
    ajax: {
      url: "../api/get_players.php", // Adjust path as needed
      dataSrc: "data"
    },
    columns: [
      { data: "pdga_number" },
      {
        data: "full_name",
        render: function (data, type, row) {
          return `<a target="_blank" href="./../index.php?pdga_number=${row.pdga_number}">${data}</a>`;
        },
      },
      { data: "division" },
      { data: "city" },
      { data: "state" },
      { data: "country" },
      { data: "nationality" },
      { data: "member_since" },
    ],
    pageLength: 25,
  });
});
