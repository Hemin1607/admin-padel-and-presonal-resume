<?php 
class SaveUser_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_User($Insert_Array){
		$result = $this->db->insert("`userprofile`",$Insert_Array);
		return $this->db->insert_id();
	}
	public function Update_User($Insert_Array,$id){
		$this->db->where('id', $id);
		$result = $this->db->update("`userprofile`",$Insert_Array);
		return $result;
	}
	public function sendMail($emaila,$subject,$messages){
		$config = Array(
			'protocol' => 'smtp',
			'smtp_host' => 'smtp.she-excellence.co.za',
			'smtp_port' => 587,
			'smtp_user' => 'noreply@she-excellence.co.za',
			'smtp_pass' => 'Crispworks123!',
			'smtp_timeout' => '4',
			'mailtype'  => 'html',
			'charset'   => 'iso-8859-1'
		);
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");
		$from_email = "noreply@she-excellence.co.za";
		$this->email->from($from_email, '4Xcellence Solutions');
		$this->email->to($emaila);
		$this->email->subject($subject);
		$message = $messages;
		$this->email->message($message);
		$this->email->send();
	}
  public function Update_InviteStatus($id){  
	$this->db->where('id', $id);
	if($this->db->update('userprofile', array('isexpiry' => 1))){
		return true;
	}else{
		return false;
	}
  } 
  public function GetExpiredStatus($id){
    $this->db->select('isexpiry');
    $this->db->where('id', $id);
    $query = $this->db->get('userprofile');
    $query = $query->row();
    return $query->isexpiry;
  }
  public function Check_User_Availability($email='',$id='')
  {
  	$this->db->where("`email`",$email);
  	$this->db->where('id =', $id);
	$result = $this->db->get("`userprofile`")->num_rows();
	return $result;
  }

  public function userData($id='')
  {
  	$this->db->where('id =', $id);
	$result = $this->db->get("`userprofile`");
	return $result->row();
  }
}