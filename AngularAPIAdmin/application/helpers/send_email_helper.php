<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*common setting*/
function email_array(){
	$ci = get_instance();
	$config['protocol']   = $ci->config->item('protocol');
	$config['smtp_host']  = $ci->config->item('smtp_host');
	$config['smtp_port']  = $ci->config->item('smtp_port');
	$config['smtp_user']  = $ci->config->item('smtp_user');  
	$config['smtp_pass']  = $ci->config->item('smtp_pass');  
	$config['charset']    = $ci->config->item('charset');
	$config['mailtype']   = $ci->config->item('mailtype');
	$config['newline']    = $ci->config->item('newline');
	return $config;
}

/*forgot password email*/

function send_reset_link($type,$email,$data){
	$ci = get_instance();
	$ci->load->library('email');	
	$ci->load->database();
	$query = $ci->db->get_where('email_template',array('type'=>$type));
	if($query->num_rows() > 0){
		$result = $query->row_array();
		$array = array('{fullname}','{reset_link}');
		$replace = array($data['customer_name'],$data['reset_link']);
		$final = str_replace($array,$replace,$result['message_body']);
		//$final = $result["message_body"]."\n".$data["reset_link"];		
		$ci->email->initialize(email_array());					
		$ci->email->from('christo@crispworks.co.za', 'She Excellence App');
		$ci->email->to($email);
		$ci->email->subject($result['subject']);
		$ci->email->message($final);
		$ci->email->send();	
		return true;			          
	}else{
		return false;	
	}	
}


/*function send_otp($type,$email,$data){
	$ci = get_instance();
	$ci->load->library('email');	
	$ci->load->database();
	$query = $ci->db->get_where('tbl_email_template',array('type'=>$type));
	if($query->num_rows() > 0){
		$result = $query->row_array();
		$array = array('{fullname}','{user_email}','{otp}');
		$replace = array($data['customer_name'],$data['email'],$data['otp']);
		$final = str_replace($array,$replace,$result['message_body']);
		$ci->email->initialize(email_array());					
		$ci->email->from('admin@catalog.com', 'Catalog App');
		$ci->email->to($email);
		$ci->email->subject($result['subject']);
		$ci->email->message($final);
		$ci->email->send();			           
	}else{

	}
}*/
