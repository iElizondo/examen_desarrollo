var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm;

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

Vue.component('witter', {
    props: ['witte'],
    data: function() {
        return {
            edit: false
        }
    },
    template: ''
})

window.onload = function() {
    var vm = new Vue({
        el: '#app',
        data: {
            usuario: {
                id: "",
                url: "../server/uploads/default.png",
                imagen: "default.png",
                nombre: "",
                correo: "",
                contrasena: ""
            },
            wittes: []
        },
        mounted() {
            this.getUsuarioActual();
            this.getWittes();
        },
        methods: {
            getWittes() {
                var url = buildUrl('wittes', 'getwittes');
                axios.get(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.wittes = response.data.msg;
                        console.info(this.wittes);
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => { console.log(error) });
            },
            getUsuarioActual(){
                var url = buildUrl('autenticacion', 'sesion');
                axios.get(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.usuario.id = response.data.msg.id;
                        this.usuario.url = "../server/uploads/" + response.data.msg.imagen;
                        this.usuario.imagen = response.data.msg.imagen;
                        this.usuario.nombre = response.data.msg.nombre;
                        this.usuario.correo = response.data.msg.correo;
                    } else if (response.data.estado == 'error') {
                        alertify.alert("Autenticación", response.data.msg, function(){
                            location.href = "http://localhost/examen_desarrollo/app/";
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            insertWitte() {

            },
            updateWitte($idWitte) {

            },
            deleteWitte($idWitte) {

            },
            buscarWitte($text) {

            },
            insertComentario() {

            },
            editar() {
                this.edit = true;
            }
        }
    });
}