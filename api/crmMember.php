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
				$stmt = $this->conn->prepare("DELETE FROM admins WHERE id=".$input_data->id."
					");
			}			
			
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
			
			$AuthorisedData="type='$input_data->type'";
			
			if(isset($input_data->add_crm_user)){
				$AuthorisedData .=",add_crm_user=$input_data->add_crm_user ";
			}		
			if(isset($input_data->add_products)){
				$AuthorisedData .=",add_products=$input_data->add_products ";
			}		
			if(isset($input_data->transaction)){
				$AuthorisedData .=",transaction=$input_data->transaction ";
			}		
			if(isset($input_data->abandond_cart_list)){
				$AuthorisedData .=",abandond_cart_list=$input_data->abandond_cart_list ";
			}	
			if(isset($input_data->advance_member_search)){
				$AuthorisedData .=",advance_member_search=$input_data->advance_member_search ";
			}		

			if(isset($input_data->search_client_information)){
				$AuthorisedData .=",search_client_information=$input_data->search_client_information";
			}		
			if(isset($input_data->transaction_search)){
				$AuthorisedData .=",transaction_search=$input_data->transaction_search";
			}		
			if(isset($input_data->sale_n_transactions)){
				$AuthorisedData .=",sale_n_transactions=$input_data->sale_n_transactions ";
			}		
			if(isset($input_data->performa_invoice_search)){
				$AuthorisedData .=",performa_invoice_search=$input_data->performa_invoice_search";
			}	
			if(isset($input_data->recent_cancelled_transaction)){
				$AuthorisedData .=",recent_cancelled_transaction=$input_data->recent_cancelled_transaction ";
			}		

			if(isset($input_data->download_facility)){
				$AuthorisedData .=",download_facility=$input_data->download_facility ";
			}		
			if(isset($input_data->download_on_behalf)){
				$AuthorisedData .=",download_on_behalf=$input_data->download_on_behalf ";
			}		
			if(isset($input_data->low_remaning_credit)){
				$AuthorisedData .=",low_remaning_credit=$input_data->low_remaning_credit";
			}	
			if(isset($input_data->daily_tasks)){
				$AuthorisedData .=",daily_tasks=$input_data->daily_tasks ";
			}	
			if(isset($input_data->add_potential_user)){
				$AuthorisedData .=",add_potential_user=$input_data->add_potential_user ";
			} 		

			if(isset($input_data->clientResigestred_list)){
				$AuthorisedData .=",clientResigestred_list=$input_data->clientResigestred_list ";
			} 
			
			if(isset($input_data->id) && $input_data->id>0){
				
				
			
			$passwordString		=	"";
				if($input_data->password){
					if(isset($input_data->password)){
						$passwordString = 	",password = '".md5(base64_decode($input_data->password))."'";
					}
				}
				$stmt = $this->conn->prepare("UPDATE admins SET username='".$input_data->username."',firstname='".$input_data->firstname."',lastname='".$input_data->lastname."', email='".$input_data->email."' ,state='$input_data->state',country='$input_data->country', $AuthorisedData WHERE id=".$input_data->id."
					");
			}
			else{
					$stmt = $this->conn->prepare("INSERT INTO admins  Set username='$input_data->username',password='".md5(base64_decode($input_data->password))."',firstname='$input_data->firstname',lastname='$input_data->lastname',email='$input_data->email',status=1,state='$input_data->state',country='$input_data->country',$AuthorisedData ");				
			}			
	//	print_r("INSERT INTO admins  Set username='$input_data->username',password='".md5(base64_decode($input_data->password))."',firstname='$input_data->firstname',lastname='$input_data->lastname',email='$input_data->email',status=1,state='$input_data->state',$AuthorisedData ");die;
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

			$stmt = $this->conn->prepare("Select * from admins where id=".$id);

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
	
	if(isset($data->id) && $data->operationType!="getUsernameEmail"){

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
		if($data->operationType=="getUsernameEmail"){
			
			if(!isset($data->id)){
				$data->id = null; 
			}

			$result_data=$obj->isUserExistedByUsername($data->checkParam,$data->id);
			
			$response["error"] = FALSE;
			
			if($result_data==1){
				$response["data"] = false;	
			}
			else{
				$response["data"] = true;	
			}			
			echo json_encode($response);
		}
		else
		{
				
		if($data->operationType=="set"){
		
				$result_data=$obj->addUpdateUser($data);
			}
			$obj->getGridData($data=null);	
		}
	}	
}
?>