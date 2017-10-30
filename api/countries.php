<?php
require_once 'include/CommonFunctions.php';
        
class Countries_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }		
} 

$cf = new Countries_Functions($data);

if($task=="list"){
	$response["error"] 		= 	FALSE;
	$response["error_msg"] 	= 	"";
	$response["countries"] 	= 	$cf->getCountriesData();
	echo json_encode($response);
}
?>