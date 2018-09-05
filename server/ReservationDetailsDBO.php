<?php
require_once("ReservationDetails.php");
require_once("DBConnection.php");

class ReservationDetailsDBO //? create 2 DBO classes for Reservation and Guest?
{
    private $dbo;
    
    function __construct()
    {
        $this->dbo = new DBConnection();
    }

    public function getAllReservations($date)
    {
        $reservations = array();

        $sql = "SELECT * FROM reservations WHERE date = :date";
        $reservations = $this->dbo->query($sql, array(
            ':date' => $date
        ));

        return $reservations;
    }

    public function getSingleReservation($date, $table)
    {
        $sql = "SELECT * FROM reservations WHERE date = :date AND table = :table";
        $reservation = $this->dbo->query($sql, array(
            ':date' => $date,
            ':table' => $table 
        ));

        return $reservation;
    }

    public function getTableBookedHours($date, $table)
    {
        $hours = array();

        $sql = "SELECT start_hour, end_hour FROM reservations WHERE date = :date AND table = :table";
        $hours = $this->dbo->query($sql, array(
            ':date' => $date,
            ':table' => $table
        ));

        echo $hours;
        return $hours;
    }

    public function setReservationDetails(ReservationDetails $reservation) //TODO: Check if array from object can be send
    {
        $sql = "INSERT INTO guests VALUES (NULL, :full_name, :phone, :email); SET @lastid = LAST_INSERT_ID(); INSERT INTO reservations VALUES (1, :date, :table, :disabled, @lastid, :start_hour, end_hour)";
        $this->dbo->query($sql, array(
            ':table' => $reservation->table,
            ':disabled' => $reservation->disabled,
            ':date' => $reservation->date,
            ':start_time' => $reservation->start_time,
            ':end_time' => $reservation->end_time,
            ':guest' => $reservation->guest
        ));
    }

    public function setTableDisabledState($table, $date, $state)
    {
        $sql = "UPDATE reservations SET disabled = :state WHERE table = :table AND date = :date";
        $this->dbo->query($sql, array(
            ':table' => $table,
            ':date' => $date,
            ':state' => $state
        ));
    }
}
