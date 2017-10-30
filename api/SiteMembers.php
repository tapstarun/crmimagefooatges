<?php
require_once 'include/CommonFunctions.php';
        
class SiteMembers_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data){
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	

	/**
		* add/edit CRM members
	*/
	function addUpdateSiteUser($input_data) { 
			
			$AuthorisedData="user_type='$input_data->user_type'";
			
			if($input_data->business_type){
				$AuthorisedData .=",business_type='$input_data->business_type'";
			}		
			if($input_data->phone){
				$AuthorisedData .=",phone='$input_data->phone' ";
			}		
			if($input_data->mobile){
				$AuthorisedData .=",mobile='$input_data->mobile'";
			}		
			if($input_data->zipcode){
				$AuthorisedData .=",zipcode='$input_data->zipcode'";
			}	
			if($input_data->company){
				$AuthorisedData .=",company='$input_data->company'";
			}	
		

			
/* 			if(isset($input_data->id) && $input_data->id>0){ */
				
				
			

				$stmt = $this->conn->prepare("UPDATE users SET firstname='".$input_data->firstname."',lastname='".$input_data->lastname."',address='".$input_data->address."',newsletter='$input_data->newsletter', $AuthorisedData WHERE id=".$input_data->id."
					");
/* 				}
		else{
					$stmt = $this->conn->prepare("INSERT INTO admins  Set username='$input_data->username',password='".md5(base64_decode($input_data->password))."',firstname='$input_data->firstname',lastname='$input_data->lastname',email='$input_data->email',status=1,state='$input_data->state',$AuthorisedData ");				
			} */			
		//print_r("INSERT INTO admins  Set username='$input_data->username',password='".md5(base64_decode($input_data->password))."',firstname='$input_data->firstname',lastname='$input_data->lastname',email='$input_data->email',status=1,states='$input_data->state',type='$input_data->type' ,$AuthorisedData ");
			if ($stmt->execute()) {
				$stmt->close();
				
			}
			else
			{
				return NULL;
			}
	}

	/**
		* get CRM members
	*/
	function getUsers() { 
			
		$stmt = $this->conn->prepare("Select id,username,firstname,lastname,email,status,type from admins order by id desc");

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
		
		$result_data		=	$this->getUsers();
		$response["error"] 	= 	FALSE;
		$response["data"] 	= 	$result_data;
		echo json_encode($response);
	}
	/**
		* get CRM member individual information
	*/	
	function getUserInformation($id) { 
			
			$where = "";

			$stmt = $this->conn->prepare("Select * from users where id=".$id);

			if ($stmt->execute()) {				
				$result = $this->fetchArray($stmt);
				return $result;				
			}
			else
			{
				return NULL;
			}
	}
}
 
$obj = new SiteMembers_Functions($data);

if($task=="list"){
	
	if($data->operationType=="getUserData"){

			$result_data=$obj->getUserInformation($data->userId);
			$response["error"] = FALSE;
			$response["data"] = $result_data;
			echo json_encode($response);	
	}				
	else
	{
			if($data->operationType=="updateUser")
			{

				$result_data=$obj->addUpdateSiteUser($data);
				$response["error"] = FALSE;
				$response["data"] = $result_data;
				echo json_encode($response);	
			}	

	}	
}
?>