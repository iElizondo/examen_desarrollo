var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm;

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

Vue.component('witter', {
    props: ['witte', 'usuario'],
    data: function() {
        return {
            edit: false,
            txt_editar: "",
            p_editar: ""
        }
    },
    methods: {
        editar($witte) {
            this.edit = true;
            this.txt_editar = $witte.texto;
        },
        updateWitte() {
            var url = buildUrl('wittes', 'updatewittes');
            var datos = {
                id: this.$props.witte.id,
                fecha: this.$props.witte.fecha,
                usuario: this.$props.witte.usuario.id,
                texto: this.txt_editar
            }
            axios.put(url, datos).then((response) => {
                if (response.data.estado == 'ok') {
                    this.edit = false;
                    alertify.success(response.data.msg);
                    this.$props.witte.texto = this.txt_editar;
                } else if (response.data.estado == 'error') {
                    alertify.warning(response.data.msg);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteWitte() {

        }
    },
    template: `<div class="card p-2 mb-3">
    <header class="h-card">
        <img :src="'../server/uploads/'+witte.usuario.imagen" alt="" class="usuario-card rounded-circle">
        <p class="fecha">{{witte.fecha}}</p>
    </header>
    <div class="c-card">
        <div v-if="edit">
        <div class="input-group mb-3">
        <input v-model="txt_editar" type="text" class="form-control" placeholder="Editar..." aria-label="Editar..." aria-describedby="button-addon2">
        <div class="input-group-append">
            <button @click="updateWitte()" class="btn btn-outline boton btn-principal" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
        </div>
        <div v-else>
            <p class="texto">{{witte.texto}}</p>
        </div>
        <div class="input-group mb-3" v-if="!edit">
            <input type="text" class="form-control" placeholder="Comentar..." aria-label="Comentar..." aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline boton btn-principal" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
    <div class="l-card mb-2" v-if="(!edit) && (witte.usuario.id == usuario.id)">
        <button @click="editar(witte)" class="btn btn-outline boton btn-action rounded-circle" type="button" id="button-addon2"><i class="fas fa-edit"></i></button>
        <button @click="deleteWitte(witte)" class="btn btn-outline boton btn-action rounded-circle" type="button" id="button-addon2"><i class="fas fa-trash-alt"></i></button>
    </div>
    <footer>
        <div class="accordion" id="accordionExample">
            <div class="card" v-for="contario in witte.comentarios">
                <div class="card-header ver-cometarios" :id="'comentarios'+witte.id">
                    <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#colap'+witte.id" aria-expanded="true" aria-controls="collapseOne">
                        <i class="fas fa-eye"> Comentarios</i>
                </button>
                </div>

                <div :id="'colap'+witte.id" class="collapse show" :aria-labelledby="'comentarios'+witte.id" data-parent="#accordionExample">
                    <div class="card-body">
                        <div class="card p-2">
                            <header class="h-card">
                                <img :src="'../server/uploads/'+contario.usuario.imagen" alt="" class="usuario-card rounded-circle">
                                <p class="fecha">{{contario.fecha}}</p>
                            </header>
                            <div class="row">
                                <div class="col">
                                    <div class="c-card">
                                        <p class="texto">{{contario.texto}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</div>`
})

window.onload = function() {
    var vm = new Vue({
        el: '#app',
        data: {
            wittes: [],
            usuario: {
                id: "",
                url: "../server/uploads/default.png",
                imagen: "default.png",
                nombre: "",
                correo: "",
                contrasena: ""
            },
            witte: "",
            busqueda: ""
        },
        mounted() {
            this.getUsuarioActual();
            this.getWittes();
        },
        methods: {
            getWittes() {
                if(this.busqueda){
                    this.buscar();
                } else {
                    var url = buildUrl('wittes', 'getwittes');
                    axios.get(url).then((response) => {
                        if (response.data.estado == 'ok') {
                            this.wittes = response.data.msg;
                            console.info(this.wittes);
                        } else if (response.data.estado == 'error') {
                            alertify.warning(response.data.msg);
                        }
                    }).catch(error => { console.log(error) });
                }
            },
            getUsuarioActual() {
                var url = buildUrl('autenticacion', 'sesion');
                axios.get(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.usuario.id = response.data.msg.id;
                        this.usuario.url = "../server/uploads/" + response.data.msg.imagen;
                        this.usuario.imagen = response.data.msg.imagen;
                        this.usuario.nombre = response.data.msg.nombre;
                        this.usuario.correo = response.data.msg.correo;
                    } else if (response.data.estado == 'error') {
                        alertify.alert("Autenticación", response.data.msg, function() {
                            location.href = "http://localhost/examen_desarrollo/app/login.html";
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            insertWitte() {

            },
            
            insertComentario() {

            },
            buscar() {
                var termino = this.busqueda.replace(" ", "_");
                var url = buildUrl('wittes', 'foundwittes/'+termino);
                axios.get(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.wittes = response.data.msg;
                        console.info(this.wittes);
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => { console.log(error) });
            },
            publicar(){
                var url = buildUrl('wittes', 'insertwittes');
                var datos = {
                    usuario: this.usuario.id,
                    texto: this.witte,
                    fecha: new Date()
                }
                axios.post(url, datos).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.witte = "";
                        this.getWittes();
                        alertify.success(response.data.msg);
                    } else if (response.data.estado == 'error') {
                        alertify.error(response.data.msg);
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            logout() {
                var url = buildUrl('autenticacion', 'logout');
                axios.delete(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        alertify.alert("Autenticación", response.data.msg, function() {
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