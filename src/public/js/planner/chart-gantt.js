const socketC = io();

google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  socketC.emit("client:chart");
  socketC.on("server:chart", (rows) => {


    var data = new google.visualization.DataTable();
    data.addColumn("string", "Id Planner");
    data.addColumn("string", "Línea");
    data.addColumn("string", "Producto");
    data.addColumn("date", "Inicia");
    data.addColumn("date", "Finaliza");
    data.addColumn("number", "Duration");
    data.addColumn("number", "Avance");
    data.addColumn("string", "Dependencies");
  


    rows.forEach((element) => {
     
       element = [ (element.id_plan).toString(),
        element.linea_name,
        element.desc_prod_plan,
        new Date(element.date_start),
        new Date(element.date_end),
        element.cant_plan,
        null,
        null
      ]
      console.log(element)
      data.addRow(element);
   

    });
    
   
    var options = {
      height: 400,
      gantt: {
        trackHeight: 30,
      },
    };
  
    var chart = new google.visualization.Gantt(
      document.getElementById("chart_div")
    );
  
    chart.draw(data, options);

  });


}
