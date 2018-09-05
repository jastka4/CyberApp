<?php
class Reservation
{
    private $table, $disabled, $date, $start_time, $end_time, $guest;

    function __construct($table, $disabled, $date, $start_time, $end_time, $full_name, $phone, $email)
    {
        $this->table = $table;
        $this->disabled = $disabled;
        $this->date = $date;
        $this->start_time = $start_time;
        $this->end_time = $end_time;
        $this->guest = new Guest($full_name, $phone, $email);
    }

    public function getReservationDetails()
    {
        return $this;
    }
}

class Guest
{
    private $full_name, $phone, $email;

    function __construct($full_name, $phone, $email)
    {
        $this->full_name = $full_name;
        $this->phone = $phone;
        $this->email = $email;
    }
}
