// script.js
var libreria = JSON.parse(localStorage.getItem('libreria')) || {};

window.onload = function() {
  var libreriaGuardada = localStorage.getItem("libreria");
  if (libreriaGuardada) {
    libreria = JSON.parse(libreriaGuardada);
  }
  console.log();
};

function agregarCodigo() {
  let codigo = document.getElementById('codigo').value;
  let cantidadPacks = parseInt(document.getElementById('cantidad-packs').value);

  // Verificar que el código tenga un código válido y no esté repetido
  if (codigo === "" || isNaN(codigo) || cantidadPacks > 1 || libreria.hasOwnProperty(codigo)) {
    alert("Por favor, ingrese un código válido.");
    return;
  }

  let subcodigos = {};
  let cantidadTotalSubcodigos = 0;

  // Obtener y verificar subcódigos
  var subcodigoInputs = document.querySelectorAll('.subcodigo');
  var cantidadInputs = document.querySelectorAll('.cantidad');

  for (let i = 0; i < subcodigoInputs.length; i++) {
    let subcodigo = subcodigoInputs[i].value;
    let cantidadSubcodigo = parseInt(cantidadInputs[i].value);

    // Verificar que el subcódigo tenga un código válido y no esté repetido
    if (subcodigo !== "" && !isNaN(cantidadSubcodigo) && cantidadSubcodigo >= 1) {
      let subcodigoRepetido = false;
      for (let codigoExistente in libreria) {
        if (libreria[codigoExistente].subcodigos.hasOwnProperty(subcodigo)) {
          subcodigoRepetido = true;
          break;
        }
      }

      if (subcodigoRepetido) {
        alert("El subcódigo " + subcodigo + " ya se encuentra registrado.");
        return;
      }

      subcodigos[subcodigo] = cantidadSubcodigo;
      cantidadTotalSubcodigos += cantidadSubcodigo;
    }
  }

  // Verificar que se haya ingresado al menos 4 subcódigos
  if (Object.keys(subcodigos).length < 4) {
    alert("Por favor, ingresa al menos 4 subcódigos con cantidades válidas.");
    return;
  }

  // Asignar el código a la librería con la cantidad total de subcódigos y los subcódigos asociados
  libreria[codigo] = { cantidad: cantidadTotalSubcodigos, subcodigos: subcodigos };

  // Guardar la librería en localStorage
  localStorage.setItem('libreria', JSON.stringify(libreria));

  // Limpiar los campos de texto de subcódigos
  for (let j = 0; j < subcodigoInputs.length; j++) {
    subcodigoInputs[j].value = "";
    cantidadInputs[j].value = "";
  }

  // Limpiar el campo de texto del código principal
  document.getElementById("codigo").value = "";
  console.log();
}

function mostrarLibreria() {
  let output = "";
  for (let codigo in libreria) {
    output += "Código: " + codigo + " | Cantidad: " + libreria[codigo].cantidad + "\n";
    output += "Subcódigos:\n";
    for (let subcodigo in libreria[codigo].subcodigos) {
      output += subcodigo + " " + libreria[codigo].subcodigos[subcodigo] + "\n";
    }
    output += "\n";
  }
  document.getElementById("libreriaOutput").value = output;
  console.log();
}

function calcularSubpares() {
    let codigo = document.getElementById('codigo').value;
    let cantidadPacks = parseInt(document.getElementById('cantidad-packs').value);
  
    // Verificar que el código tenga un código válido y exista en la librería
    if (codigo === "" || isNaN(cantidadPacks) || cantidadPacks < 1 || !libreria.hasOwnProperty(codigo)) {
      alert("Por favor, ingrese un código válido que exista en la librería.");
      return;
    }
  
    let subcodigos = libreria[codigo].subcodigos;
    let cantidadTotalPares = 0;
    let output = "";
  
    for (let subcodigo in subcodigos) {
      let cantidadSubcodigo = subcodigos[subcodigo];
      let cantidadPares = cantidadSubcodigo * cantidadPacks;
      cantidadTotalPares += cantidadPares;
      output += subcodigo + " " + cantidadPares + "\n";
    }
  
    output += "Cantidad Total de Pares: " + cantidadTotalPares;
  
    // Mostrar el resultado en el textarea
    document.getElementById("libreriaOutput").value = output;
  }

function limpiarLibreria() {
  // Solicitar confirmación para eliminación
  let confirmacion = confirm("¿Seguro que desea limpiar la librería? Esta acción no se puede deshacer.");

  // Si el usuario confirma se procede a limpiar la librería
  if (confirmacion) {
    // Limpiar la librería
    libreria = {};

    // Limpiar localStorage
    localStorage.removeItem('libreria');

    // Limpiar el textarea de la librería
    document.getElementById("libreriaOutput").value = "";

    alert("La librería ha sido limpiada.");
  } else {
    alert("Se ha cancelado la acción.");
    return;
  }
  console.log();
}

function eliminarCodigo(codigo) {
  codigo = document.getElementById('codigo').value;

  // Solicitar confirmación para eliminación
  let confirmacion = confirm("¿Seguro que desea eliminar el código " + codigo + "? Esta acción no se puede deshacer.");

  // Verificar si el código existe
  if (codigo in libreria) {
    // Eliminar el código y sus respectivos subcódigos de la librería
    delete libreria[codigo];

    // Actualizar el localStorage
    localStorage.setItem('libreria', JSON.stringify(libreria));

    // Mostrar mensaje de operación exitosa
    alert("El código " + codigo + " y sus respectivos subcódigos han sido eliminados.");
  } else {
    // Mostrar mensaje de error en caso de no encontrar el código en la librería
    alert("El código " + codigo + " no existe en la librería.");
  }
  console.log();
}

function actualizarCodigo(codigo) {
  codigo = document.getElementById('codigo').value;

  // Solicitar confirmación de actualización de códigos
  let confirmacion = confirm("¿Seguro que desea actualizar el código " + codigo + "?");

  // Verificar si el código existe dentro de la librería
  if (libreria.hasOwnProperty(codigo)) {
    var nuevosSubcodigos = {};
    var cantidadTotalSubcodigos = 0;

    // Obtener y verificar los nuevos subcódigos
    var subcodigoInputs = document.querySelectorAll('.subcodigo');
    var cantidadInputs = document.querySelectorAll('.cantidad');

    for (var i = 0; i < subcodigoInputs.length; i++) {
      var subcodigo = subcodigoInputs[i].value;
      var cantidadSubcodigo = parseInt(cantidadInputs[i].value);

      // Verificar que el subcódigo tenga un valor válido y una cantidad válida
      if (subcodigo !== "" && !isNaN(cantidadSubcodigo) && cantidadSubcodigo >= 1) {
        nuevosSubcodigos[subcodigo] = cantidadSubcodigo;
        cantidadTotalSubcodigos += cantidadSubcodigo;
      }
    }

    // Verificar que se hayan ingresado al menos 4 subcódigos
    if (Object.keys(nuevosSubcodigos).length < 4) {
      alert("Por favor, ingrese al menos 4 subcódigos con cantidades válidas.");
      return;
    }

    // Actualizar los subcódigos y la cantidad total en la librería
    libreria[codigo].subcodigos = nuevosSubcodigos;
    libreria[codigo].cantidad = cantidadTotalSubcodigos;

    // Actualizar el localStorage
    localStorage.setItem('libreria', JSON.stringify(libreria));

    // Mostrar mensaje de operación exitosa
    alert("El código " + codigo + " ha sido actualizado correctamente.");
  } else {
    // Mostrar mensaje de error en caso de no encontrar el código en la librería
    alert("El código " + codigo + " no existe en la librería.");
  }
  console.log();
}

function agregarSubcodigos() {
    const subcodigosGroup = document.getElementById('subcodigosGroup');
  
    // Verificar si ya se han agregado el número máximo de iteraciones
    if (subcodigosGroup.children.length >= 6) {
      alert("No se pueden agregar más subcódigos.");
      return;
    }
  
    const iteracion = document.createElement('div');
    iteracion.classList.add('form-row');
  
    const subcodigoDiv = document.createElement('div');
    subcodigoDiv.classList.add('col-md-6');
  
    const subcodigoLabel = document.createElement('label');
    subcodigoLabel.textContent = "Subcódigo:";
    subcodigoDiv.appendChild(subcodigoLabel);
  
    const subcodigoInput = document.createElement('input');
    subcodigoInput.type = 'text';
    subcodigoInput.classList.add('form-control', 'subcodigo');
    subcodigoDiv.appendChild(subcodigoInput);
  
    const cantidadDiv = document.createElement('div');
    cantidadDiv.classList.add('col-md-6');
  
    const cantidadLabel = document.createElement('label');
    cantidadLabel.textContent = "Cantidad:";
    cantidadDiv.appendChild(cantidadLabel);
  
    const cantidadInput = document.createElement('input');
    cantidadInput.type = 'number';
    cantidadInput.classList.add('form-control', 'cantidad');
    cantidadInput.min = '1';
    cantidadDiv.appendChild(cantidadInput);
  
    iteracion.appendChild(subcodigoDiv);
    iteracion.appendChild(cantidadDiv);
  
    subcodigosGroup.appendChild(iteracion);
} 

function procesarDatosExcel(datosExcel) {
    var nuevaLibreria = {}; // Crear una nueva librería para la carga masiva
  
    for (var i = 1; i < datosExcel.length; i++) {
      var codigo = datosExcel[i][0];
      var cantidadPacks = parseInt(datosExcel[i][1]);
  
      // Verificar que el código tenga un código válido y no esté repetido en la nueva librería
      if (codigo === "" || isNaN(codigo) || cantidadPacks > 1 || nuevaLibreria.hasOwnProperty(codigo)) {
        continue;
      }
  
      var subcodigos = {};
      var cantidadTotalSubcodigos = 0;
  
      for (var j = 2; j < datosExcel[i].length; j += 2) {
        var subcodigo = datosExcel[i][j];
        var cantidadSubcodigo = parseInt(datosExcel[i][j + 1]);
  
        // Verificar que el subcódigo tenga un código válido y no esté repetido en la nueva librería
        if (subcodigo !== "" && !isNaN(cantidadSubcodigo) && cantidadSubcodigo >= 1) {
          var subcodigoRepetido = false;
          for (var codigoExistente in nuevaLibreria) {
            if (nuevaLibreria[codigoExistente].subcodigos.hasOwnProperty(subcodigo)) {
              subcodigoRepetido = true;
              break;
            }
          }
  
          if (subcodigoRepetido) {
            continue;
          }
  
          subcodigos[subcodigo] = cantidadSubcodigo;
          cantidadTotalSubcodigos += cantidadSubcodigo;
        }
      }
  
      // Verificar que se haya ingresado al menos 4 subcódigos
      if (Object.keys(subcodigos).length < 4) {
        continue;
      }
  
      // Asignar el código a la nueva librería con la cantidad total de subcódigos y los subcódigos asociados
      nuevaLibreria[codigo] = { cantidad: cantidadTotalSubcodigos, subcodigos: subcodigos };
    }
  
    // Fusionar la nueva librería con la librería existente
    libreria = { ...libreria, ...nuevaLibreria };
  
    // Guardar la librería actualizada en localStorage
    localStorage.setItem('libreria', JSON.stringify(libreria));
  
    // Mostrar mensaje de carga exitosa
    alert("La carga masiva desde el archivo Excel se ha completado con éxito.");
} 

function descargarBaseDeDatos() {
    var workbook = XLSX.utils.book_new(); // Crear un nuevo libro de Excel
    var data = []; // Array para almacenar los datos
  
    for (var codigo in libreria) {
        var row = []; // Array para cada fila de datos
        var cantidad = libreria[codigo].cantidad;
        var subcodigos = libreria[codigo].subcodigos;
  
        row.push(codigo); // Agregar el código a la fila
  
      // Agregar los subcódigos y sus cantidades a la fila
    for (var subcodigo in subcodigos) {
        row.push(subcodigo);
        row.push(subcodigos[subcodigo]);
      }
  
        row.push(cantidad); // Agregar la cantidad total a la fila
  
        data.push(row); // Agregar la fila al array de datos
    }
  
    var sheet = XLSX.utils.aoa_to_sheet(data); // Convertir los datos a una hoja de cálculo
    XLSX.utils.book_append_sheet(workbook, sheet, "Libreria"); // Agregar la hoja de cálculo al libro
  
    var nombreArchivo = "libreria.xlsx"; // Nombre del archivo Excel a descargar
  
    // Convertir el libro de Excel a un archivo Blob
    var blob = new Blob([XLSX.write(workbook, { bookType: "xlsx", type: "array" })], {
      type: "application/octet-stream"
    });
  
    // Crear un enlace de descarga y simular el clic para iniciar la descarga
    var enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;
    enlace.click();
}
