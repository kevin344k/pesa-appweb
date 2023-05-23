const socketInfor = io("/informeOP");

const modalPeople = document.getElementById("modal-people-search");
const butModalPeople = document.getElementsByName("butModalPeople");
const inputCedula = document.getElementsByName("cedula");
const tbodyPeople = document.getElementById("tbodyPeople");
const inputCedula1 = document.getElementById("cedula1");
const inputNombre1 = document.getElementById("nombre1");
const inputRol1 = document.getElementById("rol1");
const spanFecha = document.getElementById("spanFecha");
const spanHora = document.getElementById("spanHora");
const spanTurno = document.getElementById("spanTurno");
const spanPlanId=document.getElementById("spanPlanId")
//
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
const spandia = document.getElementById("spandia");
//para la pestaña de materia Prima
const eyebrownMateriaPrima = document.getElementById("materiaPrima");
const eyebrownTimeLost = document.getElementById("timeLost");
const butTiempoImproductivo = document.getElementById("butTiempoImproductivo");
const butMp = document.getElementById("butMp");
const tablaListP = document.getElementById("tablaListP");

const tabListP = document.getElementById("tabListP");

const formInforProd = document.getElementById("form-infor-prod");

const btnSiReport = document.getElementById("btnSiReport");
// if (butMp.classList.add("active")) {
//   eyebrownTimeLost.style.display="none"
// } else{
//   butTiempoImproductivo.classList.add("active")
//   butTiempoImproductivo.style.display="flex"
//   butMp.style.display="none"
// }

//////

//numero de inforOoper////

let today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

console.log(day, month, year);
console.log(today.toJSON());

spanFecha.innerHTML = `${year}-${month}-${day}`;

function time() {
  let daysLetters = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viern es",
    "Sabado",
    "Domingo",
  ];
  let date = new Date();
  let hora = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hora <= 9) {
    hora = " 0" + hora;
  }
  if (min <= 9) {
    min = "0" + min;
  }
  if (sec <= 9) {
    sec = "0" + sec;
  }
  spanHora.innerHTML = `${hora}:${min}:${sec}`;
  spandia.innerHTML = ` - ${daysLetters[date.getDay() - 1]}`;

  if (hora >= 19 && min >= 15) {
    spanTurno.innerHTML = "2";
  } else {
    spanTurno.innerHTML = "1";
  }
}

setInterval(() => {
  time();
}, 1000);

socketInfor.emit("client:numInfor");
socketInfor.on("server:numInfor", (data) => {
  //console.log(data.num_infor);
  if(data!=null){
      spanReportNumber.innerHTML = data.num_infor + 1;
  } else{
     spanReportNumber.innerHTML = 0;
  }

});

const butCedula1 = document.getElementById("butCedula1");

const divMsgerrorPeople = document.getElementById("msgerrorPeople");

function errorMsg(data) {
  let createDiv = document.createElement("div");

  createDiv.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
  ${data}
 </div>`;
  divMsgerrorPeople.appendChild(createDiv);

  setTimeout(() => {
    divMsgerrorPeople.removeChild(createDiv);
  }, 5000);
}

butCedula1.addEventListener("click", () => {
  if (inputCedula1.value == "") {
    errorMsg("Ingrese un nuero de cedula");
    (inputNombre1.value = ""),
      (inputCedula1.value = ""),
      (inputRol1.value = "");
  } else {
    socketInfor.emit("client:SearchByCedula", inputCedula1.value);
  }
});

socketInfor.on("server:searchByCedulaResult", (data) => {
  console.log(data);

  if (data == null) {
    errorMsg("Ingrese un nuero de cedula válido");
    (inputNombre1.value = ""),
      (inputCedula1.value = ""),
      (inputRol1.value = "");
  } else {
    (inputNombre1.value = data.nombres),
      (inputCedula1.value = data.cedula),
      (inputRol1.value = data.rol);
  }
});

//codigo para el segundo campo de production people
const butCedula2 = document.getElementById("butCedula2");
const inputCedula2 = document.getElementById("inputCedula2");
const inputNombre2 = document.getElementById("nombre2");
const inputRol2 = document.getElementById("rol2");

butCedula2.addEventListener("click", () => {
  if (inputCedula2.value == "") {
    errorMsg("Ingrese un nuero de cedula");
  } else {
    socketInfor.emit("client:SearchByCedula2", inputCedula2.value);
  }
});

socketInfor.on("server:searchByCedulaResult2", (data) => {
  console.log(data);

  if (data == null) {
    errorMsg("Ingrese un nuero de cedula válido");
    (inputNombre2.value = ""),
      (inputCedula2.value = ""),
      (inputRol2.value = "");
  } else {
    (inputNombre2.value = data.nombres),
      (inputCedula2.value = data.cedula),
      (inputRol2.value = data.rol);
  }
});

//tercer campo de people
const butCedula3 = document.getElementById("butCedula3");
const inputCedula3 = document.getElementById("inputCedula3");
const inputNombre3 = document.getElementById("nombre3");
const inputRol3 = document.getElementById("rol3");

butCedula3.addEventListener("click", () => {
  if (inputCedula3.value == "") {
    errorMsg("Ingrese un nuero de cedula");
  } else {
    socketInfor.emit("client:SearchByCedula3", inputCedula3.value);
  }
});

socketInfor.on("server:searchByCedulaResult3", (data) => {
  console.log(data);

  if (data == null) {
    errorMsg("Ingrese un nuero de cedula válido");
    (inputNombre3.value = ""),
      (inputCedula3.value = ""),
      (inputRol3.value = "");
  } else {
    (inputNombre3.value = data.nombres),
      (inputCedula3.value = data.cedula),
      (inputRol3.value = data.rol);
  }
});

//tercer campo de people
const butCedula4 = document.getElementById("butCedula4");
const inputCedula4 = document.getElementById("inputCedula4");
const inputNombre4 = document.getElementById("nombre4");
const inputRol4 = document.getElementById("rol4");
const inputCodePar1 = document.getElementById("inputCodePar1");
const inputDescPar1 = document.getElementById("inputDescPar1");
const inputCodePar2 = document.getElementById("inputCodePar2");
const inputDescPar2 = document.getElementById("inputDescPar2");
const inputCodePar3 = document.getElementById("inputCodePar3");
const inputDescPar3 = document.getElementById("inputDescPar3");
const inputCodePar4 = document.getElementById("inputCodePar4");
const inputDescPar4 = document.getElementById("inputDescPar4");
const butDelCodPar1 = document.getElementById("butDelCodPar1");
const butDelCodPar2 = document.getElementById("butDelCodPar2");
const butDelCodPar3 = document.getElementById("butDelCodPar3");
const butDelCodPar4 = document.getElementById("butDelCodPar4");
const spanOrderNumber = document.getElementById("spanOrderNumber");
const butTimer = document.getElementById("butTimer");
const timer = document.getElementsByName("time");
const inputUnitsGood = document.getElementById("inputUnitsGood");
const inputScrap = document.getElementById("inputScrap");
const textAreaObs = document.getElementById("textAreaObservations");
const timestart1 = document.getElementById("timestart1");
const timeEnd1 = document.getElementById("timeEnd1");
const timestart2 = document.getElementById("timestart2");
const timeEnd2 = document.getElementById("timeEnd2");
const timestart3 = document.getElementById("timestart3");
const timeEnd3 = document.getElementById("timeEnd3");
const timestart4 = document.getElementById("timestart4");
const timeEnd4 = document.getElementById("timeEnd4");
const modalSucessReport = document.getElementById("modalSucessReport");
const butCloseIOpReport = document.getElementById("butCloseIOpReport");

const spanReportNumber = document.getElementById("spanReportNumber");

const modalErrorReport = document.getElementById("modalErrorReport");

const errCloseReport = document.getElementById("errCloseReport");

spanOrderNumber.style.letterSpacing = "5px";
spanReportNumber.style.letterSpacing = "5px";

butCedula4.addEventListener("click", () => {
  if (inputCedula4.value == "") {
    errorMsg("Ingrese un nuero de cedula");
  } else {
    socketInfor.emit("client:SearchByCedula4", inputCedula4.value);
  }
});

socketInfor.on("server:searchByCedulaResult4", (data) => {
  console.log(data);

  if (data == null) {
    errorMsg("Ingrese un nuero de cedula válido");
    (inputNombre4.value = ""),
      (inputCedula4.value = ""),
      (inputRol4.value = "");
  } else {
    (inputNombre4.value = data.nombres),
      (inputCedula4.value = data.cedula),
      (inputRol4.value = data.rol);
  }
});
//order list

const butOrderList = document.getElementById("butOrderList");
const tbodyOrderList = document.getElementById("tbodyOrderList");
const orderList = document.getElementsByName("orderList");
const tfootOrderList = document.getElementById("tfootOrderList");
butOrderList.addEventListener("click", () => {
  socketInfor.emit("client:SelectOrderList");
});

socketInfor.on("server:selectOrderList", (data) => {
  tbodyOrderList.innerHTML = "";
  data.forEach((element) => {
    const childLoadOrder = document.createElement("tr");
    console.log(element.id_plan)
    childLoadOrder.innerHTML += `
        <td class=col>${element.num_orden}</td>
        <td class=col>${element.linea}</td>
        <td class=col>${element.codigo_articulo}</td>
        <td class=col>${element.articulo}</td>
        <td class=col>${element.total_a_fabricar}</td> 
        <td class=col>${element.missing}</td>    
      <td class=col-1><button name="orderList" id=${element.num_orden} class="btn btn-outline-success">load</button></td>
        `;
    tbodyOrderList.appendChild(childLoadOrder);
  });

  for (let i = 0; i < orderList.length; i++) {
    orderList[i].addEventListener("click", () => {
      console.log(orderList[i].id);
      socketInfor.emit("client:idOrderList", orderList[i].id);
    });
  }
});

socketInfor.on("server:resultSelectOrder", (data) => {
  
  nombre_linea.value = data.linea;
  cc.value = data.centro_costo;
  nombreArticulo.value = data.articulo;
  codArt.value = data.codigo_articulo;
  peso.value = data.peso;
  cantidad.value = data.total_a_fabricar;
  porHora.value = data.por_hora;
  porTurno.value = data.por_hora * 12;
  undmedida.innerText = `${data.und_medida}`;
  ciclo.value = data.por_hora / 60;
  spanOrderNumber.innerText = data.num_orden;
  spanPlanId.innerText=data.id_plan;
  codeMp1.value = data.codeMpSn1;
  codeMp2.value = data.codeMpSn2;
  codeMp3.value = data.codeMpSn3;
  codeMp4.value = data.codeMpSn4;

  descMp1.value = data.descMpSn1;
  descMp2.value = data.descMpSn2;
  descMp3.value = data.descMpSn3;
  descMp4.value = data.descMpSn4;
  
  cantidadMp1.value = data.cantidadMpSn1;
  cantidadMp2.value = data.cantidadMpSn2;
  cantidadMp3.value = data.cantidadMpSn3;
  cantidadMp4.value = data.cantidadMpSn4;

  undSpan1.value = data.undMpSn1;
  undSpan2.value = data.undMpSn2;
  undSpan3.value = data.undMpSn3;
  undSpan4.value = data.undMpSn4;
  
  console.log(data.id_plan, 'plannerr');
});

///codigo de las pestañas del operador report
butMp.classList.add("active");
eyebrownTimeLost.style.display = "none";
eyebrownMateriaPrima.style.display = "block";

butMp.addEventListener("click", () => {
  eyebrownMateriaPrima.style.display = "block";
  eyebrownTimeLost.style.display = "none";
  butMp.classList.add("active");
  butTiempoImproductivo.classList.remove("active");
});
butTiempoImproductivo.addEventListener("click", () => {
  butTiempoImproductivo.classList.add("active");
  butMp.classList.remove("active");
  eyebrownMateriaPrima.style.display = "none";
  eyebrownTimeLost.style.display = "block";
});

//modal hijo paralizaciones mecanicas
const butSeeList = document.getElementById("butSeeList");
const parLoad = document.getElementsByName("parLoad");
butSeeList.addEventListener("click", () => {
  socketInfor.emit("client:selectCodPar");
});

socketInfor.on("server:selectCodPar", (data) => {
  tabListP.innerHTML = "";

  data.forEach((element) => {
    const newCodP = document.createElement("tr");
    newCodP.innerHTML = `
    <td class=col>${element.cod_paro}</td>
<td class=col>${element.tipo_paro}</td>
<td class=col>${element.desc_paro}</td>

<td class=col-1><button name="parLoad" id=${element.cod_paro} class="btn btn-outline-success">load</button></td> 
    `;
    tabListP.appendChild(newCodP);
  });

  for (let i = 0; i < parLoad.length; i++) {
    parLoad[i].addEventListener("click", () => {
      console.log(parLoad[i]);
      socketInfor.emit("client:codePar", parLoad[i].id);
    });
  }
  // 1/2
});

const butSearchCodeP = document.getElementById("butSearchCodeP");
const inputSearchP = document.getElementById("inputSearchP");

butSearchCodeP.addEventListener("click", () => {
  if (inputSearchP.value == "") {
    inputSearchP.focus();

    tabListP.innerHTML = `<div class="alert alert-danger" role="alert">
    Ingrese un codigo para buscar en la base de datos
  </div>`;
  } else {
    socketInfor.emit("client:searchCodeP", inputSearchP.value);
    console.log(inputSearchP.value);
  }
});

socketInfor.on("server:searchCodeP", (element) => {
  tabListP.innerHTML = "";
  if (element == null) {
    tabListP.innerHTML = `
  <tr> <td colspan="4" >
    <div class="alert alert-danger" role="alert"> El código ingresado no existe :( </div>
  </td></tr>`;
  } else {
    const newCodP = document.createElement("tr");
    newCodP.innerHTML = `
<td class="col text-center">${element.cod_paro}</td>
<td class="col text-center">${element.tipo_paro}</td>
<td class="col text-center">${element.desc_paro}</td>

<td class="col text-center"-1><button name="parLoad" id=${element.cod_paro} class="btn btn-outline-success">load</button></td> 
    `;
    tabListP.appendChild(newCodP);
  }

  parLoad[0].addEventListener("click", () => {
    console.log(parLoad[0].id);
    socketInfor.emit("client:codePar", parLoad[0].id);
  });
});

socketInfor.on("server:codePar", (data) => {
  console.log(data);

  if (inputCodePar1.value == "" && inputDescPar1.value == "") {
    inputCodePar1.value = data.cod_paro;
    inputDescPar1.value = data.desc_paro;
  } else if (inputCodePar2.value == "" && inputDescPar2.value == "") {
    inputCodePar2.value = data.cod_paro;
    inputDescPar2.value = data.desc_paro;
  } else if (inputCodePar3.value == "" && inputDescPar3.value == "") {
    inputCodePar3.value = data.cod_paro;
    inputDescPar3.value = data.desc_paro;
  } else if (inputCodePar4.value == "" && inputDescPar4.value == "") {
    inputCodePar4.value = data.cod_paro;
    inputDescPar4.value = data.desc_paro;
  } else {
  }
});

butDelCodPar1.addEventListener("click", () => {
  inputCodePar1.value = "";
  inputDescPar1.value = "";
  timestart1.value = "";
  timeEnd1.value = "";
});
butDelCodPar2.addEventListener("click", () => {
  inputCodePar2.value = "";
  inputDescPar2.value = "";
  timestart2.value = "";
  timeEnd2.value = "";
});
butDelCodPar3.addEventListener("click", () => {
  inputCodePar3.value = "";
  inputDescPar3.value = "";
  timestart3.value = "";
  timeEnd3.value = "";
});
butDelCodPar4.addEventListener("click", () => {
  inputCodePar4.value = "";
  inputDescPar4.value = "";
  timestart4.value = "";
  timeEnd4.value = "";
});


  formInforProd.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      spanOrderNumber.textContent != "" &&
      spanReportNumber.value != "" &&
      inputUnitsGood.value != "" &&
      inputScrap.value != "" &&
      cedula1.value != ""
    ) {
      //console.log(formInforProd);

      let dataInforOp = {
        OrderNumber: spanOrderNumber.textContent,
        plan_id:spanPlanId.textContent,
        fechaRegInfor: spanFecha.textContent,
        horaRegInfor: spanHora.textContent,
        turnoRegInfor: spanTurno.textContent,

        cedula1: cedula1.value,
        nombre1: nombre1.value,
        rol1: rol1.value,

        cedula2: inputCedula2.value,
        nombre2: nombre2.value,
        rol2: rol2.value,

        cedula3: inputCedula3.value,
        nombre3: nombre3.value,
        rol3: rol3.value,

        cedula4: inputCedula4.value,
        nombre4: nombre4.value,
        rol4: rol4.value,

        codePar1: inputCodePar1.value,
        descPar1: inputDescPar1.value,
        timeStar1: timestart1.value,
        timeEnd1: timeEnd1.value,

        codePar2: inputCodePar2.value,
        descPar2: inputDescPar2.value,
        timeStar2: timestart2.value,
        timeEnd2: timeEnd2.value,

        codePar3: inputCodePar3.value,
        descPar3: inputDescPar3.value,
        timeStar3: timestart3.value,
        timeEnd3: timeEnd3.value,

        codePar4: inputCodePar4.value,
        descPar4: inputDescPar4.value,
        timeStar4: timestart4.value,
        timeEnd4: timeEnd4.value,

        unitsGood: inputUnitsGood.value,
        Scrap: inputScrap.value,

        textAreaObservations: textAreaObservations.value,
      };

      //console.log(dataInforOp);
      socketInfor.emit("client:dataInforOper", dataInforOp);
      //boton para confirmar si se guardó un registro en la base de datos
      $('#modalSucessReport').modal('show')
      //console.log("click");
    } else {
      let divErrC = document.createElement("div");

      divErrC.innerHTML = `<div  class="alert alert-danger mt-3 fs-5" role="alert">
      Favor asegúrese de llenar todos los campos
    </div>`;

      errCloseReport.appendChild(divErrC);
      setTimeout(() => {
        errCloseReport.removeChild(divErrC);
      }, 8000);
    }

  });

const butRun=document.querySelector("#butRun")
const butStop=document.querySelector("#butStop")
const butSwitch=document.querySelector("#butSwitch")
const butNotOP=document.querySelector("#butNotOP")
const text="text-white"
const parpadeo="lineParpadeo"
let realObj;
let status;
let emit;
let ccObj=cc.value;


butRun.addEventListener("click",clickRun)
butStop.addEventListener("click",clickStop)
butSwitch.addEventListener("click",clickSwitch)
butNotOP.addEventListener("click",clickNotOP)

function clickRun(){
status="run"
ccObj=cc.value


if(ccObj!=""){

  console.log("run")
  butRun.classList.toggle("bg-success")
   butRun.classList.toggle("text-white")
  butRun.classList.toggle("lineParpadeo")
  
removeClass("butStop","bg-danger",text,parpadeo)
  removeClass("butSwitch","bg-warning",text,parpadeo)
  removeClass("butNotOP","bg-gray",text,parpadeo)
  let date2=new Date()
     realAEnviar(status,ccObj,status,date2)
} else{
 return  alert("Se necesita el Centro de costo para poder enviar el estado!")
}
  



}

function clickStop(){
  status="stop"
ccObj=cc.value
 

if(ccObj!=""){
 console.log("clickStop")
  butStop.classList.toggle("bg-danger")
   butStop.classList.toggle("text-white")
  butStop.classList.toggle("lineParpadeo")
removeClass("butRun","bg-success",text,parpadeo)
  removeClass("butSwitch","bg-warning",text,parpadeo)
  removeClass("butNotOP","bg-gray",text,parpadeo)
  let date2=new Date()
     realAEnviar(status,ccObj,status,date2)
} else{
 return  alert("Se necesita el Centro de costo para poder enviar el estado!")
}
 

  
}
function clickSwitch(){
    status="switch"
ccObj=cc.value

  if(ccObj!=""){
  console.log("clickSwitch")
  butSwitch.classList.toggle("bg-warning")
   butSwitch.classList.toggle("text-white")
  butSwitch.classList.toggle("lineParpadeo")

  removeClass("butRun","bg-success",text,parpadeo)
  removeClass("butStop","bg-danger",text,parpadeo)
  removeClass("butNotOP","bg-gray",text,parpadeo)
    let date2=new Date()
     realAEnviar(status,ccObj,status,date2)
  } else{
 return  alert("Se necesita el Centro de costo para poder enviar el estado!")
}
}
function clickNotOP(){
      status="notOP"
ccObj=cc.value

    if(ccObj!=""){
  console.log("clickNotOP")
  butNotOP.classList.toggle("bg-gray")
   butNotOP.classList.toggle("text-white")
  butNotOP.classList.toggle("lineParpadeo")

  removeClass("butRun","bg-success",text,parpadeo)
  removeClass("butSwitch","bg-warning",text,parpadeo)
  removeClass("butStop","bg-danger",text,parpadeo)
      let date2=new Date()
       realAEnviar(status,ccObj,status,date2)
  } else{
 return  alert("Se necesita el Centro de costo para poder enviar el estado!")
}
  
}
function removeClass(but,bg,class1,class2){
  if(but=="butStop"){
      butStop.classList.remove(bg,class1,class2)
  } else if(but=="butSwitch"){
     butSwitch.classList.remove(bg,class1,class2)
  } else if(but=="butNotOP"){
      butNotOP.classList.remove(bg,class1,class2)
  } else if(but=="butRun"){
      butRun.classList.remove(bg,class1,class2)
  }
}




function realAEnviar(emit,ccObj,status,date2){
  console.log(date2)
 realObj={linea:ccObj,
              status:status,
              status_upDate:date2.toISOString().replace("T"," ").replace("Z","")}

  console.log(realObj)
socketInfor.emit(`${emit}`,realObj)
}