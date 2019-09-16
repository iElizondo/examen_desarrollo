<?php
class Comentarios_model extends CI_Model {
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

    public function set_comentarios($comentario = FALSE){
        if($comentario){
            $data = array(
                'usuario' => $comentario['usuario'],
                'witte' => $comentario['witte'],
                'texto' => $comentario['texto'],
                'fecha' => $comentario['fecha']
            );

            return $this->db->insert('comentarios', $data);
        } else {
            return FALSE;
        }
    }

    public function update_comentarios($comentario = FALSE){
        if($comentario){
            $data = array(
                'usuario' => $comentario['usuario'],
                'witte' => $comentario['witte'],
                'texto' => $comentario['texto'],
                'fecha' => $comentario['fecha']
            );

            $this->db->where('id', $comentario['id']);
            return $this->db->update('comentarios', $data);
        } else {
            return FALSE;
        }
    }

    public function delete_comentarios($id = FALSE){
        $query = FALSE;
        if ($id){
            return $query = $this->db->delete('comentarios', array('id' => $id));
        }
        return $query;
    }
}