<?php
$data = json_decode(file_get_contents('php://input'));

$dbserver = '********';
$dbusername = '********';
$dbpassword = '********';
$dbname = '********';
$dbtable = '********';

// Create connection
$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbname);

// Check connection
if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

//$sql="SELECT * FROM user WHERE id = '".$data."'";
//$result = $connection->query($sql);

echo json_encode($data);
$connection->close();
?>