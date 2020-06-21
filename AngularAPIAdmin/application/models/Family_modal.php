<?php 
class Family_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_Skills($Insert_Array){

		$result = $this->db->insert("`family`",$Insert_Array);
		return $this->db->insert_id();
	}
	public function Update_Skills($Insert_Array,$id){
		$this->db->where('user_id', $id);
		$result = $this->db->update("`family`",$Insert_Array);
		return $result;
	}
	public function Check_Skills_Availability($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`family`")->num_rows();
		return $result;
	}


	public function workSkillsData($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`family`");
		return $result->row();
	}
}