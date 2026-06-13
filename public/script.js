const API_URL = "/eventos";

async function obtenerEventos() {
    try {
        const res = await fetch(API_URL);
        const eventos = await res.json();

        const tabla = document.getElementById("tablaEventos");
        tabla.innerHTML = "";

        eventos.forEach(evento => {
            tabla.innerHTML += `
                <tr>
                    <td>${evento.cliente}</td>
                    <td>${evento.tipoEvento}</td>
                    <td>${evento.fecha}</td>
                    <td>${evento.equipo}</td>
                    <td>${evento.telefono}</td>
                    <td>${evento.estado}</td>
                    <td>
                        <button class="btn-editar" onclick="editarEvento('${evento._id}', '${evento.cliente}', '${evento.tipoEvento}', '${evento.fecha}', '${evento.equipo}', '${evento.direccion}', '${evento.telefono}', '${evento.estado}')">Editar</button>
                        <button class="btn-eliminar" onclick="eliminarEvento('${evento._id}')">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error al obtener eventos:", error);
    }
}

document.getElementById("formulario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("eventoId").value;

    const evento = {
        cliente: document.getElementById("cliente").value,
        tipoEvento: document.getElementById("tipoEvento").value,
        fecha: document.getElementById("fecha").value,
        equipo: document.getElementById("equipo").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        estado: document.getElementById("estado").value
    };

    try {
        if (id) {
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento)
            });
        } else {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(evento)
            });
        }

        document.getElementById("formulario").reset();
        document.getElementById("eventoId").value = "";
        document.getElementById("tituloFormulario").textContent = "Registrar Evento";
        document.getElementById("btnGuardar").textContent = "Guardar Evento";

        obtenerEventos();
    } catch (error) {
        console.error("Error al guardar evento:", error);
    }
});

function editarEvento(id, cliente, tipoEvento, fecha, equipo, direccion, telefono, estado) {
    document.getElementById("eventoId").value = id;
    document.getElementById("cliente").value = cliente;
    document.getElementById("tipoEvento").value = tipoEvento;
    document.getElementById("fecha").value = fecha;
    document.getElementById("equipo").value = equipo;
    document.getElementById("direccion").value = direccion;
    document.getElementById("telefono").value = telefono;
    document.getElementById("estado").value = estado;

    document.getElementById("tituloFormulario").textContent = "Editar Evento";
    document.getElementById("btnGuardar").textContent = "Actualizar Evento";
}

async function eliminarEvento(id) {
    if (confirm("¿Deseas eliminar este evento?")) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        obtenerEventos();
    }
}

obtenerEventos();