
<?php 
class GalleryImage_modal extends CI_Model {
	
	/* Insert User */
	public function saveIamge($Insert_Array){
		$result = $this->db->insert("`image`",$Insert_Array);
		return $this->db->insert_id();
	}
	public function getAllImage(){
		$result = $this->db->get("`image`");
		return $result->result_array();;
	}

	public function deleteIamge($imageId){
		$data_Delete = array(
			"`id`" => $imageId,
		);
		$result = $this->db->delete("`image`",$data_Delete);
		return $result;
	}

}