<?php
require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/JWT.php';
use \Firebase\JWT\JWT;

class GalleryImage extends REST_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->helper('check_token');		
		$this->load->model('GalleryImage_modal');		
		$this->load->model("Mdl_common");
	}
	
	public function index_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email is missing or empty';
		$user_id = $this->post('user_id');
		
		$Insert_Array = array(
			"`title`" => $this->post('title'),
			"`user_id`" => $user_id,
		);
		if($_FILES){
            $res = $this->Mdl_common->uploadFile('img_front','img','profile', time().$_FILES['img_front']['name']);
            if($res['success']){
            	$Insert_Array['`profilepic`'] = $res['path'];
            	$headers = $this->input->request_headers();
				$token_status = check_token($user_id,$headers['Authorization']);
				
				if($token_status == TRUE){
					$Insert_saveUser_Result = $this->GalleryImage_modal->saveIamge($Insert_Array,$user_id);
					if($Insert_saveUser_Result > 0){
						$data = [
							"date" => date('Y-m-d'),
							"id'"   => $Insert_saveUser_Result
						];
						$Pass_Data["data"][] = $data;
						$inserted = ['status' => "true","statuscode" => 200,'response' => $Pass_Data];
						$this->set_response($Pass_Data, REST_Controller::HTTP_OK);
					}else{
						$not_inserted = ['status' => "true","statuscode" => 200,'response' =>"User not Inserted"];
						$this->set_response($not_inserted, REST_Controller::HTTP_OK);
					}
				}else if($token_status == FALSE){
					$this->set_response($invalid, REST_Controller::HTTP_NON_AUTHORITATIVE_INFORMATION);
				}else{
					$this->set_response($not_found, REST_Controller::HTTP_NOT_FOUND);
				}
            }else{
            	$parameter_required_array = ['status' => "true","statuscode" => 404,'response' => "Somthing wrong in image upload..!"];
				$this->set_response($parameter_required_array, REST_Controller::HTTP_NOT_FOUND);
            }
           
        }else{
        	$parameter_required_array = ['status' => "true","statuscode" => 404,'response' => "Select Iamge"];
				$this->set_response($parameter_required_array, REST_Controller::HTTP_NOT_FOUND);
        }
		
	}
	public function getData_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email is missing or empty';
		$user_id = $this->post('user_id');	
		$headers = $this->input->request_headers();
		$token_status = check_token($user_id,$headers['Authorization']);
		if($token_status == TRUE){
			$Check_Availability_Result = $this->GalleryImage_modal->getAllImage($user_id);
			if($Check_Availability_Result){
				$Pass_Data["data"] = $Check_Availability_Result;
				$this->set_response($Pass_Data, REST_Controller::HTTP_OK);
			}else{
				$not_available = ['status' => "true","statuscode" => 200,'response' =>"data not exist"];
				$this->set_response($not_available, REST_Controller::HTTP_OK);
			}
		}else if($token_status == FALSE){
			$this->set_response($invalid, REST_Controller::HTTP_NON_AUTHORITATIVE_INFORMATION);
		}else{
			$this->set_response($not_found, REST_Controller::HTTP_NOT_FOUND);
		}
	}
	public function deleteIamge_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email is missing or empty';
		$img_id = $this->post('img_id');	
		$user_id = $this->post('user_id');	
		$file = $this->post('img_name');
		$headers = $this->input->request_headers();
		$token_status = check_token($user_id,$headers['Authorization']);
		if($token_status == TRUE){
			$Check_Availability_Result = $this->GalleryImage_modal->deleteIamge($img_id);
			if($Check_Availability_Result){
				if (unlink($file)) {
				  $Pass_Data["data"] = $Check_Availability_Result;
					$this->set_response($Pass_Data, REST_Controller::HTTP_OK);
				} else {
				    $Pass_Data["data"] = $Check_Availability_Result;
					$this->set_response($Pass_Data, REST_Controller::HTTP_OK);

				}
				
			}else{
				$not_available = ['status' => "true","statuscode" => 200,'response' =>"data not exist"];
				$this->set_response($not_available, REST_Controller::HTTP_OK);
			}
		}else if($token_status == FALSE){
			$this->set_response($invalid, REST_Controller::HTTP_NON_AUTHORITATIVE_INFORMATION);
		}else{
			$this->set_response($not_found, REST_Controller::HTTP_NOT_FOUND);
		}
	}

}