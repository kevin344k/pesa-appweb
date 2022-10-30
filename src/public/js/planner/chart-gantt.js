google.charts.load("current", { packages: ["gantt"] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Task ID");
  data.addColumn("string", "Task Name");
  data.addColumn("string", "Resource");
  data.addColumn("date", "Start Date");
  data.addColumn("date", "End Date");
  data.addColumn("number", "Duration");
  data.addColumn("number", "Percent Complete");
  data.addColumn("string", "Dependencies");

  data.addRows([
    [
      "2014Spring",
      "Irwin 1",
      "spring",
      new Date(2022, 10, 25),
      new Date(2022, 10, 27),
      null,
      100,
      null,
    ],
    [
      "2014Summer",
      "Irwin 2",
      "summer",
      new Date(2022, 10, 21),
      new Date(2022, 10, 22),
      null,
      100,
      null,
    ],
    [
      "2014Autumn",
      "Irwin 3",
      "autumn",
      new Date(2022, 10, 21),
      new Date(2022, 11, 20),
      null,
      100,
      null,
    ],
    [
      "2014Winter",
      "Irwin 5",
      "winter",
      new Date(2022, 10, 21),
      new Date(2022, 10, 23),
      null,
      100,
      null,
    ],
    [
      "2015Spring",
      "Comomdore",
      "spring",
      new Date(2022, 10, 22),
      new Date(2022, 10, 20),
      null,
      50,
      null,
    ],
    [
      "2015Summer",
      "Irwin 5",
      "summer",
      new Date(2022, 10, 21),
      new Date(2022, 10, 20),
      null,
      0,
      null,
    ],
    [
      "2015Autumn",
      "Irwin 3",
      "autumn",
      new Date(2022, 10, 21),
      new Date(2022, 10, 20),
      null,
      0,
      null,
    ],
    [
      "2015Winter",
      "Irwin 2",
      "winter",
      new Date(2022, 10, 21),
      new Date(2022, 10, 21),
      null,
      0,
      null,
    ],
  

   
  
  ]);

  var options = {
    height: 400,
    gantt: {
      trackHeight: 30,
    },
  };
console.log(options)
  var chart = new google.visualization.Gantt(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}
