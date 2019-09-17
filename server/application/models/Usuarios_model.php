<?php
class Usuarios_model extends CI_Model {
    public function __construct(){
        $this->load->database();
    }

    public function get_usuarios($id = FALSE){
        if ($id === FALSE){
            $query = $this->db->get('usuarios');
            return $query->result_array();
        }

        $query = $this->db->get_where('usuarios', array('id' => $id));
        return $query->row_array();
    }

    public function set_usuarios($usuario = NULL, $image_data = NULL){
        if($usuario){
            $data = array(
                'imagen' => $usuario['imagen'],
                'correo' => $usuario['correo'],
                'contrasena' => $usuario['contrasena'],
                'nombre' => $usuario['nombre']
            );

            return $this->db->insert('usuarios', $data);
        } else {
            return FALSE;
        }
    }

    public function update_usuarios($usuario = FALSE, $image_data = NULL){
        if($usuario){
            $data = array(
                'imagen' => $usuario['imagen'],
                'correo' => $usuario['correo'],
                'contrasena' => $usuario['contrasena'],
                'nombre' => $usuario['nombre']
            );

            $this->db->where('id', $usuario['id']);
            return $this->db->update('usuarios', $data);
        } else {
            return FALSE;
        }
    }

    public function delete_usuarios($id = FALSE){
        $query = FALSE;
        if ($id){
            return $query = $this->db->delete('usuarios', array('id' => $id));
        }
        return $query;
    }
}