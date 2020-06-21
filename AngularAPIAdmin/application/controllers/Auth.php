<?php
require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/JWT.php';
use \Firebase\JWT\JWT;


class Auth extends REST_Controller {


	public function __construct() {
		parent::__construct();
		$this->load->model('auth_model');
		$this->load->model('Performance_modal');
		$this->load->helper('check_token');				
	}

	
	/* User can login into the application using auth token */
	public function user_login_post(){
		$username = $this->post('email');
		$password = $this->post('password');
		$invalid_credentials = ['status' => "false","statuscode"=> 404,'response' =>"Invalid username and password"];
		
		if(isset($username) && isset($password)) {
			$user = $this->auth_model->user_login($username,$password);
			if($user) {
				$token['id'] = $user->id;
				$token['username'] = $user->email;
				$date = new DateTime();
				$token['iat'] = $date->getTimestamp();
				$token['exp'] = $date->getTimestamp() + 60*60*5;
				$user_arr = array(
					'id'       => $user->id,
					'email'    		=> $user->email,		
					'firstname'     => $user->name,				
					'lastname'      => $user->lastname,			
									
					'token'         => JWT::encode($token, $this->config->item('jwt_key'))
				); 

				/* You can change token key from the following file 
				excellence-api\application\config
				filename: jwt.php*/

				/* store session info and token info to ci_session */         
				$ci_session = array(                
					'ip_address'=> $_SERVER['REMOTE_ADDR'],
					'id' => bin2hex(openssl_random_pseudo_bytes(8)),
					'token' => $user_arr['token'],
					'user_id'      => $user->id,
				);

				/* It will be final array after successfully logged */
				$this->auth_model->session_log($ci_session);
				
				$success = ['status' => "true","statuscode" => 200,'response' =>$user_arr];
				$this->set_response($success, REST_Controller::HTTP_OK);
			}else {
				$this->response($invalid_credentials, REST_Controller::HTTP_NOT_FOUND);
			}
		}
	}
	/*public function sendMail_post(){
		return $this->auth_model->sendMail();
	}*/
	/* For Clone */
	public function my_clone_post(){
		$valid = ['status' => "true","statuscode" => 200,'response' =>"Valid token"];
		$invalid = ['status' => "true","statuscode" => 203,'response' =>"In-Valid token"];
		$not_found = ['status' => "true","statuscode" => 404,'response' =>"Token not found"];
		$headers = $this->input->request_headers();
		$token_status = check_token("35",$headers['Authorization']);

	  if($token_status == TRUE) {
			$this->set_response($valid, REST_Controller::HTTP_OK);
		}else if($token_status == FALSE){
			$this->set_response($invalid, REST_Controller::HTTP_NON_AUTHORITATIVE_INFORMATION);
		}else{
			$this->set_response($not_found, REST_Controller::HTTP_NOT_FOUND);
		}
	}

}
