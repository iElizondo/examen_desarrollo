var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm;

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

window.onload = function() {
    vm = new Vue({
        el: '#app',
        data: {
            correo: "",
            contrasena: ""
        },
        mounted() {},
        methods: {
            login() {
                var url = buildUrl('autenticacion', 'login');
                var datos = {
                    correo: this.correo,
                    contrasena: this.contrasena
                }
                axios.post(url, datos).then((response) => {
                    if (response.data.estado == 'ok') {
                        location.href = "http://localhost/examen_desarrollo/app";
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            registrarse() {
                location.href = "http://localhost/examen_desarrollo/app/register.html";
            }
        }
    });
}