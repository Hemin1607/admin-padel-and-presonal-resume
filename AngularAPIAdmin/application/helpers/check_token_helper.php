<?php

require_once APPPATH . '/libraries/REST_Controller.php';

require_once APPPATH . '/libraries/JWT.php';

use \Firebase\JWT\JWT;


function check_token($userID,$token){

	$ci = get_instance();

	$ci->load->model('auth_model');

	$ci->load->database();

	if(isset($token)) {

		$check_token = $ci->auth_model->check_token($userID,$token);
		

		if($check_token == TRUE) {			

			return 1;

		} else {			

			echo "invalid token";

		}

	} else {

		echo "token not found";

	}

}





function invalid_token(){

	$ci = get_instance();

	$invalid_token = ['status' => "false","statuscode"=> 404,'response' =>"Invalid token"];

	$ci->response($invalid_token, REST_Controller::HTTP_NOT_FOUND);

}





function time_elapsed($datetime, $full = false) {

	$now = new DateTime;

	$ago = new DateTime($datetime);

	$diff = $now->diff($ago);



	$diff->w = floor($diff->d / 7);

	$diff->d -= $diff->w * 7;



	$string = array(

		'y' => 'year',

		'm' => 'month',

		'w' => 'week',

		'd' => 'day',

		'h' => 'hour',

		'i' => 'minute',

		's' => 'second',

		);

	foreach ($string as $k => &$v) {

		if ($diff->$k) {

			$v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');

		} else {

			unset($string[$k]);

		}

	}



	if (!$full) $string = array_slice($string, 0, 1);

	return $string ? implode(', ', $string) . ' ago' : 'just now';

}



?>