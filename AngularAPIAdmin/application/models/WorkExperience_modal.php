<?php 
class WorkExperience_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_WorkExperience($Insert_Array){
		$result = $this->db->insert("`workexperience`",$Insert_Array);
		return $this->db->insert_id();
	}
	public function Update_WorkExperience($Insert_Array,$id){
		$this->db->where('user_id', $id);
		$result = $this->db->update("`workexperience`",$Insert_Array);
		return $result;
	}
	public function Check_WorkExperience_Availability($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`workexperience`")->num_rows();
		return $result;
	}


	public function workExperienceData($id='')
	{
	  	$this->db->where('user_id =', $id);
		$result = $this->db->get("`workexperience`");
		return $result->row();
	}
}