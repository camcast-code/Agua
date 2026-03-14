const form = document.getElementById("reporteForm");
const botonVer = document.getElementById("verReportes");
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
            headers: {
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

botonVer.addEventListener("click", async (e) => { 

 resultado.innerHTML = "...obteniendo reportes";

   try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();

    let html = '<div class="space-y-3">';

    data.forEach(element => {
      
    html += `
    <div class="bg-green-50 border border-green-400 rounded-xl p-4 shadow-md">
        <h3 class="text-green-700 font-bold text-base mb-1">${element.title}</h3>
        <p class="text-gray-600 text-sm mb-2">${element.body}</p>
        <span class="text-xs text-white bg-green-500 px-2 py-1 rounded-full">ID: ${element.id}</span>
    </div>
    `;
});

    html += '</div>';
    resultado.innerHTML = html;

} catch (error) {
        resultado.innerHTML = `
        <div>
            Error al obtener los reportes.
        </div>
        `;
    }
});