<?php
require_once 'include/CommonFunctions.php';
        
class SearchUsers_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data){
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	




	/**
		* get CRM members
	*/
	function getUsers($input_data) { 
		$where ="user_type='buyer'";
		
		if(isset($input_data->created_date) && isset($input_data->from_date)){
			$where .=" and created between '$input_data->created_date%'  and '$input_data->from_date%'";
		}else{
			
		}

		if(isset($input_data->id)){
			$where .=" and id = '$input_data->id'";
		}		
		
		if(isset($input_data->email)){
			$where .=" and email = '$input_data->email'";
		}		
		
		if(isset($input_data->type)){
			if($input_data->type!="ADMIN" && isset($input_data->state)){
				$where .=" and state ='$input_data->state' ";
			}
			
			
		}
		
		$stmt = $this->conn->prepare("SELECT *   FROM `users`  where $where order by id desc ");

//print_r("SELECT *   FROM `users`  where $where order by id desc ");die;
		if ($stmt->execute()) {				
			$result = $this->fetchArray($stmt);
			return $result;				
		}
		else
		{
			return NULL;
		}
	}
	/**
		* get CRM member Grid Data
	*/
	function getGridData($data=null){
		
		$result_data		=	$this->getUsers($data);
		$response["error"] 	= 	FALSE;
		$response["data"] 	= 	$result_data;
		echo json_encode($response);
	}

}
 
$obj = new SearchUsers_Functions($data);

if($task=="list"){


	
	$obj->getGridData($data);	
}
?>