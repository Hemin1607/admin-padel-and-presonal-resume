<?php

class AUTHORIZATION

{

    public static function validateToken($userID,$postToken)

    {

        $CI =& get_instance();

        $CI->load->model('token_model');

        //return $CI->token_model->get_token();

        $validToken = $CI->token_model->get_token($userID,$postToken);

        //echo $validToken; die;

        if($validToken === $postToken){

            return 'valid';

        }else{

            return 'invalid';

        }        

    }



    /*public static function validateToken()

    {

        $CI =& get_instance();

        $CI->load->model('token_model');

        return $CI->token_model->get_token();

        

    }*/



    /*public static function generateToken($data)

    {

        $CI =& get_instance();

        return JWT::encode($data, $CI->config->item('jwt_key'));

    }*/



}