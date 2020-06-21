<?php
require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/JWT.php';
use \Firebase\JWT\JWT;

class ContactDetails extends REST_Controller {
	
	public function __construct() {
		parent::__construct();
		$this->load->helper('check_token');				
		$this->load->model('ContactDetails_modal');
	}
	
	public function index_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Token Valid"];
		$no_found = ['status' => "true","statuscode" => 200,'response' =>"No Record Found"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$message = 'Required field(s) user_id,email,firstname,lastname,role,password is missing or empty';
		$user_id = $this->post('user_id');
		$email = $this->post('email');
		$subject = $this->post('subject');
		$name = $this->post('name');
		$message = $this->post('message');
		if(true){
			$headers = $this->input->request_headers();
			$token_status = check_token($user_id,$headers['Authorization']);
			if($token_status == TRUE){
				$Insert_Array = array(
					"`email`" => $email,
					"`subject`" => $subject,
					"`name`" => $name,
					"`message`" => $message
				);
				$Insert_saveUser_Result = $this->ContactDetails_modal->Insert_ContactDetails($Insert_Array);
				if($Insert_saveUser_Result > 0){
					$data = [
						"`email`" => $email,
						"`subject`" => $subject,
						"`name`" => $name,
						"`message`" => $message,
						"`id`"    => $Insert_saveUser_Result
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
			$parameter_required_array = ['status' => "true","statuscode" => 404,'response' => $message];
			$this->set_response($parameter_required_array, REST_Controller::HTTP_NOT_FOUND);
		}
	}
}