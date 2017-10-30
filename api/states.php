<?php
require_once 'include/CommonFunctions.php';
        
class States_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }
		function getStateName($input){
			$stmt=$this->conn->prepare("Select state from states where state='".$input->stateID."'");
		
		if($stmt->execute()){
				$result = $this->fetchArray($stmt);
				return $result; 
			}else{
				return NULL;
			}
		}
} 

$cf = new States_Functions($data);
/* print_r($data);die; */
if($task=="list"){
	$response["error"] 		= 	FALSE;
	$response["error_msg"] 	= 	"";
	if($data->opertion=="All State"){
	$response["states"] 	= 	$cf->getStatesData($data);
	}
	else if($data->opertion=="Particular State"){
	$response["states"] 	= 	$cf->getStateName($data);
	}
	echo json_encode($response);
}
?>