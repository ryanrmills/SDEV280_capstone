console.log("hello")
// const jsonData = await fetch("http://localhost/sdev280capstone/api/tabletest.php")
      // console.log(jsonData.json())
      // 
      //console.log(fetch("https://profilebuilders.greenriverdev.com/tabletest.php"))
      $(document).ready(function () {
        $("#rounds-table").DataTable({
          ajax: {
            url: "http://localhost/sdev280capstone/api/tabletest.php", // Adjust path as needed
            dataSrc: "data"
          },
          columns: [
            { data: "event_round_id" },
            {
              data: "pdga_event_id"
              // render: function (data, type, row) {
              //   return `<a href="./../index.php?pdga_number=${row.pdga_number}">${data}</a>`;
              // },
            },
            { data: "pdga_number" },
            { data: "division" },
            { data: "round" },
            { data: "score" },
            { data: "rating" },
          ],
          pageLength: 25,
        });
      });