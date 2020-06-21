<?php 
class Education_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_Education($Insert_Array){
		$result = $this->db->insert("`education`",$Insert_Array);
		return $this->db->insert_id();
	}
	public function Update_Education($Insert_Array,$id){
		$this->db->where('user_id', $id);
		$result = $this->db->update("`education`",$Insert_Array);
		return $result;
	}
	public function Check_Education_Availability($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`education`")->num_rows();
		return $result;
	}


	public function educationData($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`education`");
		return $result->row();
	}
}