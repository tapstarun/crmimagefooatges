<?php
$response = array("error" => FALSE); // json response array

$request_body 	= 	file_get_contents('php://input');

$data 			= 	json_decode($request_body);

$task			=	(!empty($data->task)?$data->task:"list");

//@$data->apiKey			=	(!empty($data->apiKey)?$data->apiKey:base64_encode("jimmydued"));

class Common_Functions {
	
    protected $conn;
 
    // constructor
    function __construct() {
		require_once 'DB_Connect.php';
        // connecting to database
        $db = new Db_Connect();
        $this->conn = $db->connect();
    }
 
	function keepValidateUser($input_data){
		
		$input_data->apiKey = base64_decode($input_data->apiKey);
	
		if (isset($input_data->apiKey)){
			// get the user by username
			$user = $this->isUserExistedByUsername($input_data->apiKey);
			
			if (!$user){
				// user is not found with the credentials
				$response["error"] = TRUE;
				$response["error_msg"] = "Login credentials are wrong. Please try again!";
				echo json_encode($response);
				exit;
			}
		} 
		else {
			// required post params is missing
			$response["error"] = TRUE;
			$response["error_msg"] = "You are not authorize to access!";
			echo json_encode($response);
			exit;
		}
	}
	
    /**
     * Get user by email and password
     */
    public function getUserByEmailAndPassword($email, $password) {
 
        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
 
        $stmt->bind_param("s", $email);
 
        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            // check for password equality
            if ($user['password'] == md5($password)) {
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
    public function isUserExisted($email) {
        $stmt = $this->conn->prepare("SELECT email from users WHERE email = ?");
 
        $stmt->bind_param("s", $email);
 
        $stmt->execute();
 
        $stmt->store_result();
 
        if ($stmt->num_rows > 0) {
            // user existed 
            $stmt->close();
            return true;
        } else {
            // user not existed
            $stmt->close();
            return false;
        }
    }
	
	/**
     * Check user is existed or not by username
     */
    public function isUserExistedByUsername($username,$id=null) {
        $condition = "";
        
        if(isset($id)){
            $condition.=" AND id!=".$id."";
        }
             
		$stmt = $this->conn->prepare("SELECT * from admins WHERE (username = '".$username."' OR email='".$username."') ".$condition." ");

        $stmt->execute();
 
        $stmt->store_result();
 
        if ($stmt->num_rows!=0) {
            // user existed 
            $stmt->close();
            return 1;
        } else {
            // user not existed
            $stmt->close();
            return 0;
        }
    }

	/**
     * Check user is existed or not by id
     */
    public function isUserExistedById($id=null) {
        $condition = "";
        
        if(isset($id)){
            $condition.=" AND id!=".$id."";
        }
             
		$stmt = $this->conn->prepare("SELECT * from admins WHERE (username = '".$username."' OR email='".$username."') ".$condition." ");

        $stmt->execute();
 
        $stmt->store_result();
 
        if ($stmt->num_rows!=0) {
            // user existed 
            $stmt->close();
            return 1;
        } else {
            // user not existed
            $stmt->close();
            return 0;
        }
    }
	
	/**
		 * Get Countries Data
	 */
	function getCountriesData(){ 					
			
        $stmt = $this->conn->prepare("SELECT id,code,name from countries");
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
		 * Get State Data
	 */
	function getStatesData($data){ 					
		$country_id=$this->getCountryId($data->countryName);	
		
        $stmt = $this->conn->prepare("SELECT * from states where country_id ='".$country_id."'");
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
		 * Get Countries id using  country name
	 */
	function getCountryId($data){ 					
		
        $stmt = $this->conn->prepare("SELECT id from countries where name Like '%".$data."%'");
        if ($stmt->execute()) {             
            $result = $this->fetchArray($stmt);
            return $result[0]['id'];             
        }
        else
        {
            return NULL;
        }
	}
	/**
		 * Get state id using  State name
	 */
	function getStateId($data){ 					
		
        $stmt = $this->conn->prepare("SELECT id from states where state Like '%".$data."%'");
        if ($stmt->execute()) {             
            $result = $this->fetchArray($stmt);
            return $result[0]['id'];             
        }
        else
        {
            return NULL;
        }
	}	
	
	/**
		 * Get Cities Data
	 */
	function getCitiesData($data){ 					
		$stateId=$this->getStateId($data->stateName);		
        $stmt = $this->conn->prepare("SELECT * from cities where state_id ='".$stateId."'");
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
		 * Get Cities Data using state name
	 */
	function getCitiesDatausingState($data){ 					
			
        $stmt = $this->conn->prepare("SELECT c.* from cities as c inner join states as s on  c.state_id=s.id where state ='".$data->stateName."'");
        if ($stmt->execute()) {             
            $result = $this->fetchArray($stmt);
            return $result;             
        }
        else
        {
            return NULL;
        }
	}

    /*Common function to fetch and send back the array from fetch row*/
    function fetchArray($stmt){
        $data = array();
        $result = $stmt->get_result();
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $stmt->close();
        return $data;
    }
}
 
?>