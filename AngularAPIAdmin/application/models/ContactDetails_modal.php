<?php 
class ContactDetails_modal extends CI_Model {
	
	/* Insert User */
	public function Insert_ContactDetails($Insert_Array){
		$result = $this->db->insert("`contactdetails`",$Insert_Array);
		return $this->db->insert_id();
	}
	
}