<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require APPPATH . 'libraries/REST_Controller.php';

class Usuarios extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('usuarios_model');
        //$this->load->helper('url_helper');
        $this->load->library('session');

        /*
        if(!$this->session->has_userdata('user')){
            redirect(site_url('autentication'));
        }
        */
    }

    public function getUsuarios_get(){
        // El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        
        // Se buscan los datos
        if(!empty($id)){
            $data = $this->usuarios_model->get_usuarios($id);
        } else{
            $data = $this->usuarios_model->get_usuarios();
        }

        // Se formatea la respuesta
        if($data)
            $response = array('estado' => 'ok', 'msg' => $data);
        else
            $response = array('estado' => 'error', 'msg' => 'No hay registros con ese id.');
            
        
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function insertUsuarios_post(){
        $data = $this->post();
        if($this->usuarios_model->set_usuarios($data))
            $response = array('estado' => 'ok', 'msg' => 'Usuario registrado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Usuario no registrado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function updateUsuarios_put(){
        $data = $this->put();
        if($this->usuarios_model->update_usuarios($data))
            $response = array('estado' => 'ok', 'msg' => 'Usuario actualizado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Usuario no actualizado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function deleteUsuarios_delete(){
        //El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        if($this->usuarios_model->delete_usuarios($id))
            $response = array('estado' => 'ok', 'msg' => 'Usuario eliminado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Usuario no eliminado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }
}