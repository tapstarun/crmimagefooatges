<?php
require_once 'include/CommonFunctions.php';
        
class Cities_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }		
} 

$cf = new Cities_Functions($data);

if($task=="list"){
	$response["error"] 		= 	FALSE;
	$response["error_msg"] 	= 	"";
	$response["cities"] 	= 	$cf->getCitiesData($data);
	echo json_encode($response);
}
?>