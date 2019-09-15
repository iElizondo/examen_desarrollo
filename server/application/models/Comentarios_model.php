<?php
class News_model extends CI_Model {
    public function __construct(){
        $this->load->database();
    }

    public function get_comentarios($id = FALSE){
        if ($id === FALSE){
            $query = $this->db->get('comentarios');
            return $query->result_array();
        }

        $query = $this->db->get_where('comentarios', array('id' => $id));
        return $query->row_array();
    }

    public function set_comentarios($image_data = NULL){
        $data = array(
            'usuario' => $this->input->post('usuario'),
            'witte' => $this->input->post('witte'),
            'texto' => $this->input->post('texto'),
            'fecha' => $this->input->post('fecha')
        );

        return $this->db->insert('comentarios', $data);
    }

    public function update_comentarios($id = FALSE, $image_data = NULL){
        $data = array(
            'usuario' => $this->input->post('usuario'),
            'witte' => $this->input->post('witte'),
            'texto' => $this->input->post('texto'),
            'fecha' => $this->input->post('fecha')
        );

        $this->db->where('id', $this->input->post('id'));
        return $this->db->update('comentarios', $data);
    }

    public function delete_comentarios($id = FALSE){
        $query = array('msg' => 'error');
        if ($id){
            return $query = $this->db->delete('comentarios', array('id' => $id));
        }
        return $query;
    }
}