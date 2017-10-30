<?php

require_once 'include/CommonFunctions.php';
        
class productDownloadOnBehalf_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Get transactions
	*/
	function getProductDetails($input_data) { 
	 		$where="";
			//print_r($input_data);
			if(!empty($input_data)){
				
				$where.="id = $input_data";
				
			}
			

			
			$stmt = $this->conn->prepare("SELECT product_type,type,subscription_type  FROM products   WHERE  $where");
	        	
			if ($stmt->execute()){
				$result = $this->fetchArray($stmt);
				return $result;	
		//print_r($result);				
			} else {
			
				return NULL;
			}
	}
} 

$Pd = new productDownloadOnBehalf_Functions($data);
//print_r($data->product_id);
if($task=="list"){
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	$response["data"] = $Pd->getProductDetails($data->product_id);
	
	
	echo json_encode($response);
}
?>