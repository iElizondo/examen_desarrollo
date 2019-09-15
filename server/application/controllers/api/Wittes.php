<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require APPPATH . 'libraries/REST_Controller.php';

class Wittes extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->model('wittes_model');
        //$this->load->helper('url_helper');
        $this->load->library('session');

        /*
        if(!$this->session->has_userdata('user')){
            redirect(site_url('autentication'));
        }
        */
    }

    public function getWittes_get(){
        // El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        
        // Se buscan los datos
        if(!empty($id)){
            $data = $this->wittes_model->get_wittes($id);
        } else{
            $data = $this->wittes_model->get_wittes();
        }

        // Se formatea la respuesta
        if($data)
            $response = array('estado' => 'ok', 'msg' => $data);
        else
            $response = array('estado' => 'error', 'msg' => 'No hay registros con ese id.');
            
        
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function insertWittes_post(){
        $data = $this->post();
        if($this->wittes_model->set_wittes($data))
            $response = array('estado' => 'ok', 'msg' => 'Witte guardado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Witte no guardado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function updateWittes_put(){
        $data = $this->put();
        if($this->wittes_model->update_wittes($data))
            $response = array('estado' => 'ok', 'msg' => 'Witte actualizado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Witte no actualizado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }

    public function deleteWittes_delete(){
        //El cuarto segmento de la URI es el ID
        $id = $this->uri->segment(4);
        if($this->wittes_model->delete_wittes($id))
            $response = array('estado' => 'ok', 'msg' => 'Witte eliminado correctamente.');
        else
            $response = array('estado' => 'error', 'msg' => 'Witte no eliminado.');
        $this->response($response, REST_Controller::HTTP_OK);
    }
}