<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Read the search term from the query parameter
$searchTerm = $_GET['description_like'];

// Connect to the database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hoteldb";

$conn = mysqli_connect($servername, $username, $password, $dbname, 3307);

// Escape the search term to prevent SQL injection
$searchTerm = mysqli_real_escape_string($conn, $searchTerm);

// Build the SQL query to search for hotels based on the description
if(!empty($searchTerm)){
   $sql = "SELECT * FROM hotels WHERE description LIKE '%" . $searchTerm . "%'";
}

// Execute the SQL query and fetch the results
$result = mysqli_query($conn, $sql);

$hotels = array();

while ($row = mysqli_fetch_assoc($result)) {
  $hotels[] = $row;
}

// Return the search results as JSON
echo json_encode($hotels);

// Close the database connection
mysqli_close($conn);
?>