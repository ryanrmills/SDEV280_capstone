

//this function is called when the page loads, waits for event called 'DOMContentLoaded'
// document.addEventListener('DOMContentLoaded', () => {
  
//   //when page loads we fetch the data from the php, using the fetch function
//   fetch('../api/players.php')
//     .then(res => res.json())
//     .then(players => {
//       const li = document.createElement('li');

//       li.innerHTML = `

//       `
//     })
// })

$(document).ready(function () {
  $('#player_table').DataTable({
    ajax: {
      url: '../api/get_players.php', // Adjust path as needed
      dataSrc: 'data'
    },
    columns: [
      { data: 'pdga_number' },
      { 
        data: 'full_name',
        render: function(data, type, row){
          return `<a href="./../index.php?id=${row.pdga_number}">${data}</a>`;
        }
      },
      { data: 'division' },
      { data: 'city' },
      { data: 'state'},
      { data: 'country'},
      { data: 'nationality'},
      { data: 'member_since'}
    ],
    pageLength: 25
  });
});