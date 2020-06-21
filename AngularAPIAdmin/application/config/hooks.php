<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| Hooks
| -------------------------------------------------------------------------
| This file lets you define "hooks" to extend CI without hacking the core
| files.  Please see the user guide for info:
|
|	https://codeigniter.com/user_guide/general/hooks.html
|
*/

/* It is pre controller hook and it will be used to identify that your token is 
valid or not */

$hook['pre_controller'] = array(  
            'class' => 'Verify_token',  
            'function' => 'get_token_status',  
            'filename' => 'Verify_token.php',  
            'filepath' => 'hooks',  
            'params' => array('element1', 'element2', 'element3')  
            );  


#We have did setup of the JWT and REST Server with codeigniter latest version
#TokenGenerated method done using JWL Library and REST Library
#Token will be generated while login process
#Token related information will be stored in ci_sessions table
#Need to develop hooks for the pre-controller 
#We have defined separate config file in the CI structure
#Token will be verify base on the user_id & token 
