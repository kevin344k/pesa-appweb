const socket = io();



const idPlan = document.querySelector("#id_plan");
const buscarProd = document.querySelector("#buscarProducto");
const codeProd = document.querySelector("#code_product");
var divProd = document.querySelector("#divProd");
var divCol = document.createElement("div");
const inputCodeProd = document.querySelector("#inputCodeProd");
const desc_Product = document.querySelector("#desc_Product");
const butDetallePlan=document.querySelector('#butDetallePlan')

document.addEventListener('DOMContentLoaded',()=>{
socket.emit("client:plannerId")  
  console.log('dom load')
})





socket.on("server:plannerId",(data)=>{
console.log(data,'23')
idPlan.value=data.id_plan+1
})

buscarProd.addEventListener("submit", (e) => {
  e.preventDefault();

  if (codeProd.value != "" && codeProd.value.length == 6) {
    socket.emit("planner:codigoProd", {
      codigo: codeProd.value,
    });
    divCol.innerHTML = "";
  } else if (codeProd.value == "") {
    socket.emit("planner:codigoProdAll", {
      codigo: codeProd.value,
    });
    divCol.innerHTML = "";
  } else {
    divProd.innerHTML =
      '<div class="alert alert-danger mt-3" role="alert">ingrese un codigo valido </div>';
  }

  socket.on("server:planner", (result) => {
    divCol.innerHTML = "";
    divProd.innerHTML = "";
    result.forEach((data) => {
      console.log(data);
      divCol.innerHTML += ` 
      <div class="row mt-2">
           
    <div class=col-2>${data.code_prod} </div>
    <div class=col-4>${data.desc_prod} </div>
    <div class=col-1>${data.aph} </div>
    <div class=col-2>${data.apd} </div>
    <div class=col-2>${data.unidadMedida} </div>
    <div class=col-1><input class="form-check-input" type="radio" name="inlineRadioOptions" id=${data.desc_prod} value=${data.code_prod}> </div> 
    </div>`

      divProd.appendChild(divCol);
    });
  });
});

const loadCod = document.querySelector("#loadCod");
const check = document.getElementsByClassName("form-check-input");
loadCod.addEventListener("click", () => {
  for (let item of check) {
    if (item.checked) {
      let valueCheck = item.value;
      
      console.log(valueCheck);
      socket.emit("client:descProd", valueCheck);
    }
  }
});
socket.on("descP", (descProd,data) => {
  console.log(descProd.desc_prod);
  inputCodeProd.value=data;
  desc_Product.value=descProd.desc_prod;
  select_measurement.value=descProd.unidadMedida

});

const planForm= document.querySelector("#planForm")
planForm.addEventListener('submit',e=>{
  e.preventDefault();
  console.log(
    
   
      inputCodeProd.value ,	
      desc_Product.value,	
     name_line.value,	
     cc_line.value ,	
       qty.value,	
     select_measurement.value,
      dateStart.value ,	
      dateEnd.value		
 
  )
    const hoursPlus=0
  const dateIni=Date.parse(dateStart.value)-hoursPlus

  const dateF=Date.parse(dateEnd.value)-hoursPlus
  
  socket.emit("client:plannerSave",{
   
    cod_prod:inputCodeProd.value ,	
    desc_prod_plan:desc_Product.value,	
    linea_name: name_line.value,	
    linea_cc:cc_line.value ,	
    cant_plan: qty.value,	
    units_cant_plan	: select_measurement.value,
    date_start:(new Date(dateIni).toISOString()).slice(0,-2)	,	
    date_end: (new Date(dateF).toISOString()).slice(0,-2)
})

  
  location.reload()
  
})

socket.on("server:plan_query",(queryPlan)=>{

  if (queryPlan) {
    alert('Planificación realizada')
  }else{
    alert('a ocurrido un error')
  }
})




const detailsBodyPlan=document.querySelector('#detailsBodyPlan')

butDetallePlan.addEventListener('click',()=>{
  console.log('click')
  socket.emit('client:selectPlan')
})
  socket.on('server:selectPlan',(data)=>{
    data.forEach(e=>{
      const tablePlanD=document.createElement('tr')
      console.log(e)
tablePlanD.innerHTML +=`

      <th scope="row">${e.id_plan}</th>
      <td>${e.code_prod}</td>
      <td>${e.desc_prod_plan}</td>
      <td>${e.linea_name}</td>
        <td>${e.cant_plan}</td>
      <td>${e.units_cant_plan}</td>
      <td>${e.fab}</td>


`
    detailsBodyPlan.append(tablePlanD)
    })

  })






