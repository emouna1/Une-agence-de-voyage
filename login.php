<?php
header("Content-Type: application/json");

// Read the incoming request data
$request_data = json_decode(file_get_contents('php://input'));

// Check if email and password are provided
if (!isset($request_data->email) || !isset($request_data->password)) {
  http_response_code(400);
  echo json_encode(array("success" => false, "message" => "Email and password are required."));
  exit;
}

// Connect to the MySQL database
$host = "localhost";
$user = "username";
$password = "password";
$database = "dbname";
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
  http_response_code(500);
  echo json_encode(array("success" => false, "message" => "Failed to connect to the database."));
  exit;
}

// Sanitize the email and password inputs
$email = mysqli_real_escape_string($conn, $request_data->email);
$password = mysqli_real_escape_string($conn, $request_data->password);

// Query the database for the user record
$query = "SELECT * FROM accounts WHERE email='$email'";
$result = mysqli_query($conn, $query);
if (!$result) {
  http_response_code(500);
  echo json_encode(array("success" => false, "message" => "Failed to query the database."));
  exit;
}

// Check if there is a user record with the provided email
$row = mysqli_fetch_assoc($result);
if (!$row) {
  http_response_code(401);
  echo json_encode(array("success" => false, "message" => "Invalid email or password."));
  exit;
}

// Verify the password
if (!password_verify($password, $row['password'])) {
  http_response_code(401);
  echo json_encode(array("success" => false, "message" => "Invalid email or password."));
  exit;
}

// Generate a random access token
$access_token = bin2hex(random_bytes(32));

// Store the access token in the database
$user_id = $row['id'];
$query = "UPDATE accounts SET access_token='$access_token' WHERE id=$user_id";
$result = mysqli_query($conn, $query);
if (!$result) {
  http_response_code(500);
  echo json_encode(array("success" => false, "message" => "Failed to update the database."));
  exit;
}

// Return the access token in the response
echo json_encode(array("success" => true, "access_token" => $access_token));
exit;
?>
