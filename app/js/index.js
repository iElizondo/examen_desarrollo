var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm;

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

Vue.component('comentario', {
    props: ['comentario', 'usuario'],
    data: function() {
        return {
            edit: false,
            txt_editar: "",
            p_editar: ""
        }
    },
    methods: {
        editar() {
            this.edit = true;
            this.txt_editar = this.$props.comentario.texto;
        },
        updateComentario() {
            var url = buildUrl('comentarios', 'updatecomentarios');
            var datos = {
                id: this.$props.comentario.id,
                witte: this.$props.comentario.witte,
                fecha: this.$props.comentario.fecha,
                usuario: this.$props.comentario.usuario.id,
                texto: this.txt_editar
            }
            axios.put(url, datos).then((response) => {
                if (response.data.estado == 'ok') {
                    this.edit = false;
                    alertify.success(response.data.msg);
                    this.$props.comentario.texto = this.txt_editar;
                    vm.getWittes();
                    ws.send('update');
                } else if (response.data.estado == 'error') {
                    alertify.warning(response.data.msg);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteComentario() {
            var url = buildUrl('comentarios', 'deletecomentarios/' + this.$props.comentario.id);
            alertify.confirm("Eliminando", "Esta seguro que quiere eliminar?", function() {
                    axios.delete(url).then((response) => {
                        if (response.data.estado == 'ok') {
                            alertify.success(response.data.msg);
                            vm.getWittes();
                            ws.send('delete');
                        } else if (response.data.estado == 'error') {
                            alertify.warning(response.data.msg);
                        }
                    }).catch(error => { console.log(error) });
                },
                function() {
                    alertify.error('Cancel');
                });
        }
    },
    template: `<div class="border rounded p-3">
                    <header class="mb-2">
                        <img :src="'../server/uploads/'+comentario.usuario.imagen" alt="" class="usuario-card rounded-circle border border-success">
                        <p class="fecha">{{comentario.fecha}} {{comentario.usuario.correo}}</p>
                    </header>
                    <div class="row">
                        <div class="col">
                            <div v-if="edit">
                                <div class="input-group mb-3">
                                    <input v-model="txt_editar" @keyup.enter="updateComentario()" type="text" class="form-control" placeholder="Editar..." aria-label="Editar..." aria-describedby="button-addon2">
                                    <div class="input-group-append">
                                        <button @click="updateComentario()" class="btn btn-outline boton btn-principal" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="" v-else>
                                <p class="texto">{{comentario.texto}}</p>
                            </div>
                            <div class="d-flex flex-row-reverse bd-highlight" v-if="(!edit)  && (comentario.usuario.id == usuario.id)">
                                <button @click="editar()" class="btn btn-outline boton btn-action rounded-circle bd-highlight ml-2" type="button"><i class="fas fa-pencil-alt fa-sm"></i></button>
                                <button @click="deleteComentario()" class="btn btn-outline boton btn-action rounded-circle bd-highlight ml-2" type="button"><i class="fas fa-trash-alt fa-sm"></i></button>
                            </div>
                        </div>
                    </div>
                </div>`
})

Vue.component('witter', {
    props: ['witte', 'usuario'],
    data: function() {
        return {
            edit: false,
            txt_editar: "",
            txt_editar_comentario: ""
        }
    },
    methods: {
        editar() {
            this.edit = true;
            this.txt_editar = this.$props.witte.texto;
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
                    //this.$props.witte.texto = this.txt_editar;
                    this.txt_editar = "";
                    vm.getWittes();
                    ws.send('update');
                } else if (response.data.estado == 'error') {
                    alertify.warning(response.data.msg);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteWitte() {
            var url = buildUrl('wittes', 'deleteWittes/' + this.$props.witte.id);
            alertify.confirm("Eliminando", "Esta seguro que quiere eliminar?", function() {
                    axios.delete(url).then((response) => {
                        if (response.data.estado == 'ok') {
                            alertify.success(response.data.msg);
                            vm.getWittes();
                            ws.send('delete');
                        } else if (response.data.estado == 'error') {
                            alertify.warning(response.data.msg);
                        }
                    }).catch(error => { console.log(error) });
                },
                function() {
                    alertify.error('Cancel');
                });
        },
        insertComentario() {
            var url = buildUrl('comentarios', 'insertcomentarios');
            var datos = {
                usuario: this.$props.usuario.id,
                witte: this.$props.witte.id,
                texto: this.txt_editar_comentario,
                fecha: new Date()
            }
            axios.post(url, datos).then((response) => {
                if (response.data.estado == 'ok') {
                    this.$props.texto = this.txt_editar_comentario;
                    this.txt_editar_comentario = "";
                    alertify.success(response.data.msg);
                    vm.getWittes();
                    ws.send('insert');
                } else if (response.data.estado == 'error') {
                    alertify.error(response.data.msg);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    },
    template: `<div class="card p-4 mb-3">
                    <header class="h-card mb-2">
                        <img :src="'../server/uploads/'+witte.usuario.imagen" alt="" class="usuario-card rounded-circle border border-success">
                        <p class="fecha">{{witte.fecha}} {{witte.usuario.correo}}</p>
                    </header>
                    <div class="c-card">
                        <div v-if="edit">
                            <div class="input-group mb-3">
                                <input v-model="txt_editar" @keyup.enter="updateWitte()" type="text" class="form-control" placeholder="Editar..." aria-label="Editar..." aria-describedby="button-addon2">
                                <div class="input-group-append">
                                    <button @click="updateWitte()" class="btn btn-outline boton btn-principal" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <p class="texto">{{witte.texto}}</p>
                        </div>
                        <div class="input-group mb-3" v-if="!edit">
                            <input v-model="txt_editar_comentario" @keyup.enter="insertComentario()" type="text" class="form-control" placeholder="Comentar..." aria-label="Comentar..." aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline boton btn-principal" type="button" id="button-addon2" @click="insertComentario()"><i class="fas fa-paper-plane"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="l-card mb-2 d-flex flex-row-reverse bd-highlight" v-if="(!edit) && (witte.usuario.id == usuario.id)">
                        <button @click="editar()" class="btn btn-outline boton btn-action rounded-circle bd-highlight ml-2" type="button"><i class="fas fa-pencil-alt fa-sm"></i></button>
                        <button @click="deleteWitte()" class="btn btn-outline boton btn-action rounded-circle bd-highlight ml-2" type="button"><i class="fas fa-trash-alt fa-sm"></i></button>
                    </div>
                    <footer>
                        <div class="accordion" :id="'comentarios'+witte.id">
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <i class="fas fa-eye"> Comentarios</i>
                                        </button>
                                    </h2>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="'#comentarios'+witte.id">
                                    <div class="card-body">
                                        <comentario v-for="comentario in witte.comentarios" v-bind:comentario="comentario" v-bind:usuario="usuario" v-bind:key="comentario.id"></comentario>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>`
})

window.onload = function() {
    vm = new Vue({
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
            this.MyWebSocketCall();
            this.getWittes();
        },
        methods: {
            getWittes() {
                if (this.busqueda) {
                    this.buscar();
                } else {
                    var url = buildUrl('wittes', 'getwittes');
                    axios.get(url).then((response) => {
                        if (response.data.estado == 'ok') {
                            /*
                            for (witte in this.wittes) {
                                this.wittes.remove(witte);
                            }
                            for (witte in response.data.msg) {
                                this.wittes.push(witte);
                                console.info(witte)
                            }
                            */

                            //var wittes = 
                            this.wittes = response.data.msg;
                            this.$forceUpdate();
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
            buscar() {
                var termino = this.busqueda.replace(" ", "_");
                var url = buildUrl('wittes', 'foundwittes/' + termino);
                axios.get(url).then((response) => {
                    if (response.data.estado == 'ok') {
                        this.wittes = response.data.msg;
                        //console.info(this.wittes);
                    } else if (response.data.estado == 'error') {
                        alertify.warning(response.data.msg);
                    }
                }).catch(error => { console.log(error) });
            },
            publicar() {
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
                        ws.send('insert');
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
            },
            MyWebSocketCall() {
                if ("WebSocket" in window) {
                    console.log("WebSocket is supported by your Browser!");
                    // Let us open a web socket
                    //personalizamos la url con nuestro propio room_id
                    //wss://connect.websocket.in/YOUR_CHANNEL_ID?room_id=YOUR_ROOM_ID
                    ws = new WebSocket("wss://connect.websocket.in/examen_elicris?room_id=483464545647566948");
                    ws.onopen = function() {
                        // Web Socket is connected, send data using send()
                        ws.send("open");
                        console.log("WebSocket is open...");
                    };
                    ws.onmessage = function(evt) {
                        // cada vez que se invoca el ws.send() se recibe una respuesta de forma asincrónica
                        // console.log("Message is received: " + evt.data); //evt.data contiene el msj recibido
                        vm.getWittes();
                    };
                    ws.onclose = function() {
                        // websocket is closed.
                        console.log("Connection is closed...");
                    };
                } else {
                    // The browser doesn't support WebSocket
                    alert("WebSocket NOT supported by your Browser!");
                }
            }
        }
    });
}