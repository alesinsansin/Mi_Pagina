document.getElementById("formulario")
.addEventListener("submit", async(e)=>{

e.preventDefault();

const datos = {
cliente: cliente.value,
tipoEvento: tipoEvento.value,
fecha: fecha.value,
equipo: equipo.value,
direccion: direccion.value,
telefono: telefono.value,
estado: estado.value
};

await fetch("/eventos",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(datos)
});

alert("Evento registrado correctamente");

});
