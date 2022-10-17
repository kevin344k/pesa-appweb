let data =  [
        {
            recordID: 1,
            row: "Irwin #5",
            tooltip: "Run",
            start: "Wed Jun 03 2020 14:21:55",
            end: "Wed Jun 03 2020 21:21:55",
            groupId: 5
        }
    ];


//This could be an API call to grab data
function refreshFunction() {
    return data;
}

//Parameters that the chart expects
let params = {
    sidebarHeader: "Unused right now",
    noDataFoundMessage: "No data found",
    startTimeAlias: "start",
    endTimeAlias: "end",
    idAlias: "recordID",
    rowAlias: "row",
    linkAlias: null,

    tooltipAlias: "tooltip",
    //groupBy: "groupId,subGroupId",
    groupByAlias: "group,subGroup",
    refreshFunction: refreshFunction
}

//Create the chart.
//On first render the chart will call its refreshData function on its own.
let ganttChart = new Gantt("chart", params);

//To refresh the chart's data
ganttChart.refreshData();