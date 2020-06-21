<?php 
class User_model extends CI_Model {

   /* Fetch user details base on the email address */
   public function get_user_details_by_mail($user_email) {
      $this->db->where(['email'=>$user_email]);      
      $query = $this->db->get('user');     
      if($this->db->affected_rows() > 0){
           return  $query->row();
      }
    }


    public function set_user_password($user_id,$password){      
      $this->db->where(['id'=>$user_id]);
      $result = $this->db->update("user",array("password"=> md5($password)));
      if($this->db->affected_rows() > 0){
           return  $result;
      }     
    }
      
}

