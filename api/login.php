<?php

require_once 'include/CommonFunctions.php';

class Login extends Common_Functions{
    
	/**
     * Get user by email and password
     */
    public function getUserByEmailAndPassword($userDetail, $password) {
 
        $stmt = $this->conn->prepare("SELECT * FROM admins WHERE (email = '".$userDetail."' OR username='".$userDetail."') and password='".md5($password)."'");

        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            // check for password equality
            if (!empty($user)) {
                // user authentication details are correct
                return $user;
            }
        } else {
            return NULL;
        }
    }
 
    /**
     * Check user is existed or not
     */
    public function isUserExisted($userDetail) {
	
        $stmt = $this->conn->prepare("SELECT username,firstname,lastname,email FROM admins WHERE (email = '".$userDetail."' OR username='".$userDetail."')");
  
        $stmt->execute();
 
        $stmt->store_result();
 
        if ($stmt->num_rows > 0) {
            // user existed 
            $stmt->close();
            return true;
        }
		else {
            // user not existed
            $stmt->close();
            return false;
        }
    }
}

$loginObj 		=  	new Login();

if (isset($data->apiKey) && isset($data->password)) {
	
    // receiving the post params
    $userDetail 		= base64_decode($data->apiKey);
    $password 			= base64_decode($data->password);
	
    // get the user by email and password
//	print_r($userDetail);	print_r($password);die;
    $user = $loginObj->getUserByEmailAndPassword($userDetail, $password);
    
	if ($user != false){
        // use is found
        $response["error"] = FALSE;
        $response["firstname"] 	= $user["firstname"];
		$response["lastname"] 	= $user["lastname"];
		$response["username"] 	= $user["username"];
        $response["type"]       = $user["type"];     
		
		$response["add_crm_user"] 	= $user["add_crm_user"];
		$response["add_products"] 	= $user["add_products"];
		$response["transaction"] 	= $user["transaction"];
        $response["abandond_cart_list"]       = $user["abandond_cart_list"];      
		
		$response["advance_member_search"] 	= $user["advance_member_search"];
		$response["search_client_information"] 	= $user["search_client_information"];
		$response["transaction_search"] 	= $user["transaction_search"];
        $response["sale_n_transactions"]       = $user["sale_n_transactions"];	
		
		$response["performa_invoice_search"] 	= $user["performa_invoice_search"];
		$response["recent_cancelled_transaction"] 	= $user["recent_cancelled_transaction"];
		$response["download_facility"] 	= $user["download_facility"];
		$response["download_on_behalf"] 	= $user["download_on_behalf"];
        $response["low_remaning_credit"]       = $user["low_remaning_credit"];	

		$response["daily_tasks"] 	= $user["daily_tasks"];
		$response["add_potential_user"] 	= $user["add_potential_user"];
		$response["state"] 	= $user["state"];

        echo json_encode($response);
    } 
	else
	{
        // user is not found with the credentials
        $response["error"] = TRUE;
        $response["error_msg"] = "Login credentials are wrong. Please try again!";
        echo json_encode($response);
    }
} else {
    // required post params is missing
    $response["error"] = TRUE;
    $response["error_msg"] = "Required parameters email or password is missing!";
    echo json_encode($response);
	exit;
}
?>