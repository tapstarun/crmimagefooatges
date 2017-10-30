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
	if(isset($data->stateName)){
		$response["cities"] 	= 	$cf->getCitiesDatausingState($data);
	}else{
		$response["cities"] 	= 	'';
	}
	
	echo json_encode($response);
}
?>