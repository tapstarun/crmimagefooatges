<?php
require_once 'include/CommonFunctions.php';
if($task=="list"){
			
			$users=$db_dailyTasks->getUserSubscriptionExpired($con);
			$response["error"] = FALSE;
			$response["error_msg"] = "";
			$response["data"] = $users;
}
        echo json_encode($response);
 
/**
     * Get user by email and password
 */
function getUserSubscriptionExpired($con) {
 
        $stmt = $con->prepare("SELECT * FROM users ?");
 
      //  $stmt->bind_param("s", $email);WHERE email = 
 
        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $user;
            
        } else {
            return NULL;
        }
}
 
?>