function consultarDNI() {
    var dni = document.getElementById("dniInput").value;
    var resultadosDiv = document.getElementById("resultados");

    if (dni === "") {
        resultadosDiv.innerText = "Campo obligatorio";
        return;
    } else if (dni.length < 8) {
        resultadosDiv.innerText = "Ingrese al menos 8 dígitos";
        return;
    }

    fetch("https://dniruc.apisperu.com/api/v1/dni/" + dni + "?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVtZWhlY28xOXRlY0BnbWFpbC5jb20ifQ._e_3CKh8_hzYiD32AnUCaEu1yv7vM9JFABz-WuULYug")
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultadosDiv.innerHTML = `
                <p><strong>Nombres:</strong> ${data.nombres}</p>
                <p><strong>Apellido Paterno:</strong> ${data.apellidoPaterno}</p>
                <p><strong>Apellido Materno:</strong> ${data.apellidoMaterno}</p>
            `;
        } else {
            resultadosDiv.innerText = "Datos no encontrados";
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
