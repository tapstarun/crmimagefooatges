<?php

require_once 'include/CommonFunctions.php';
        
class TransactionsSearch_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		* Get transactions
	*/
	function getTransactions($input_data) { 
	 		$where="";
			
			if(!empty($input_data->country)){
				
				$where.=" AND country LIKE '%$input_data->country%' ";
				
			}
			
			if(!empty($input_data->status)){
				
				$where.=" AND status='$input_data->status' ";
				
			}
			
			if(!empty($input_data->fromDate) && !empty($input_data->toDate)){
				
				$where.=" AND DATE(a.created) BETWEEN '$input_data->fromDate' AND '$input_data->toDate' ";
				
			}
			else if(!empty($input_data->fromDate)){
				
				$where.=" AND DATE(created) = '$input_data->fromDate' ";
				
			}
			else if(!empty($input_data->toDate)){
				
				$where.=" AND DATE(created) = '$input_data->toDate' ";
				
			}
			
			$stmt = $this->conn->prepare("SELECT a.id, a.txn_id, a.order_total, a.order_date, a.order_status,b.username,a.created  FROM orders as a left join users as b on a.user_id=b.id WHERE 1=1 $where");
	            
			if ($stmt->execute()){
				$result = $this->fetchArray($stmt);
				return $result;				
			} else {
				return NULL;
			}
	}
} 

$tf = new TransactionsSearch_Functions($data);

if($task=="list"){
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	$response["data"] = $tf->getTransactions($data);
	echo json_encode($response);
}
?>