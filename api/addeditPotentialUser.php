<?php
require_once 'include/CommonFunctions.php';
        
class CrmMembers_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data){
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Delete CRM members
	*/
	function deleteUser($input_data) { 
			
			if(isset($input_data->id) && $input_data->id>0){
				$stmt = $this->conn->prepare("DELETE FROM potential_users WHERE id=".$input_data->id."");
			}			
		//	print_r("DELETE FROM potential_users WHERE id=".$input_data->id."");die;
			if ($stmt->execute()) {
				$stmt->close();
				
			}
			else
			{
				return NULL;
			}
	}
	/**
		* add/edit CRM members
	*/
	function addUpdateUser($input_data) { 
			
			$AuthorisedData="address='$input_data->address'";
			
			if(isset($input_data->business_type)){
				$AuthorisedData .=",business_type='$input_data->business_type' ";
			}		
			if(isset($input_data->job_title)){
				$AuthorisedData .=",job_title='$input_data->job_title' ";
			}		
			if(isset($input_data->company)){
				$AuthorisedData .=",company='$input_data->company'";
			}	

			if(isset($input_data->phone)){
				$AuthorisedData .=",phone='$input_data->phone' ";
			}		
			if(isset($input_data->mobile)){
				$AuthorisedData .=",mobile='$input_data->mobile' ";
			}		
			if(isset($input_data->zipcode)){
				$AuthorisedData .=",zipcode='$input_data->zipcode'";
			}	
			if(isset($input_data->city)){
				$AuthorisedData .=",city='$input_data->city'";
			}		

			
			if(isset($input_data->id) && $input_data->id>0){
			
				$stmt = $this->conn->prepare("UPDATE potential_users SET firstname='".$input_data->firstname."',lastname='".$input_data->lastname."', email='".$input_data->email."',state='$input_data->state',country='$input_data->country',city='$input_data->city',modified='".date('y-m-d h:i:s')."', $AuthorisedData WHERE id=".$input_data->id."
					");
				//	print_r("UPDATE potential_users SET firstname='".$input_data->firstname."',lastname='".$input_data->lastname."', email='".$input_data->email."',state='$input_data->state',country='$input_data->country',city='$input_data->city',modified='".date('y-m-d h:i:s')."' $AuthorisedData WHERE id=".$input_data->id."");die;
			}
			else{
					$stmt = $this->conn->prepare("insert into potential_users SET firstname='".$input_data->firstname."',lastname='".$input_data->lastname."', email='".$input_data->email."',state='$input_data->state',country='$input_data->country',created='".date('y-m-d h:i:s')."', $AuthorisedData ");
		//print_r("insert into potential_users SET firstname='".$input_data->firstname."',lastname='".$input_data->lastname."', email='".$input_data->email."',state='$input_data->state',country='$input_data->country',city='$input_data->city',created='".date('y-m-d h:i:s')."', $AuthorisedData ");die;
			}			
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
			
		$stmt = $this->conn->prepare("Select * from potential_users order by id desc");

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

			$stmt = $this->conn->prepare("Select * from potential_users where id=".$id);

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
 
$obj = new CrmMembers_Functions($data);

if($task=="list"){

	if(!empty($data->id )){

		if(isset($data->operationType) && $data->operationType=="updateUser"){
			
			$result_data=$obj->addUpdateUser($data);
		$obj->getGridData();	
		}
		else if(isset($data->operationType) && $data->operationType=="deleteUser"){
			$result_data=$obj->deleteUser($data);
			$obj->getGridData();	
		}
		else
		{
		$result_data=$obj->getUserInformation($data->id);
			
			$response["error"] = FALSE;
			$response["data"] = $result_data;
			echo json_encode($response);
		}		
		

		
	}
	else
	{
	
		if($data->operationType=="set")
		{
		
				$result_data=$obj->addUpdateUser($data);
/* 							$response["error"] = FALSE;
			$response["data"] = $result_data;
			echo json_encode($response); */
		}
		
	
			$obj->getGridData($data=null);	
	}
	
}
?>