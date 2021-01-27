const formularioContacto = document.querySelector('#contacto'),
      listadoContactos = document.querySelector('.listado-contactos tbody')
      inputBuscador = document.querySelector('#buscar');


// llamada a la funcion de los eventos
eventListener();

// funcion encargada de los eventListener
function eventListener(){
    // accion al formulario de editar o agregar
    formularioContacto.addEventListener('submit', leerFormulario);

    if (listadoContactos) {
        // accion para eliminar contacto
        listadoContactos.addEventListener('click', eliminarContacto);
    }

    // accion al buscador principal
    inputBuscador.addEventListener('input', buscarContactos);

    // total contactos
    numeroContactos();
}

// funciones
// funcion para leer los datos de los campos del formulario
function leerFormulario(e){
    e.preventDefault();

    // leyendo los datos de los inputs
    const nombre = document.querySelector('#nombre').value;
    const empresa = document.querySelector('#empresa').value;
    const telefono = document.querySelector('#telefono').value;
    const accion = document.querySelector('#accion').value;
    
    if (nombre === '' || empresa === '' || telefono === '') {
        // en caso de que algun elemento este vacio, mostrara la notificación
        // 2 parametros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    }else{
        // si los datos son correctos, se crea una peticion ajax
        const infoCotacto = new FormData();
        infoCotacto.append('nombre', nombre); // key value
        infoCotacto.append('empresa', empresa); // key value
        infoCotacto.append('telefono', telefono); // key value
        infoCotacto.append('accion', accion); // key value

        // condicional if dependiendo de la accion
        if (accion === 'crear') {
            // creacion del elemento
            insertarBD(infoCotacto);

        }else{
            // edicion del elemento
            const idRegistro = document.querySelector('#id').value;
            infoCotacto.append('id', idRegistro);
            actualizarRegistro(infoCotacto);
        }
    }
}

// funcion para mostrar notificacion en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    // añadir la notificacion al html
    formularioContacto.insertBefore(notificacion, document.querySelector('form legend'));

    // ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible'); // al pasar 100 milisegundos se aplicara una clase a notificacion

        setTimeout(() => {
            notificacion.classList.remove('visible'); // despues de 3000 milisegundos se removera la clase a notificacion
            
            setTimeout(() => {
                notificacion.remove(); // removemos el elemento completamente
            }, 500);
        }, 3000);
    }, 100);
}

// funcion para insertar datos a la base de datos
function insertarBD(datos) {
    // create object
    const xhr = new XMLHttpRequest();

    // open conection
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);

    // transfer data
    xhr.onload = function(){
        if (xhr.status === 200) {
            // leyendo la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            
            // insertando un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');
            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            // contenedor para los botones
            const contenedorAcciones = document.createElement('td');
            
            // crear icono editar
            const iconoEditar = document.createElement('i'); 
            
            // agregando clases al icono
            iconoEditar.classList.add('fas', 'fa-pen-square');

            // creando el enlace contenedor del icono
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar); // agregamos el icono al elemento a
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            contenedorAcciones.appendChild(btnEditar);

            // crear icono de elminar
            const iconoEliminar = document.createElement('i');

            // agregando las clases al icono de eliminar
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            // crear boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            contenedorAcciones.appendChild(btnEliminar);

            // agregando el ultimo td al tr
            nuevoContacto.appendChild(contenedorAcciones);

            // agregando el nuevoContacto a la tabla
            listadoContactos.appendChild(nuevoContacto);

            // resetear el formulario
            document.querySelector('form').reset();
            
            // mostrar notificaciones
            mostrarNotificacion('Contacto creado correctamente', 'correcto');
            
            // actualizar contador
            numeroContactos();
        }
    }
    // send data
    xhr.send(datos);
}

// funcion para actualizar registros
function actualizarRegistro(datos) {
    // crear el objeto ajax
    const xhr = new XMLHttpRequest();

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contacto.php', true);

    // leer la respuesta
    xhr.onload = function(){
        if (this.status === 200) {
            const respuesta = JSON.parse(xhr.responseText);

            if (respuesta.respuesta === 'correcto') {
                // mostrar notificacion de contacto actualizado
                mostrarNotificacion('Contacto actualizado correctamente', 'correcto');

            }else{
                // notificacion de hubo un error
                mostrarNotificacion('Hubo un error...', 'error');

            }

            // despues de 3 segundo, se reedirecciona a la pantalla principal
            setTimeout(() => {
                window.location.href = 'index.php';
            }, 4000);
        }
    }

    // enviar la peticion
    xhr.send(datos);
}

// funcion para buscar contactos
function buscarContactos(e) {
    const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro =>{
        registro.style.display = 'none';

        if (registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 || 
            registro.childNodes[3].textContent.replace(/\s/g, " ").search(expresion) != -1 ||
            registro.childNodes[5].textContent.replace(/\s/g, " ").search(expresion) != -1) {
            registro.style.display = 'table-row';
        }
        numeroContactos();
    });
}

// funcion para mostrar el total de contactos
function numeroContactos() {
    const totalContactos = document.querySelectorAll('tbody tr'),
          contenedorNumero = document.querySelector('.total-contactos span');

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });

    contenedorNumero.textContent = total;
}

// funcion para eliminar contactos
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // tomar el id del elemento
        const id = e.target.parentElement.getAttribute('data-id');

        // preguntar al usuario si esta seguro de eliminar dicho elemento
        const respuesta = confirm(`¿Estas seguro(a) de eliminar este contacto?`);

        if (respuesta) {
            // llamado a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            // abrir la conexion
            xhr.open('GET', `inc/modelos/modelo-contacto.php?id=${id}&accion=borrar`, true);

            // leer la respuesta
            xhr.onload = function(){
                if (this.status == 200) {
                    const resultado = JSON.parse(xhr.responseText);

                    if (resultado.respuesta === 'correcto') {
                        // eliminar el registro del dom
                        e.target.parentElement.parentElement.parentElement.remove();
                        // mostrar notificacion
                        mostrarNotificacion('Contacto eliminado correctamente', 'correcto');

                        // actualizar contador
                        numeroContactos();
                    }else{
                        // en caso de no suceder nada, se muestra notificacion
                        mostrarNotificacion('Hubo un error...', 'error');
                    }
                }
            }
            // enviar la peticion
            xhr.send();
        }
    }
}


