<?php
require_once 'include/CommonFunctions.php';
        
class aCart_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		 * Get abandoned cart data
	 */
	function getCartData() { 	
	$where="1=1";
		if(isset($data->Opertaion)){
			if($data->Opertaion=="Particular data"){
			$where .=" and u.state= '".$data->state."' ";
			}
		}
 	
	 	$stmt = $this->conn->prepare("SELECT s.id,p.name,s.price,s.size as img_sizes ,if(s.status='','pending',s.status) as status,s.user_id,u.country,if(s.product_type='right_managed','Right Managed','Royality Free') as Product_type,DATE_FORMAT(s.created,'%Y/%m/%d') as created from shopping_carts as s left join users as u on s.user_id=u.id left join products as p on s.product_id=p.id where $where ");	        
//print_r("SELECT s.id,p.name,s.price,s.size as img_sizes ,if(s.status='','pending',s.status) as status,s.user_id,u.country,if(s.product_type='right_managed','Right Managed','Royality Free') as Product_type,DATE_FORMAT(s.created,'%Y/%m/%d') as created from shopping_carts as s left join users as u on s.user_id=u.id left join products as p on s.product_id=p.id where $where ");die;	
	if ($stmt->execute()) {				
			$result = $this->fetchArray($stmt);
			return $result;				
		}
		else
		{
			return NULL;
		}
	}	

	function getCartDatausingCountry($data) { 
		$where = "1=1";
		if(isset($data->country)){
			if($data->country!="" || $data->country!="undefined"){
			$where .=" and u.country= '".$data->country."' ";
			}
		}		
		
		if(isset($data->Opertaion)){
			if($data->Opertaion=="Particular data"){
			$where .=" and u.state= '".$data->state."' ";
			}
		}
		
		if(isset($data->currentstatus)){
			if($data->currentstatus!="" || $data->currentstatus!="undefined"){
				if($data->currentstatus=="pending"){
					$where .=" and (s.status= '".$data->currentstatus."' or s.status= '' )";
				}else{
						$where .=" and (s.status= '".$data->currentstatus."'  )";
				}
		
			}
		}
	
	 	$stmt = $this->conn->prepare("SELECT s.id,p.name,s.price,s.size as img_sizes ,if(s.status='','pending',s.status) as status,s.user_id,u.country,if(s.product_type='right_managed','Right Managed','Royality Free') as Product_type,DATE_FORMAT(s.created,'%Y/%m/%d') as created from shopping_carts as s left join users as u on s.user_id=u.id left join products as p on s.product_id=p.id where $where");	        
//print_r("SELECT id,name,keywords,price,img_sizes,active,product_video,DATE_FORMAT(created,'%Y/%m/%d') as created from products");die;	
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

$tf = new aCart_Functions($data);


if($task=="list"){
		if(isset($data->country) || isset($data->currentstatus)){

				$response["data"] 		= 	$tf->getCartDatausingCountry($data);		

		}
		
		else{
			$response["data"] 		= 	$tf->getCartDatausingCountry($data);	
		}
		$response["error"] 		= 	FALSE;
		$response["error_msg"] 	= 	"";
		
		echo json_encode($response);
	
}
?>