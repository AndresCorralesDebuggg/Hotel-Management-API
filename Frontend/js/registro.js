const API_URL = 'http://localhost:3000';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // ✅ Validaciones
    if (!email || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
        const res = await fetch(API_URL + '/registro', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: email,       
                contrasena: password  
            })
        });

        const data = await res.json();

        if (res.ok) {
            alert("Usuario registrado con éxito. Puedes iniciar sesión.");
            window.location.href = "login.html";
        } else {
            alert(data.error || "Error al registrar usuario");
        }

    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("No se pudo conectar con el servidor");
    }
});
