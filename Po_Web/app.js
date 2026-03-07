const form = document.getElementById("reporteForm");
const botonVer = document.getElementById("verreportes");
const resultado = document.getElementById("resultado");

//==========================================================
//  MANEJO DEL POST .ENVIAR REPORTE
//  DEBE DESPARARSE CUANDPO SE DE CÑLICK EN EL BOTON SUBMIT
//==========================================================

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    //creaMOS UN REGISTRO TIPO JSON PARA EMPACAR LA INFORMACION
    const reporte = {
        nombre: document.getElementById("nombre").value,
        tipo: document.getElementById("tipo").value,
        descripcion: document.getElementById("descripcion").value
    };
    resultado.innerHTML = "Enviando reporte...";
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            body: JSON.stringify(reporte)
        });

        const data = await response.json();

        //mostrar en consola, resultado de la peticion:
        console.log("Respuesta del servidor...");
        console.log(data);

        //mostrar en la pagina, valores devueltos por el servidor
        resultado.innerHTML = `
          <div class="bg-black shadow-2xl rounded-2xl p-8 w-full max-w-xl">
          reporte enviado correctamente <br>
          Id asignado: ${data.id}
          </div>
          `;
        form.reset();

    }
    catch (error) {
        resultado.innerHTML = `
          <div class = "bg-black shadow-2xl rounded-2xl p-8 w-full max-w-xl">
          Error al enviar el reporte.
          </div>
          `;
    }
});


//========================================================================
//  MANEJO DEL GET - OBTENER REPORTES DEL SERVIDOR Y MOSTRAR EN PANTALLA
//  DEBE DESPARARSE CUANDO SE DE CLICK EN EL BOTON ER REPORTES
//=========================================================================

botonVer.addEventListener("click", async (e) => { });