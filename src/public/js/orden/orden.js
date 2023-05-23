const socketOrden = io();
const tablaPlanner = document.getElementById("tablaPlanner");
const buttonPlannerModal = document.getElementById("buttonPlannerModal");
const butCloseModal = document.getElementById("butCloseModal");
const btnLoadPlan = document.getElementsByClassName("btn btn-outline-success");
const nombre_linea = document.getElementById("nombre_linea");
const cc = document.getElementById("cc");
const nombreArticulo = document.getElementById("nombre-articulo");
const codArt = document.getElementById("cod-art");
const peso = document.getElementById("peso");
const cantidad = document.getElementById("cantidad");
const ciclo = document.getElementById("ciclo");
const porHora = document.getElementById("porHora");
const porTurno = document.getElementById("porTurno");
const undmedida = document.getElementById("undmedida");
const spanOrder = document.getElementById("spanOrder");


const codeMp1 = document.getElementById("codeMp1");
const codeMp2 = document.getElementById("codeMp2");
const codeMp3 = document.getElementById("codeMp3");
const codeMp4 = document.getElementById("codeMp4");

const descMp1 = document.getElementById("descMp1");
const descMp2 = document.getElementById("descMp2");
const descMp3 = document.getElementById("descMp3");
const descMp4 = document.getElementById("descMp4");

const cantidadMp1 = document.getElementById("cantidadMp1");
const cantidadMp2 = document.getElementById("cantidadMp2");
const cantidadMp3 = document.getElementById("cantidadMp3");
const cantidadMp4 = document.getElementById("cantidadMp4");

const undSpan1 = document.getElementById("undSpan1");
const undSpan2 = document.getElementById("undSpan2");
const undSpan3 = document.getElementById("undSpan3");
const undSpan4 = document.getElementById("undSpan4");

const mpLoad = document.getElementsByName("mpLoad");

const butsearchMp1 = document.getElementById("butsearchMp1");
const butsearchMp2 = document.getElementById("butsearchMp2");
const butsearchMp3 = document.getElementById("butsearchMp3");
const butsearchMp4 = document.getElementById("butsearchMp4");

const seachMp = document.getElementById("seachMp");
const tablaMp = document.getElementById("tablaMp");
const tbodyMp = document.getElementById("tbodyMp");
const searchSum = document.getElementById("searchSum");
const tbodySum = document.getElementById("tbodySum");
const tablaSum = document.getElementById("tablaSum");
const sumLoad = document.getElementsByName("sumLoad");
const divErrorLoadMpSum = document.getElementById("divErrorLoadMpSum");
const butSearchCode = document.getElementById("butSearchCode");
const inputSearchCode = document.getElementById("inputSearchCode");
const tfootSum = document.getElementById("tfootSum");
const tfootMp = document.getElementById("tfootMp");
const floatingTextarea2=document.getElementById("floatingTextarea2")
const formSaveOrden=document.getElementById("form-production")
const divMensajeError=document.getElementById("divMensajeError")

socketOrden.emit("client:numOrder")
socketOrden.on("server:numOrder",(data)=>{
console.log(data[0].num_orden)
spanOrder.innerHTML=data[0].num_orden+1
})



butSearchCode.disabled = true;
tbodyMp.innerHTML = "";
//tablaMp.style.display = "none";
tablaSum.style.display = "none";
socketOrden.emit("client:dataPlanId");
socketOrden.on("server:resultPlanner", (data) => {
  data.forEach((element) => {
    let tdPlanner = document.createElement("tr");
    tdPlanner.innerHTML += `
      <td class=col-1>${element.id_plan}</td>
      <td class=col-1>${element.dateStart}</td>
      <td class=col-1>${element.code_prod}</td>
      <td class=col-6>${element.desc_prod_plan}</td>
      <td class=col-2>${element.cant_plan}</td>
      <td class=col-1>${element.units_cant_plan}</td>
    <td class=col-1><button  id=${element.id_plan} class="btn btn-outline-success">load</button></td>          
  `;

    tablaPlanner.appendChild(tdPlanner);
  });
});

buttonPlannerModal.addEventListener("click", () => {
  console.log(btnLoadPlan.length);
  for (let i = 0; i < btnLoadPlan.length; i++) {
    btnLoadPlan[i].addEventListener("click", () => {
      socketOrden.emit("client:dataPlanLoad", btnLoadPlan[i].id);
    });
  }
});
let id_plan=""
socketOrden.on("server:resultPlannerData", (data) => {
  console.log(data);
  nombre_linea.value = data.linea_name;
  cc.value = data.linea_cc;
  nombreArticulo.value = data.desc_prod_plan;
  codArt.value = data.code_prod;
  cantidad.value = data.cant_plan;
  porHora.value = data.aph;
  porTurno.value = data.aph * 12;
  undmedida.innerText = `${data.unidadMedida}`;
  ciclo.value = data.aph / 60;
    id_plan=data.id_plan
});

//socketOrden.emit("server:OrdenProd")
socketOrden.emit("client:mpLoad");
socketOrden.emit("client:sumLoad");
//boton search de materia prima
seachMp.addEventListener("click", () => {
  butSearchCode.disabled = false;

  tablaMp.style.display = "contents";
  seachMp.disabled = true;
  searchSum.disabled = false;
  tbodyMp.style.display = "contents";
  tbodySum.style.display = "none";
  tablaSum.style.display = "none";
  // tfootMp.style.display="none"
});

socketOrden.on("server:mpLoad", (data) => {
  console.log(data);

  data.forEach((element) => {
    const childMp = document.createElement("tr");
    childMp.innerHTML += `
  <td class=col>${element.codigo}</td>
  <td class=col>${element.nombre}</td>
  <td class=col>${element.proveedor}</td>
  <td class=col>${element.familia}</td>
  <td class=col>${element.categoria}</td>
  
<td class=col-1><button name="mpLoad" id=${element.codigo} class="btn btn-outline-success">load</button></td>          
`;
    tbodyMp.appendChild(childMp);
  });
  for (let i = 0; i < mpLoad.length; i++) {
    mpLoad[i].addEventListener("click", () => {
      console.log(mpLoad[i], 140);

      socketOrden.emit("client:dataMp", mpLoad[i].id);
    });
  }

  socketOrden.on("server:mpLoadatForm", (data) => {
    console.log(data);

    if (codeMp1.value == "") {
      codeMp1.value = data.codigo;
      descMp1.value = data.nombre;

      undSpan1.innerText = "KLS";
    } else if (codeMp2.value == "") {
      codeMp2.value = data.codigo;
      descMp2.value = data.nombre;

      undSpan2.innerText = "KLS";
    } else if (codeMp3.value == "") {
      codeMp3.value = data.codigo;
      descMp3.value = data.nombre;

      undSpan3.innerText = "KLS";
    } else if (codeMp4.value == "") {
      codeMp4.value = data.codigo;
      descMp4.value = data.nombre;

      undSpan4.innerText = "KLS";
    }
  });
});

socketOrden.on("server:sumLoad", (data) => {
  console.log(data);

  data.forEach((element) => {
    const childSum = document.createElement("tr");
    childSum.innerHTML += `
    <td class=col>${element.codigo}</td>
  <td class=col>${element.proveedor}</td>
  <td class=col>${element.descripcion}</td>
  <td class=col>${element.undMedida}</td>   
<td class=col-1><button name="sumLoad" id=${element.codigo} class="btn btn-outline-success">load</button></td>          
`;
    tbodySum.appendChild(childSum);
  });

  for (let i = 0; i < sumLoad.length; i++) {
    sumLoad[i].addEventListener("click", () => {
      console.log(sumLoad[i], 220);

      socketOrden.emit("client:dataOrder", sumLoad[i].id);
    });
  }

  socketOrden.on("server:dataResult", (data) => {
    if (codeMp1.value == "") {
      codeMp1.value = data.codigo;
      descMp1.value = data.descripcion;

      undSpan1.innerText = data.undMedida;
    } else if (codeMp2.value == "") {
      codeMp2.value = data.codigo;
      descMp2.value = data.descripcion;

      undSpan2.innerText = data.undMedida;
    } else if (codeMp3.value == "") {
      codeMp3.value = data.codigo;
      descMp3.value = data.descripcion;

      undSpan3.innerText = data.undMedida;
    } else if (codeMp4.value == "") {
      codeMp4.value = data.codigo;
      descMp4.value = data.descripcion;

      undSpan4.innerText = data.undMedida;
    }
  });
});

let click = false;
searchSum.addEventListener("click", () => {
  // butSearchCode.disabled="true"

  searchSum.disabled = true;
  seachMp.disabled = false;
  tbodyMp.style.display = "none";
  tablaMp.style.display = "none";
  tbodySum.style.display = "contents";
  tablaSum.style.display = "contents";

  return (click = true);
});

butSearchCode.addEventListener("click", () => {
  tbodyMp.style.display = "none";
  console.log("click");
  let msgAlert = document.createElement("div");
  if (inputSearchCode.value == "") {
    msgAlert.innerHTML = `<div class="alert alert-danger" role="alert">
   Ingrese un código para buscar
  </div>`;
    divErrorLoadMpSum.appendChild(msgAlert);
  } else {
    socketOrden.emit("client:inputCodeSearchMp", inputSearchCode.value);
  }

  setTimeout(() => {
    divErrorLoadMpSum.removeChild(msgAlert);
  }, 5000);
});

socketOrden.on("server:selectSumMp", (data) => {
  tbodyMp.style.display = "none";
  console.log("click");
  let msgAlert = document.createElement("div");

  msgAlert.innerHTML = `<div class="alert alert-danger" role="alert">
  ${data}
 </div>`;
  divErrorLoadMpSum.appendChild(msgAlert);
  setTimeout(() => {
    divErrorLoadMpSum.removeChild(msgAlert);
  }, 5000);
});

socketOrden.on("server:selectMp", (data) => {
  console.log(data);
  tbodyMp.innerHTML = "";
  const seacrhMp = document.createElement("tr");
  seacrhMp.innerHTML = `
<td class=col>${data.codigo}</td>
<td class=col>${data.nombre}</td>
<td class=col>${data.proveedor}</td>
<td class=col>${data.familia}</td>
<td class=col>${data.categoria}</td>

<td class=col-1><button  id=${data.codigo} class="btn btn-outline-success">load</button></td>          
`;
  tfootMp.appendChild(seacrhMp);
});

socketOrden.on("server:selectSum", (data) => {
  console.log(data);
  tbodySum.innerHTML = "";
  const seacrhMp = document.createElement("tr");
  seacrhMp.innerHTML = `
<td class=col>${data.codigo}</td>
<td class=col>${data.proveedor}</td>
<td class=col>${data.descripcion}</td>
<td class=col>${data.undMedida}</td>


<td class=col-1><button  id=${data.codigo} class="btn btn-outline-success">load</button></td>          
`;
  tfootSum.appendChild(seacrhMp);

  setTimeout(() => {
    tfootSum.removeChild(seacrhMp);
  }, 8000);
});

let fecha=new Date()
let onlyFecha=`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
let onlyHours=`${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`

formSaveOrden.addEventListener("submit",(e)=>{
e.preventDefault()

if (spanOrder.textContent !="" && 
codArt.value!="" && 
peso.value!="" && 
floatingTextarea2.value!="" && 
cantidadMp1.value !="" &&
cantidadMp2.value !="" &&
cantidadMp3.value !="" &&
cantidadMp4.value !=""
) {



  let data={  
   
    nombre_linea: nombre_linea.value,
    centro_costo:cc.value,
    nombre_articulo:nombreArticulo.value,
    cod_articulo:codArt.value,
    peso_Art:peso.value,
  cantidad:cantidad.value,
  ciclo:ciclo.value,
  porHora:porHora.value,
  porTurno:porTurno.value,
  undmedida:undmedida.textContent,
  spanOrder:spanOrder.textContent,
          
codeMp1:codeMp1.value,
codeMp2:codeMp2.value,
codeMp3:codeMp3.value,
codeMp4:codeMp4.value,

descMp1:descMp1.value,
descMp2:descMp2.value,
descMp3:descMp3.value,
descMp4:descMp4.value,

cantidadMp1:cantidadMp1.value,
cantidadMp2:cantidadMp2.value,
cantidadMp3:cantidadMp3.value,
cantidadMp4:cantidadMp4.value,

undSpan1:undSpan1.textContent,
undSpan2:undSpan2.textContent,
undSpan3:undSpan3.textContent,
undSpan4:undSpan4.textContent,

floatingTextarea2:floatingTextarea2.value,
id_plandbs:id_plan,
fechaCreacion: onlyFecha,
horaCreacion:onlyHours,
missing: cantidad.value

  }
  socketOrden.emit("client:dataOrdenProd",data)
      



  console.log(data)

  mensajeProduct("Orden generada exitosamente")
} else  {

  mensajeProduct("Porfavor llene todos los campos")
} 
  location.reload()
})

function mensajeProduct(text) {
  let msg = document.createElement("div");

  if (text == "Orden generada exitosamente") {
    msg.innerHTML = `<div class="alert alert-success mt-3 text-center" role="alert">
  ${text}
 </div>`;
 divMensajeError.appendChild(msg);
  } else {
    msg.innerHTML = `<div class="alert alert-danger mt-3 text-center" role="alert">
  ${text}`;
  divMensajeError.appendChild(msg);
  }
  setTimeout(() => {
    divMensajeError.removeChild(msg);
  }, 5000);
}