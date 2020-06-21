<?php 
class SaveQuestion_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_saveQuestion($Insert_Array){
		$result = $this->db->insert("`questions`",$Insert_Array);
		return $this->db->insert_id();
	}
}