<?php
require_once 'include/CommonFunctions.php';
        
class countryWithState_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }
		function getStateName($input){
			$stmt=$this->conn->prepare("Select state from states where id=$input->stateID");
			if($stmt->execute()){
				$result = $this->fetchArray($stmt);
				return $result; 
			}else{
				return NULL;
			}
		}
} 

$cf = new countryWithState_Functions($data);
/* print_r($data);die; */
if($task=="list"){
	$response["error"] 		= 	FALSE;
	$response["error_msg"] 	= 	"";
	
	if($data->opertion=="All Country"){
	$response["country"] 	= 	$cf->getCountriesData();
	}
	else if($data->opertion=="All States"){
		if(isset($data->countryName)){
			$response["states"] 	= 	$cf->getStatesData($data);
		}else{
			$response["states"] 	= 	[];
		}
	}
	else if($data->opertion=="All Cities"){
		if(isset($data->stateName)){
			$response["cities"] 	= 	$cf->getCitiesData($data);
			$response["states"] 	= 	$cf->getStatesData($data);
		}else{
			$response["cities"]=[];
		}
	}
	echo json_encode($response);
}
?>