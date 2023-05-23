let butData = document.getElementById("but-data");
let divDataAll = document.getElementById("div-data-all");

let divParalizacion = document.getElementById("div-paralizacion");

let butPar = document.getElementById("but-paralizaciones");

let butProdLinea=document.getElementById('but-prod-linea')

let  divUndFab=document.getElementById('und-fabr')


divDataAll.style.display='none'
divUndFab.style.display='none'
divParalizacion.style.display = "none";

butData.addEventListener("click", () => {
  
  butData.style.background = "rgba(163, 175, 189,0.7)";
  butData.style.borderLeft = "2px solid #ffff";
  
});

butPar.addEventListener("click", () => {
     butPar.style.background = "rgba(163, 175, 189,0.7)";
    butPar.style.borderLeft = "2px solid #ffff";
  
    
   });
   butProdLinea.addEventListener("click", () => {
  butProdLinea.style.background = "rgba(163, 175, 189,0.7)";
     butProdLinea.style.borderLeft = "2px solid #ffff";
   butData.style.removeProperty( butData)
    
 });



