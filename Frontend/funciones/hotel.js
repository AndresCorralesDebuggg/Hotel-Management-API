const API = "http://localhost:3000";

async function cargarClientes() {
    const res = await fetch(`${API}/clientes`);
    const data = await res.json();

    const tabla = document.getElementById("tablaHotel");
    tabla.innerHTML = "";

    data.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
            <td>${cliente.id_clientes}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.direccion}</td>
            <td>${cliente.telefono}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="abrirEditar(${cliente.id_clientes}, '${cliente.nombre}', '${cliente.direccion}', '${cliente.telefono}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarCliente(${cliente.id_clientes})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}

async function eliminarCliente(id) {
    const confirmar = confirm("¿Seguro que querés eliminar este cliente?");
    if (!confirmar) return;

    await fetch(`${API}/clientes/${id}`, {
        method: "DELETE"
    });

    cargarClientes();
}

async function crearCliente() {
    const nombre    = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono  = document.getElementById("telefono").value.trim();

    if (!nombre || !direccion || !telefono) {
        alert("Por favor completá todos los campos.");
        return;
    }

    await fetch(`${API}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, direccion, telefono })
    });

    document.getElementById("nombre").value    = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value  = "";

    bootstrap.Modal.getInstance(document.getElementById("modalCrear")).hide();
    cargarClientes();
}
// Abre el modal con los datos del cliente
function abrirEditar(id, nombre, direccion, telefono) {
    document.getElementById("editId").value        = id;
    document.getElementById("editNombre").value    = nombre;
    document.getElementById("editDireccion").value = direccion;
    document.getElementById("editTelefono").value  = telefono;

    new bootstrap.Modal(document.getElementById("modalEditar")).show();
}

// Guarda los cambios
async function editarCliente() {
    const id        = document.getElementById("editId").value;
    const nombre    = document.getElementById("editNombre").value.trim();
    const direccion = document.getElementById("editDireccion").value.trim();
    const telefono  = document.getElementById("editTelefono").value.trim();

    await fetch(`${API}/clientes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, direccion, telefono })
    });

    bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
    cargarClientes();
}


cargarClientes();