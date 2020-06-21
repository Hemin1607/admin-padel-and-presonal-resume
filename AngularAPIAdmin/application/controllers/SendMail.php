<?php
require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/JWT.php';
use \Firebase\JWT\JWT;

class SendMail extends REST_Controller {

	
	public function __construct() {
		parent::__construct();
		$this->load->helper('check_token');				
		$this->load->model('user_model');	
	}
	
	public function send_reset_link_post(){
		$user_email = $this->post('user_email');
		$site_url =  $this->post('site_url');
		/* messages*/
		$invalid   = ['status' => "false","statuscode"=> 404,'response' =>"Invalid request"];		
		$email_err = ['status' => "false","statuscode"=> 404,'response' =>"Email not found"];
		$success   = ['status' => "true","statuscode" => 200,'response' =>"Reset link sent"];
		$failed    = ['status' => "false","statuscode"=> 500,'response' =>"Failed"];

		/* Fetch user details base on the email address */
		$userData = $this->user_model->get_user_details_by_mail($user_email);

		if(!empty($userData)){
			$email_arr = array(
						'reset_link' => $site_url."/reset-password?id=".base64_encode($userData->id),
						'customer_name' => $userData->firstname." ".$userData->lastname
						);
			$email_status = send_reset_link('forgot_password',$userData->email,$email_arr);
			if($email_status = true){
					$this->response($success, REST_Controller::HTTP_OK);
			}else{
				$this->response($failed, REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
			}
		}else{
			$this->response($email_err, REST_Controller::HTTP_NOT_FOUND);
		}
		
	}


/* system will set new password base on user requirement */
	public function set_reset_password_post(){
		$user_id = base64_decode($this->post('user_id'));
		$new_password =  $this->post('npassword');
		/* messages*/
		$invalid   = ['status' => "false","statuscode"=> 404,'response' =>"Invalid request"];		
		$email_err = ['status' => "false","statuscode"=> 404,'response' =>"Email not found"];
		$success   = ['status' => "true","statuscode" => 200,'response' =>"Password updated successfully"];
		$failed    = ['status' => "false","statuscode"=> 500,'response' =>"Failed"];

		
		if(isset($user_id) && isset($new_password)) {
			$status = $this->user_model->set_user_password($user_id,$new_password);
			//echo $status; die;
			if($status) {				
				$this->set_response($success, REST_Controller::HTTP_OK);
			}else{
				$this->response($failed, REST_Controller::HTTP_INTERNAL_SERVER_ERROR);
			}
		}else{
			$this->set_response($invalid, REST_Controller::HTTP_NOT_FOUND);
		}

	}

}