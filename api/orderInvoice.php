<?php

require_once 'include/CommonFunctions.php';
        
class OrderInvoice_Function extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Get transactions
	*/
	function getData($input_data) { 
	 		
			
			if(!empty($input_data->invoiceId)){
				
				$where="id =$input_data->invoiceId and status=1 ";
				
			}
			// get invoice Id		
			$stmt = $this->conn->prepare("SELECT * FROM order_invoices WHERE $where");
			
			$stmt->execute();
			$Invoice_Data = $this->fetchArray($stmt);	
		
			// get order Data 
			$stmt = $this->conn->prepare("SELECT * FROM orders WHERE id='".$Invoice_Data[0]['order_id']."'");
				
			if ($stmt->execute()){
			$order_Data = $this->fetchArray($stmt);
				return $order_Data;				
			} else {
				return NULL;
			}
 	}
} 

$orderData = new OrderInvoice_Function($data);

if($task=="list"){
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	$response["data"] = $orderData->getData($data);
	echo json_encode($response);
}
?>