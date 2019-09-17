var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

window.onload = function() {
    vm = new Vue({
        el: '#app',
        data: {
            usuario: {
                url: "../server/uploads/default.png",
                imagen: "default.png",
                nombre: "",
                correo: "",
                contrasena: ""
            },
            imagen: {},
            file: "Seleccione una imagen"
        },
        mounted() {},
        methods: {
            imagen_upload(){
                var url = buildUrl('images', 'upload');
                var datos = new FormData();
                this.imagen = this.$refs.file.files[0];
                this.file = this.imagen.name;
                datos.append('imagen', this.imagen);
                axios.post(url, datos, 
                        { headers: {'Content-Type': 'multipart/form-data'} }
                    ).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.usuario.url = "../server/uploads/" + response.data.msg.file_name;
                        this.usuario.imagen = response.data.msg.file_name;
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            registrarse(){
                var url = buildUrl('usuarios', 'insertusuarios');
                axios.post(url, this.usuario).then((response) => {
                    if (response.data.estado == 'ok') {
                        alertify.alert("Registro", response.data.msg, function(){
                            location.href = "http://localhost/examen_desarrollo/app/login.html";
                        });
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    });
}