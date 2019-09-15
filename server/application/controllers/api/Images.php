<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
require APPPATH . 'libraries/REST_Controller.php';

class Images extends REST_Controller {

    public function __construct(){
        parent::__construct();
        $this->load->library('session');
        /*
        if(!$this->session->has_userdata('user')){
            redirect(site_url('autentication'));
        }
        */
    }

    public function upload_post(){
        $fecha = date('Y-m-d-h-i-s');

        $config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['max_size']             = 100;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;
        $config['file_name']            = 'imagen-'.$fecha;  

        $this->load->library('upload', $config);

        if($this->upload->do_upload('imagen'))
            $response = array('estado' => 'ok', 'msg' => $this->upload->data());
        else
            $response = array('estado' => 'error', 'msg' => 'No se subió ninguna imagen.');
        $this->response($response, REST_Controller::HTTP_OK);
    }
}


