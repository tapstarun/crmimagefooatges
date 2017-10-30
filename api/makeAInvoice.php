<?php

require_once 'include/CommonFunctions.php';
        
class invoice_function extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Get transactions
	*/
	function makeAInvoice($input_data) { 
	 		// get the product details using product id
			$stmt = $this->conn->prepare("Select * from products where id=$input_data->product_id ");
			if($stmt->execute()){
				$productData=$this->fetchArray($stmt);
				
			}	
			// get the user Details using user id
			$stmt = $this->conn->prepare("Select * from users where id=$input_data->userId ");
			if($stmt->execute()){
				$userData=$this->fetchArray($stmt);
				
			}
			
			if(!empty($productData) || !empty($userData)){
				
				$stmt = $this->conn->prepare("INSERT INTO orders SET
				user_id='".$input_data->userId."' , 
				product_id='".$input_data->product_id."' , 
				product_type='".$input_data->product_type."' ,	
				product_size='".$input_data->productSize."' ,
				subtotal ='".$input_data->subTotal."',
				order_total= '".$input_data->subTotal."',
				order_title='".$productData[0]['name']."',
				order_email='".$userData[0]['email']."' ,
				order_date='".date('y-m-d')."',
				bill_firstname='".$userData[0]['firstname']."',
				bill_address1='".$userData[0]['address']."',
				bill_lastname='".$userData[0]['lastname']."',
				bill_phone='".$userData[0]['mobile']."',
				created='".date('y-m-d h:i:s')."',
				modified='".date('y-m-d h:i:s')."',
				order_status=0,order_type=2 ");
				//$stmt->bind_param("iisddsssssssss", $input_data->userId, $input_data->product_id, $input_data->product_type, $input_data->subTotal, $input_data->subTotal,$productData[0]['name'],$userData[0]['email'],date('y-m-d'),$userData[0]['firstname'], $userData[0]['adrress'], $userData[0]['lastname'], $userData[0]['mobile'],date('y-m-d h:i:s'),date('y-m-d h:i:s'));
				$stmt->execute();
				$stmt->close();

				// get inserted id
				$stmt = $this->conn->prepare("Select id from orders order by  id desc limit 1 ");
				$stmt->execute();
					$id=$this->fetchArray($stmt);
				
				// make a invoice 
				

				$stmt = $this->conn->prepare("INSERT INTO order_invoices SET order_id='".$id[0]['id']."',created='".date("y-m-d")."',modified='".date("y-m-d")."',product_id='".$input_data->product_id."',user_id='".$input_data->userId."',expiry_invoice='".$input_data->experyPeriod."',
				status='1'");
				$stmt->execute();
				$stmt->close();
				
				// get invoice id 
				$stmt = $this->conn->prepare("Select id from order_invoices order by  id desc limit 1 ");
				if ($stmt->execute()){
					
					return $this->fetchArray($stmt);; 
							
				}  else {
					return NULL;
				}
			}else{
				return NULL;
			}
	}
} 

$invoice = new invoice_function($data);

if($task=="list"){

	$result_data=$invoice->makeAInvoice($data);
	if($result_data){
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	}else{
		$response["error"] = true;
		$response["error_msg"] = "Execution failed please try again.";
	}
	
	$response["data"] =$result_data;
	//
	echo json_encode($response);
}
?>