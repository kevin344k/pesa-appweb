const socket=io("/dashboard")
let chartUndProd;
const formDates=document.querySelector("#formDates")
const canvas_unitsProduced=document.querySelector("#canvas-unitsProduced")
formDates.addEventListener("submit",e=>{
  e.preventDefault()

if(formDates.dateStartDash.value!="" && formDates.dateEndDash.value!="" ){
    const dateSarch={
    date_Start:`${formDates.dateStartDash.value}T00:00:00.000Z`,
    date_End:`${formDates.dateEndDash.value }T00:00:00.000Z`
  }
  socket.emit("dash:dates",dateSarch)
}else{
  alert("Ingrese las fechas a buscar!")
}
  
})
socket.on("dash:server:resultDates",data=>{
  
  if(data.length==0){
    const msg="No se encontraron resultados para la(s) fechas seleccionada!"
    alert(msg)
  }else{
      //console.log(data)
    //capturando la data y pasandola a chart js
graphUnitsProduced(data)

  }

})

const getDataColors=opacity=>{
    const colors =['#7448c2','#27ae60','#3498db','#2c3e50','#e74c3c','#1abc9c','#bdc3c7','#8e44ad','#f39c12','#ecf0f1']
    return colors.map(color=>opacity ? `${color+opacity}`:color)
}

function graphUnitsProduced(arr){
      const tags=arr.map(function(linea){
        
  return (linea.linea )
})

console.log(tags)

     const perfor=arr.map(function(linea){
        
  return (linea.EFICIENCIA )
})

console.log(perfor)
   const prodArr=arr.map(function(linea){
        
  return (linea.articulo )
})

console.log(prodArr)

  if(chartUndProd){
    chartUndProd.destroy()
  }
  
 chartUndProd=new Chart(canvas_unitsProduced, {
   
    type: 'bar',
    data: {
      labels: tags,
      datasets: [{
        label:prodArr ,
        data: perfor,
        fill:false,
        borderColor: getDataColors(),
        backgroundColor: getDataColors(10),
        borderWidth: 1
      }]
    },
    options: {
      responsive:true,
      plugins:{
         legend:{
        display:false
      },
        datalabels:{
          formatter:(perfor)=>perfor+"%"
        }
      },
      
        title:{
        display:false
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
}



