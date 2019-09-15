<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require APPPATH . 'libraries/REST_Controller.php';

class Comentarios extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('comentarios_model');
        $this->load->library('session');
        $this->load->helper('url_helper');

        if(!$this->session->has_userdata('usuario')){
            redirect(site_url('api/autenticacion/error'));
        }
    }

    public function getComentarios_get(){
        // El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        
        // Se buscan los datos
        if(!empty($id)){
            $data = $this->comentarios_model->get_comentarios($id);
        } else{
            $data = $this->comentarios_model->get_comentarios();
        }

        // Se formatea la respuesta
        if($data)
            $response = array('estado' => 'ok', 'msg' => $data);
        else
            $response = array('estado' => 'error', 'msg' => 'No hay registros con ese id.');
            
        
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function insertComentarios_post(){
        $data = $this->post();
        if($this->comentarios_model->set_comentarios($data))
            $response = array('estado' => 'ok', 'msg' => 'Comentario agregado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Comentario no agregado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function updateComentarios_put(){
        $data = $this->put();
        if($this->comentarios_model->update_comentarios($data))
            $response = array('estado' => 'ok', 'msg' => 'Comentario actualizado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Comentario no actualizado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function deleteComentarios_delete(){
        //El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        if($this->comentarios_model->delete_comentarios($id))
            $response = array('estado' => 'ok', 'msg' => 'Comentario eliminado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Comentario no eliminado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }
}