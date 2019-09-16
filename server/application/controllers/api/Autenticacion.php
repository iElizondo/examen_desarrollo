<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require APPPATH . 'libraries/REST_Controller.php';

class Autenticacion extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->library('session');
        $this->load->database();
    }

    public function login_post(){
        $data = $this->post();
        if($data){
            if($data['correo'] && $data['contrasena']){
                $this->db->where('correo', $data['correo']);
                $this->db->where('contrasena', md5($data['contrasena']));
                $query = $this->db->get('usuarios');
                if($query->row_array()){
                    $this->session->set_userdata('usuario', $query->row_array());
                    $response = array('estado' => 'ok', 'msg' => 'Autenticado correctamente.');
                } else {
                    $response = array('estado' => 'error', 'msg' => 'Usuario o contraseña incorrecto.');
                }
            } else {
                $response = array('estado' => 'error', 'msg' => 'Foramto de los datos incorrecto.');
            }
        } else {
            $response = array('estado' => 'error', 'msg' => 'Datos de usuario no recibidos.');
        }
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function logout_delete(){
        if($this->session->has_userdata('usuario')){
            $this->session->unset_userdata('usuario');
            $response = array('estado' => 'ok', 'msg' => 'Sesión finalizada correctamente.');
        } else {
            $response = array('estado' => 'error', 'msg' => 'La sesión no está iniciada.');
        }
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function sesion_get(){
        if($this->session->has_userdata('usuario')){
            $data = $this->session->userdata('usuario');
            $data['contrasena'] = 'not here';
            $response = array('estado' => 'ok', 'msg' => $data);
        } else {
            $response = array('estado' => 'error', 'msg' => 'La sesión no está iniciada.');
        }
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function error_get(){
        $response = array('estado' => 'error', 'msg' => 'Debe iniciar sesión antes de usar la api.');
        $this->response($response, REST_Controller::HTTP_OK);
    }
}