<?php 
class CoverImage_modal extends CI_Model {
	
	/* Insert User */
	public function saveIamge($Insert_Array,$id){
		
		if($id == ""){
			$result = $this->db->insert("`coverimage`",$Insert_Array);
		    return $this->db->insert_id();
		}else{
			$this->db->where('id',$id);
			$result = $this->db->update("`coverimage`",$Insert_Array);
			return $result;
		}
		
	}

	public function getAllImage(){
		$result = $this->db->get("`coverimage`");
		return $result->result_array();;
	}

	public function deleteIamge($imageId){
		$data_Delete = array(
			"`id`" => $imageId,
		);
		$result = $this->db->delete("`coverimage`",$data_Delete);
		return $result;
	}

}