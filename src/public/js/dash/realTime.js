const irwin1Parpadeo=document.querySelector("#irwin1Parpadeo")


socket.on("runner",(data)=>{
    console.log(data); 
    irwin1Parpadeo.style.backgroundColor=data
})
socket.on("stopped",(data)=>{
    console.log(data); 
    irwin1Parpadeo.style.backgroundColor=data
})
socket.on("changes",(data)=>{
    console.log(data); 
    irwin1Parpadeo.style.backgroundColor=data
})
