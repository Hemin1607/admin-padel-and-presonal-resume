<?php 
class Performance_modal extends CI_Model {
	
	/* Get All Category */
	public function All_Category(){
		$this->db->select("`id`,`name`,`byline`,`image`");
		$this->db->from("`category`");
		$query_result = $this->db->get();
		return $query_result->result();
	}
	
	/* Get All Desired By Element_ID */
	public function Get_Desired_by_Element_ID($Element_ID){
		$where_Array = array(
			"`element`" => $Element_ID,
		);
		
		$this->db->select("`element`,SUM(`desired`=2) AS `n1`, SUM(`desired`=3) AS `n2`, SUM(`desired`=4) AS `n3`, COUNT(*) AS `total`");
		$this->db->from("`answer_desired`");
		$this->db->where($where_Array);
		$this->db->group_by("`element`");
		$this->db->order_by("`element`", "asc");
		$query_result = $this->db->get();
		return $query_result->result();
	}
	
	/* Get All Elements */
	public function All_Elements(){
		$this->db->select("`id`,`cat`,`name`,`alt_sequence`");
		$this->db->from("`elements`");
		$this->db->order_by("`sequence`", "asc");
		$query_result = $this->db->get();
		return $query_result->result();
	}
	
	/* Get All Proof By Element_ID with Join */
	public function Get_Proof_by_Element_ID_Join($Element_ID){
		$where_Array = array(
			"`m_ap`.`element`" => $Element_ID,
		);
		
		$this->db->select("`m_p`.`id`,`m_p`.`proof`,`m_p`.`type`");
		$this->db->from("`proofs` as `m_p`");
		$this->db->join("`answer_proof` as `m_ap`", "`m_ap`.`proof` = `m_p`.`id`", "INNER");
		$this->db->where($where_Array);
		$query_result = $this->db->get();
		return $query_result->result();
	}
	
	/* Insert Performance MC */
	public function Insert_Performance_MC($Insert_Array){
		$result = $this->db->insert("`performance_mc`",$Insert_Array);
		return $result;
	}
	
	/* Delete Question Function */
	public function deleteQuestion_function($Quetion_ID){
		$data_Delete = array(
			"`id`" => $Quetion_ID,
		);
		$result = $this->db->delete("`questions`",$data_Delete);
		return $result;
	}
}