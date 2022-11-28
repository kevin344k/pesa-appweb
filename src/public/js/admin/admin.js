const productoAdmin = document.getElementById("productoAdmin");
const primerLink = document.getElementById("primerLink");
const segundoLink = document.getElementById("segundoLink");
const personalAdmin = document.getElementById("personalAdmin");
const divMensajeError = document.getElementById("divMensajeError");
primerLink.classList.add("active");
personalAdmin.style.display = "none";

primerLink.addEventListener("click", () => {
  primerLink.classList.add("active");
  segundoLink.classList.remove("active");
  productoAdmin.style.display = "contents";
  personalAdmin.style.display = "none";
});

segundoLink.addEventListener("click", () => {
  primerLink.classList.remove("active");
  segundoLink.classList.add("active");
  productoAdmin.style.display = "none";
  personalAdmin.style.display = "contents";
});

const inputCode = document.querySelector("#input-code");
const inputDesc = document.querySelector("#input-desc");
const inputUndHora = document.querySelector("#input-und-hora");
const inputUndTurno = document.querySelector("#input-und-turno");
const butAdd = document.querySelector("#abut-add-prod");
const formAdd = document.querySelector("#formAdd");
const listProd = document.querySelector("#listProd");
const deleteProd = document.getElementsByClassName("btn btn-danger");
const socketadmin = io();

console.log(deleteProd.length);

formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(
    inputCode.value,
    inputDesc.value,
    inputUndHora.value,
    inputUndTurno.value
  );
  socketadmin.emit("client:admin-ingresar-prod", {
    codigo: inputCode.value,
    description: inputDesc.value,
    undHora: inputUndHora.value,
    undTurno: inputUndTurno.value,
  });
  inputCode.value = "";
  inputDesc.value = "";
  inputUndHora.value = "";
  inputUndTurno.value = "";
});

socketadmin.emit("client:loadpage");
socketadmin.on("server:loadpage", (data) => {
  const lista = document.createElement("div");

  data.forEach((element) => {
    lista.innerHTML += `<div class="row mt-2">
           
    <div class=col>${element.code_prod} </div>
    <div class=col>${element.desc_prod} </div>
    <div class=col>${element.aph} </div>
    <div class=col>${element.apd} </div>
    <div class=col><button  id=${element.code_prod} class="btn btn-danger"><i class="bi bi-trash3-fill"></i></button></div> 
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

/*


*/

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
const editPerson = document.getElementsByClassName("btn btn-info text-white");
const butSave = document.querySelector("but-add-person");
show.addEventListener("click", () => {
  if (input_pass.type == "password") {
    input_pass.type = "text";
  } else {
    input_pass.type = "password";
  }
});
////codigo de la pestañla personal

formAddPersonal.addEventListener("submit", (e) => {
  e.preventDefault();

  socketadmin.emit("client:validatePerson", input_cedula.value);

  socketadmin.on("server:resValidation", (data) => {
    if (data === "existe") {
      let msgerr = document.createElement("div");
      msgerr.innerHTML = `<div class="alert alert-danger" role="alert">
    El usuario que intentas registrar ya existe 
  </div>`;
      divMensajeError.appendChild(msgerr);
    } else {
      data = {
        cedula: input_cedula.value,
        nombres: input_nommbre_apellido.value,
        rol: selectrol.value,
        password: input_pass.value,
      };

      socketadmin.emit("client:datausuarios", data);

      input_cedula.value = "";
      input_nommbre_apellido.value = "";
      selectrol.value = "";
      input_pass.value = "";
    }
  });
});

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
    <button  id=${element.cedula} class="btn btn-info text-white"><i class="bi bi-pencil"></i></button>
    <button id=${element.cedula} class="btn btn-warning text-white"><i class="bi bi-trash3-fill"></i></button>
    </div> 
    </div>`;

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

      console.log(editPerson[i].id);
      socketadmin.emit("client:editPerson", editPerson[i].id);
    });
  }

  socketadmin.on("server:dataEdit", (data) => {
    console.log(data);

    input_cedula.value = data.cedula;
    input_nommbre_apellido.value = data.nombres;
    selectrol.value = data.rol;
    input_pass.value = data.password;
  });

  socketadmin.emit("server:dataEditSave");
});
