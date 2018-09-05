<?php
require_once("ReservationDetailsDBO.php");

class ReservationRestHandler
{
    public function getAllReservations($date)
    {
        $reservationDBO = new ReservationDetailsDBO();
        $rawData = $reservationDBO->getAllReservations($date);

        echo json_encode($rawData);
    }
}
