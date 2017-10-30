<?php

require_once 'include/CommonFunctions.php';
        
class userPlans extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Get transactions
	*/
	function getData($input_data) { 
	 		$where="";
			
			if(!empty($input_data->userId)){
				
				$where.="user_id =$input_data->userId and status=1 ";
				
			}
			

			
			$stmt = $this->conn->prepare("SELECT * FROM plan_subscriptions WHERE $where");
	       
			if ($stmt->execute()){
				$result = $this->fetchArray($stmt);
				return $result;				
			} else {
				return NULL;
			}
	}
} 

$userPlan = new userPlans($data);

if($task=="list"){
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	$response["data"] = $userPlan->getData($data);
	echo json_encode($response);
}
?>