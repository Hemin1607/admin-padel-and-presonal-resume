<?php
require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/JWT.php';
use \Firebase\JWT\JWT;

class Education extends REST_Controller {	
	public function __construct() {
		parent::__construct();
		$this->load->helper('check_token');		
		$this->load->model('Education_modal');		
		$this->load->model("Mdl_common");
	}
	
	public function index_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email is missing or empty';
		$user_id = $this->post('user_id');
		$email = $this->post('email');
		$Insert_Array = array(
			"`user_id`" => $this->post('user_id'),
			"`educationarray`" => $this->post('insertArray')
		);
		
		if(true){
			$headers = $this->input->request_headers();
			$token_status = check_token($user_id,$headers['Authorization']);
			
			if($token_status == TRUE){
				$Check_Availability_Result = $this->Education_modal->Check_Education_Availability($user_id);
				if($Check_Availability_Result){
					$Insert_saveUser_Result = $this->Education_modal->Update_Education($Insert_Array,$user_id);
					
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
				}else{
					$Insert_saveUser_Result = $this->Education_modal->Insert_Education($Insert_Array,$user_id);
					
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
				}
				
			}else if($token_status == FALSE){
				$this->set_response($invalid, REST_Controller::HTTP_NON_AUTHORITATIVE_INFORMATION);
			}else{
				$this->set_response($not_found, REST_Controller::HTTP_NOT_FOUND);
			}
		}else{
			$parameter_required_array = ['status' => "true","statuscode" => 404,'response' => $message];
			$this->set_response($parameter_required_array, REST_Controller::HTTP_NOT_FOUND);
		}
	}
	public function getEducation_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email is missing or empty';
		$user_id = $this->post('user_id');	
		$headers = $this->input->request_headers();
		$token_status = check_token($user_id,$headers['Authorization']);
		if($token_status == TRUE){
			$Check_Availability_Result = $this->Education_modal->educationData($user_id);
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

}