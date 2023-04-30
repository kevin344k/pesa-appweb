

const socketadmin = io();


const productoAdmin = document.getElementById("productoAdmin");
const primerLink = document.getElementById("primerLink");
const segundoLink = document.getElementById("segundoLink");
const tercerLink = document.getElementById("tercerLink");
const cuartoLink = document.getElementById("cuartoLink");
const pestanaSuministro = document.getElementById("pestanaSuministro");
const msgMp = document.getElementById("msgMp");
const divMensajeError = document.getElementById("divMensajeError");
const msgProduct = document.getElementById("msgProduct");
const personalAdmin = document.getElementById("personalAdmin");
const materiaPrima = document.getElementById("materiaPrima");
const formAddMp = document.getElementById("formAddMp");
const input_codeMp = document.getElementById("input-codeMp");
const input_proveedor = document.getElementById("input-proveedor");
const input_nombreMp = document.getElementById("input-nombreMp");
const select_famMp = document.getElementById("select_famMp");
const select_catMp = document.getElementById("select_catMp");
const listMp = document.getElementById("listMp");
const listSum=document.getElementById("listSum")
const optionUND=document.getElementById("optionUND")

primerLink.classList.add("active");
personalAdmin.style.display = "none";
materiaPrima.style.display = "none";
pestanaSuministro.style.display = "none";

primerLink.addEventListener("click", () => {
  primerLink.classList.add("active");
  segundoLink.classList.remove("active");
  cuartoLink.classList.remove("active");
  productoAdmin.style.display = "contents";
  personalAdmin.style.display = "none";
  tercerLink.classList.remove("active");
  materiaPrima.style.display = "none";
  pestanaSuministro.style.display = "none";
});

segundoLink.addEventListener("click", () => {
  primerLink.classList.remove("active");
  segundoLink.classList.add("active");
  cuartoLink.classList.remove("active");
  productoAdmin.style.display = "none";
  personalAdmin.style.display = "contents";
  tercerLink.classList.remove("active");
  materiaPrima.style.display = "none";
  pestanaSuministro.style.display = "none";
});

tercerLink.addEventListener("click", () => {
  primerLink.classList.remove("active");
  segundoLink.classList.remove("active");
  tercerLink.classList.add("active");
  cuartoLink.classList.remove("active");
  productoAdmin.style.display = "none";
  personalAdmin.style.display = "none";
  materiaPrima.style.display = "contents";
  pestanaSuministro.style.display = "none";
});
cuartoLink.addEventListener("click", () => {
  primerLink.classList.remove("active");
  segundoLink.classList.remove("active");
  tercerLink.classList.remove("active");
  cuartoLink.classList.add("active");
  productoAdmin.style.display = "none";
  personalAdmin.style.display = "none";
  materiaPrima.style.display = "none";
  pestanaSuministro.style.display = "contents";
});

const inputCode = document.querySelector("#input-code");
const inputDesc = document.querySelector("#input-desc");
const inputUndHora = document.querySelector("#input-und-hora");
const inputUndTurno = document.querySelector("#input-und-turno");
const butAdd = document.querySelector("#abut-add-prod");
const formAdd = document.querySelector("#formAdd");
const listProd = document.querySelector("#listProd");
const deleteProd = document.getElementsByClassName("btn btn-danger");
const deleteMp = document.getElementsByClassName("btn btn-outline-danger");
const butSave = document.querySelector("#but-add-person");
const butEdit = document.querySelector("#but-edit-person");
butEdit.style.display = "none";



socketadmin.emit("client:mpLoadList");

socketadmin.on("server:dbList", (data) => {
  data.forEach((element) => {
    const createListMp = document.createElement("div");
    createListMp.innerHTML += `<div class="row mt-2">
    <div class=col-2>${element.codigo}</div>
  <div class=col-2>${element.proveedor}</div>
  <div class=col-3>${element.nombre}</div>
  <div class=col-2>${element.categoria}</div>
  <div class=col-2>${element.familia}</div>
  <div class=col-1><button  id=${element.codigo} class="btn btn-outline-danger"><i class="bi bi-trash3-fill"></i></button></div> 
  
  </div>
`;
    listMp.appendChild(createListMp);
  });

  console.log(deleteMp.length, "81");

  for (let i = 0; i < deleteMp.length; i++) {
    deleteMp[i].addEventListener("click", () => {
      console.log("click", deleteMp[i].id);
      socketadmin.emit("client:deleteMp", deleteMp[i].id);
    });
  }
});

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    (inputCode.value != "") &
    (inputDesc.value != "") &
    (inputUndHora.value != "") &
    (inputUndTurno.value != "") &
    optionUND!="Seleccionar"
  ) {
    socketadmin.emit("client:admin-ingresar-prod", {
      codigo: inputCode.value,
      description: inputDesc.value,
      undHora: inputUndHora.value,
      undTurno: inputUndTurno.value,
      undMedida: optionUND.value
    });

    socketadmin.on("resAddValProd", (text) => {
      mensajeProduct(text);
    });
  } else {
    mensajeProduct("porfavor rellene todos los campos");
  }
  inputCode.value = "";
  inputDesc.value = "";
  inputUndHora.value = "";
  inputUndTurno.value = "";
});

formAddMp.addEventListener("submit", (e) => {
  e.preventDefault();

  const datamp = {
    codigo: input_codeMp.value,
    proveedor: input_proveedor.value,
    nombreMp: input_nombreMp.value,
    famMp: select_famMp.value,
    famcat: select_catMp.value,
  };

  if (
    (input_codeMp.value != "") &
    (input_proveedor.value != "") &
    (input_nombreMp.value != "") &
    (select_famMp.value != "Seleccione") &
    (select_catMp.value != "Seleccione")
  ) {
    socketadmin.emit("client:mpdata", datamp);

    socketadmin.on("server:resultMp", (data) => {
      validarMp(data);
    });
  } else {
    let texto1 = "Error: Falta información";
    validarMp(texto1);
  }
  input_codeMp.value = "";
  input_proveedor.value = "";
  input_nombreMp.value = "";
  select_famMp.value = "";
  select_catMp.value = "";
});

const msgMprima = document.getElementById("msgMprima");
const newmsg = document.createElement("div");

function validarMp(texto1) {
  if (texto1 == "Registro agregado exitosamente") {
    newmsg.innerHTML = `<div class="alert alert-primary mt-3" role="alert">
    ${texto1}
   </div>`;
    msgMprima.appendChild(newmsg);
  } else {
    newmsg.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
    ${texto1}
   </div>`;
    msgMprima.appendChild(newmsg);

    input_codeMp.value = "";
    input_proveedor.value = "";
    input_nombreMp.value = "";
    select_famMp.value = "";
    select_catMp.value = "";
    
  }

  setTimeout(() => {
    msgMprima.removeChild(newmsg);
  }, 5000);
}

socketadmin.emit("client:loadpage");
socketadmin.on("server:loadpage", (data) => {
  const lista = document.createElement("div");

  data.forEach((element) => {
    lista.innerHTML += `<div class="row mt-2">
           
    <div class=col-2>${element.code_prod} </div>
    <div class=col-3>${element.desc_prod} </div>
    <div class=col-2>${element.aph} </div>
    <div class=col-2>${element.apd} </div>
    <div class=col-2>${element.unidadMedida} </div>
    <div class=col-1><button  id=${element.code_prod} class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button></div> 
    </div>`;

    listProd.appendChild(lista);
  });

  for (let i = 0; i < deleteProd.length; i++) {
    deleteProd[i].addEventListener("click", () => {
      console.log("click", deleteProd[i].id);

      socketadmin.emit("client:deleteProd", deleteProd[i].id);
    });
  }
});

function mensajeProduct(text) {
  let msg = document.createElement("div");

  if (text == "Producto agregado exitosamente, por favor recarge la página") {
    msg.innerHTML = `<div class="alert alert-primary mt-3" role="alert">
  ${text}
 </div>`;
    msgProduct.appendChild(msg);
  } else {
    msg.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
  ${text}`;
    msgProduct.appendChild(msg);
  }
  setTimeout(() => {
    msgProduct.removeChild(msg);
  }, 5000);
}

const formAddPersonal = document.getElementById("formAddPersonal");

const input_cedula = document.getElementById("input-cedula");
const input_nommbre_apellido = document.getElementById(
  "input-nommbre-apellido"
);
const selectrol = document.getElementById("selectrol");
const input_pass = document.getElementById("input-pass");
const show = document.getElementById("show-hide-pass");
const listPer = document.getElementById("listPer");
const deletePerson = document.getElementsByClassName(
  "btn btn-warning text-white"
);
const deleteSum=document.getElementsByClassName("btn btn-outline-warning")
const editPerson = document.getElementsByClassName("btn btn-info text-white");

show.addEventListener("click", () => {
  if (input_pass.type == "password") {
    input_pass.type = "text";
  } else {
    input_pass.type = "password";
  }
});
////codigo de la pestañla personal
const msgerr = document.createElement("div");

formAddPersonal.addEventListener("submit", (e) => {
  e.preventDefault();
  const datos = {
    cedula: input_cedula.value,
    nombres: input_nommbre_apellido.value,
    rol: selectrol.value,
    password: input_pass.value,
  };

  if (
    (input_cedula.value != "") &
    (input_nommbre_apellido.value != "") &
    (input_pass.value != "")
  ) {
    socketadmin.emit("client:validatePerson", datos);

    socketadmin.on("server:resValidation", (result) => {
      mostrarResValidator(result);
      console.log(result);
    });
  } else {
    mostrarResValidator("Ingrese la informmación necesaria");
  }
});

function mostrarResValidator(datos) {
  divMensajeError.appendChild(msgerr);

  if (datos == "Usuario agregado correctamente") {
    msgerr.innerHTML = `<div class="alert alert-primary" role="alert">
   ${datos}
  </div>`;
  } else {
    msgerr.innerHTML = `<div class="alert alert-danger" role="alert">
   ${datos}
  </div>`;
  }

  input_cedula.value = "";
  input_nommbre_apellido.value = "";
  selectrol.value = "";
  input_pass.value = "";

  setTimeout(() => {
    divMensajeError.removeChild(msgerr);
  }, 5000);
}

socketadmin.emit("client:selectUsers");

socketadmin.on("server:selectUsers", (data) => {
  const listado = document.createElement("div");
  data.forEach((element) => {
    listado.innerHTML += `<div class="row mt-2">
           
    <div class=col-2 >${element.cedula} </div>
    <div class=col-4>${element.nombres} </div>
    <div class=col-2 >${element.rol} </div>
    <div class=col-2>${element.password} </div>
    <div class=col-2  d-flex>
    
    <button id=${element.cedula} class="btn btn-warning text-white"><i class="bi bi-trash3-fill"></i></button>
    </div> 
    </div>`;
    //{{!--   <button  id=${element.cedula} class="btn btn-info text-white"><i class="bi bi-pencil"></i></button>--}}
    listPer.appendChild(listado);
  });

  console.log(deletePerson);

  for (let i = 0; i < deletePerson.length; i++) {
    deletePerson[i].addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click", deletePerson[i].id);
      socketadmin.emit("client:deletePersonById", deletePerson[i].id);
    });
  }

  for (let i = 0; i < editPerson.length; i++) {
    editPerson[i].addEventListener("click", (e) => {
      e.preventDefault();
      butSave.style.display = "none";

      console.log(editPerson[i].id);
      socketadmin.emit("client:editPerson", editPerson[i].id);
    });
  }

  //editPerson[i].id

  socketadmin.on("server:dataEdit", (data) => {
    console.log(data);

    input_cedula.value = data.cedula;
    input_nommbre_apellido.value = data.nombres;
    selectrol.value = data.rol;
    input_pass.value = data.password;
  });

  socketadmin.emit("server:dataEditSave");
});

////codigo para la pestaña suministros

const formAddSum = document.getElementById("formAddSum");
const inputCodeSum = document.getElementById("inputCodeSum");
const inputProveedorSum = document.getElementById("inputProveedorSum");
const inputDescSum = document.getElementById("inputDescSum");
const selectUndSum = document.getElementById("selectUndSum");
const msgSum = document.getElementById("msgSum");

let hoy = new Date();
let dia=hoy.getDate();
let mes=hoy.getMonth()+1
let anio=hoy.getFullYear();
let fechaActual=`${anio}-${mes}-${dia}`

formAddSum.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = {
    codigo: inputCodeSum.value,
    proveedor: inputProveedorSum.value,
    descripcion: inputDescSum.value,
    undMedida: selectUndSum.value,
    fecha_creacion: fechaActual

  };

  if (
    (inputCodeSum.value != "") &
    (inputProveedorSum.value != "") &
    (inputDescSum.value != "") &
    (selectUndSum.value != "Seleccione")
  ) {
    console.log("datos listos para enviar");
    socketadmin.emit("client:saveSum", data);
  } else {
   let err="Error:llene todos los campos";
    validarSum(err)
  }

   console.table(
   inputCodeSum.value,inputProveedorSum.value,inputDescSum.value,selectUndSum.value)
});

function validarSum(err) {
  const msgSumCreate = document.createElement("div");
  if (err == "Datos registrados exitosamente") {
    msgSumCreate.innerHTML = `<div class="alert alert-primary mt-3" role="alert">
    ${err}
   </div>`;
  } else if (err == "Error:El suministro ya existe") {
    msgSumCreate.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
    ${err}
   </div>`;
  } else if (err == "Error:LLene todos los campos") {
    msgSumCreate.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
    ${err}
   </div>`;
  } else {
    msgSumCreate.innerHTML = `<div class="alert alert-danger mt-3" role="alert">
    ${err}
   </div>`;
  }
  msgSum.appendChild(msgSumCreate);

  setTimeout(() => {
    msgSum.removeChild(msgSumCreate);
   
  }, 5000);

  inputCodeSum.value = "";
  inputProveedorSum.value = "";
  inputDescSum.value = "";
  selectUndSum.value = "Seleccione";


}

socketadmin.on("server:valSum",err=>{
  validarSum(err)
})

socketadmin.emit("client:dataSumAll")
socketadmin.on("server:suministros",data=>{
  console.log(data)
  const divSum=document.createElement("div")
data.forEach(element => {
  divSum.innerHTML+=`<div class="row mt-2">
           
    <div class=col-2 >${element.fechaCre} </div>
    <div class=col-2>${element.codigo} </div>
    <div class=col-2>${element.proveedor} </div>
    <div class=col-2 >${element.descripcion} </div>
    <div class=col-2>${element.undMedida} </div>
    <div class=col-2  d-flex>
    
    <button id=${element.codigo} class="btn btn-outline-warning"><i class="bi bi-trash3-fill"></i></button>
    </div> 
    </div>`;
    listSum.appendChild(divSum)
});

for (let i = 0; i < deleteSum.length; i++) {
  deleteSum[i].addEventListener("click",(e)=>{
  e.preventDefault()
  socketadmin.emit("client:deleteSum", deleteSum[i].id)
  })
  
}

})



