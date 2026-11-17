
// FUNCIÓN PRINCIPAL
function enviar() {

    var contenido = document.querySelector('#contenido');

    var v1 = document.querySelector('#t1').value;
    var v2 = document.querySelector('#t2').value;
    var v3 = document.querySelector('#t3').value;

    var url = "";

    // OPCIÓN 1: MENSAJE
    if (document.querySelector('#opcion1').checked) {

        url = 'http://127.0.0.1:5000/';

    }

    // OPCIÓN 2: NOTAS
    else if (document.querySelector('#opcion2').checked) {

        if (v1 === "" || v2 === "" || v3 === "") {
            swal("Error", "Ingrese las tres notas", "error");
            return;
        }

        url = 'http://127.0.0.1:5000/notas/' + v1 + '/' + v2 + '/' + v3;

    }

    // OPCIÓN 3: EDAD
    else if (document.querySelector('#opcion3').checked) {

        if (v1 === "") {
            swal("Error", "Ingrese la edad", "error");
            return;
        }

        url = 'http://127.0.0.1:5000/edades/' + v1;

    }

    // OPCIÓN 4: ARREGLOS
    else if (document.querySelector('#opcion4').checked) {

        if (v1 === "" || v2 === "") {
            swal("Error", "Ingrese los datos del arreglo", "error");
            return;
        }

        url = 'http://127.0.0.1:5000/arreglos/' + v1 + '/' + v2;

        if (v3 !== "") {
            url += '/' + v3;
        }

    }

    // OPCIÓN 5: ECUACIÓN
    else if (document.querySelector('#opcion5').checked) {

        if (v1 === "" || v2 === "") {
            swal("Error", "Ingrese X y Z", "error");
            return;
        }

        url = 'http://127.0.0.1:5000/ecuacion/' + v1 + '/' + v2;

    }

    // OPCIÓN 6: TABLA
    else if (document.querySelector('#opcion6').checked) {

        if (v1 === "") {
            swal("Error", "Ingrese un número", "error");
            return;
        }

        url = 'http://127.0.0.1:5000/tabla/' + v1;

    }

    // OPCIÓN 7: ÁREAS
    else if (document.querySelector('#opcion7').checked) {

        if (v1 === "" || v2 === "") {
            swal("Error", "Ingrese los datos de la figura", "error");
            return;
        }

        if (v1 == 1) {

            url = 'http://127.0.0.1:5000/areas/circulo/' + v2;

        } else if (v1 == 2) {

            url = 'http://127.0.0.1:5000/areas/cuadrado/' + v2;

        } else if (v1 == 3) {

            if (v3 === "") {
                swal("Error", "Ingrese la altura", "error");
                return;
            }

            url = 'http://127.0.0.1:5000/areas/triangulo/' + v2 + '/' + v3;

        } else {

            swal("Error", "Seleccione 1, 2 o 3", "error");
            return;

        }

    }

    else {

        swal("Mensaje", "Seleccione una opción", "warning");
        return;

    }

    // CONEXIÓN CON FLASK
    fetch(url)

        .then(function (response) {

            if (response.ok) {
                return response.text();
            } else {
                throw "Error en la llamada";
            }

        })

        .then(function (texto) {

            console.log(texto);
            contenido.innerHTML = texto;

        })

        .catch(function (error) {

            console.log(error);

            swal({
                title: "Advertencia",
                text: String(error),
                icon: "warning",
                buttons: true,
                dangerMode: true,
            });

        });

}


// FUNCIÓN PARA CONFIGURAR LOS CAMPOS
function configurar(h1, h2, h3, p1, p2, p3) {

    var t1 = document.querySelector('#t1');
    var t2 = document.querySelector('#t2');
    var t3 = document.querySelector('#t3');

    t1.disabled = !h1;
    t2.disabled = !h2;
    t3.disabled = !h3;

    t1.value = "";
    t2.value = "";
    t3.value = "";

    t1.placeholder = p1;
    t2.placeholder = p2;
    t3.placeholder = p3;

    document.querySelector('#contenido').innerHTML = "";

}


// OPCIÓN 1: MENSAJE
function opcion1() {

    configurar(false, false, false, "", "", "");

}


// OPCIÓN 2: NOTAS
function opcion2() {

    configurar(true, true, true, "Nota 1", "Nota 2", "Nota 3");

}


// OPCIÓN 3: EDAD
function opcion3() {

    configurar(true, false, false, "Edad", "", "");

}


// OPCIÓN 4: ARREGLOS
function opcion4() {

    configurar(true, true, true,
        "Cantidad de valores",
        "Columnas",
        "Filas (opcional)");

}


// OPCIÓN 5: ECUACIÓN
function opcion5() {

    configurar(true, true, false,
        "Ingrese X",
        "Ingrese Z",
        "");

}


// OPCIÓN 6: TABLA DE MULTIPLICAR
function opcion6() {

    configurar(true, false, false,
        "Ingrese un número",
        "",
        "");

}


// OPCIÓN 7: ÁREAS
function opcion7() {

    configurar(true, true, true,
        "Figura: 1 Círculo, 2 Cuadrado, 3 Triángulo",
        "Radio, lado o base",
        "Altura del triángulo");

}


// CONFIGURACIÓN INICIAL
function iniciar() {
    opcion1();
}

window.addEventListener('DOMContentLoaded', iniciar);
