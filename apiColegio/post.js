fetch("http://localhost:3000/colegio", {
    method: "POST",
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        nombre: "Colegio CIT",
        direccion: "Heredia",
        telefono: "2222-3333"
    })
}).then(res => res.json()). then(data => console.log(data));
