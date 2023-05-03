const socket=io("/dashboard")
const formDates=document.querySelector("#formDates")
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
  const canvas_unitsProduced=document.querySelector("#canvas-unitsProduced")
  if(data.length==0){
    const msg="No se encontraron resultados para la(s) fechas seleccionada!"
    alert(msg)
  }else{
      //console.log(data)
    //capturando la data y pasandola a chart js
graphUnitsProduced(data)
  }



  
})


function graphUnitsProduced(arr){
      const tags=arr.map(function(linea){
  return linea.linea,
})



  
console.log(tags)
}



