<?php
class Wittes_model extends CI_Model {
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

    public function found_wittes($termino = FALSE){
        if ($termino === FALSE){
            return FALSE;
        } else {
            $this->db->like('texto', $termino);
            $query = $this->db->get('wittes');
            return $query->row_array();
        }
    }

    public function set_wittes($witte = NULL){
        if($witte){
            $data = array(
                'usuario' => $witte['usuario'],
                'texto' => $witte['texto'],
                'fecha' => $witte['fecha']
            );

            return $this->db->insert('wittes', $data);
        } else {
            return FALSE;
        }
    }

    public function update_wittes($witte = FALSE){
        if($witte){
            $data = array(
                'usuario' => $witte['usuario'],
                'texto' => $witte['texto'],
                'fecha' => $witte['fecha']
            );

            $this->db->where('id', $witte['id']);
            return $this->db->update('wittes', $data);
        } else {
            return FALSE;
        }
    }

    public function delete_wittes($id = FALSE){
        $query = FALSE;
        if ($id){
            return $query = $this->db->delete('wittes', array('id' => $id));
        }
        return $query;
    }
}