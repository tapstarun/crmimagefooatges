<?php
require_once 'include/CommonFunctions.php';
        
class Transactions_Functions extends Common_Functions{
 
    // constructor
    function __construct($input_data) {
		parent::__construct();
        $this->keepValidateUser($input_data);
    }	
	/**
		 * Get transactions for admin
	 */
	function getTransactionsForAdmin() { 
				
			
			$stmt = $this->conn->prepare("SELECT a.id, a.txn_id, a.order_total, a.order_date, a.order_status,b.username  FROM orders as a left join users as b on a.user_id=b.id ");
	            
			if ($stmt->execute()) {
				$result = $stmt->get_result()->fetch_assoc();
				$stmt->close();
				return $result;
				
			} else {
				return NULL;
			}
	}
	/**
		 * Get transactions for staff
	 */
	function getTransactionsForStaff($input_data) { 
			$where="1=1";	
			
			if(isset($input_data->state)){
				
				$stmt = $this->conn->prepare("SELECT state  FROM states where id=$input_data->state");
				$stmt->execute();
				$result = $stmt->get_result()->fetch_assoc();
				
				$where.=" and b.state='$result[state]'";
			}
			$stmt = $this->conn->prepare("SELECT a.id, a.txn_id, a.order_total, a.order_date, a.order_status,b.username  FROM orders as a left join users as b on a.user_id=b.id where $where");
	      
			if ($stmt->execute()) {
				$result = $this->fetchArray($stmt);

					
					return $result;

				
			} else {
				return NULL;
			}
	}
} 

$tf = new Transactions_Functions($data);

if($task=="list"){
	if($data->type=="ADMIN")
	{
	$result_data=$tf->getTransactionsForAdmin();
	}else{
		$result_data=$tf->getTransactionsForStaff($data);
	}
	$response["error"] = FALSE;
	$response["error_msg"] = "";
	$response["data"] = $result_data;
	//print_r($result_data);die;
	echo json_encode($response);
}
?>