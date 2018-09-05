<?php
require_once("ReservationRestHandler.php");

if ($_SERVER['REQUEST_METHOD'] == "GET") {
	$view = "";
	if(isset($_GET["view"]))
		$view = $_GET["view"];

	switch($view)
	{
		case "all":
			// to handle REST Url /table/list/
			$reservationRestHandler = new ReservationRestHandler();
			$reservationRestHandler->getAllReservations($_GET["date"]);
			break;
			
		case "single":
			// to handle REST Url /table/show/<id>/
			$reservationRestHandler = new ReservationRestHandler();
			$reservationRestHandler->getSingleReservation($_GET["date"], $_GET["id"]);
			break;
	
		case "" :
		http_response_code(404);
			break;
	}

} else if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$data = json_decode(file_get_contents('php://input'));
} else {
	http_response_code(405);
}
