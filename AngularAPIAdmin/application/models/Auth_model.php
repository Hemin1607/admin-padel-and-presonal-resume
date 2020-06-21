<?php 
class Auth_model extends CI_Model {

   /*check user login*/

    public function user_login($username,$password) {
	    $this->db->where(['email'=>$username,'password'=>md5($password)]);      
	    $query = $this->db->get('userprofile');	   
	    if($this->db->affected_rows() > 0){
	         return  $query->row();
	    }
    }

    /*log session data*/

    public function session_log($data){

        $this->db->insert('ci_sessions',$data);

    }


	/* That function will check on each & every request of the API*/

    public function check_token($userID,$token){

       $this->db->where('token',$token);

       $this->db->where('user_id',$userID);

       $res = $this->db->get('ci_sessions');

       if($this->db->affected_rows() > 0) {

        return TRUE;

      } 

    } 
   
}

