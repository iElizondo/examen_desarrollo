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
    methods: {
        editar() {
            this.edit = true;
        }
    },
    template: `<div class="card p-2">
    <header class="h-card">
        <img :src="'../server/uploads/'+witte.usuario.imagen" alt="" class="usuario-card rounded-circle">
        <p class="fecha">{{witte.fecha}}</p>
    </header>
    <div class="c-card">
        <div v-if="edit">
            <textarea name="txa_comentario" id="txa_comentario" cols="55" rows="5"></textarea>
            <button class="btn btn-outline boton btn-action rounded-circle" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
        </div>
        <div v-else>
            <p class="texto">{{witte.texto}}</p>
        </div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Comentar..." aria-label="Comentar..." aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline boton btn-principal" type="button" id="button-addon2"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    </div>
    <div class="l-card mb-2" v-if="!edit">
        <button @click="editar()" class="btn btn-outline boton btn-action rounded-circle" type="button" id="button-addon2"><i class="fas fa-edit"></i></button>
        <button class="btn btn-outline boton btn-action rounded-circle" type="button" id="button-addon2"><i class="fas fa-trash-alt"></i></button>
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
        },
        mounted() {
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
            insertWitte() {

            },
            updateWitte($idWitte) {

            },
            deleteWitte($idWitte) {

            },
            buscarWitte($text) {

            },
            insertComentario() {

            }
        }
    });
}