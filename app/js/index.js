var BaseApiUrl = "http://localhost/examen_desarrollo/server/index.php/api/";
var ws;
var vm;

function buildUrl(modelo, service) {
    return BaseApiUrl + modelo + "/" + service;
}

window.onload = function() {
    var vm = new Vue({
        el: '#app',
        data: {
            wittes: []
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
            }
        }
    });
}