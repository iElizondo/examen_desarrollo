<?php
class News_model extends CI_Model {
    public function __construct(){
        $this->load->database();
    }

    public function get_wittes($id = FALSE){
        if ($id === FALSE){
            $query = $this->db->get('wittes');
            return $query->result_array();
        }

        $query = $this->db->get_where('wittes', array('id' => $id));
        return $query->row_array();
    }

    public function set_wittes($image_data = NULL){
        $data = array(
            'usuario' => $this->input->post('usuario'),
            'texto' => $this->input->post('texto'),
            'fecha' => $this->input->post('fecha')
        );

        return $this->db->insert('wittes', $data);
    }

    public function update_wittes($id = FALSE, $image_data = NULL){
        $data = array(
            'usuario' => $this->input->post('usuario'),
            'texto' => $this->input->post('texto'),
            'fecha' => $this->input->post('fecha')
        );

        $this->db->where('id', $this->input->post('id'));
        return $this->db->update('wittes', $data);
    }

    public function delete_wittes($id = FALSE){
        $query = array('msg' => 'error');
        if ($id){
            return $query = $this->db->delete('wittes', array('id' => $id));
        }
        return $query;
    }
}