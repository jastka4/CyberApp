<?php
require_once("ReservationDetails.php");

class DBConnection {
    //? Change this class to a singleton?
    
    private $pdo;

    private $dbserver = '********';
    private $dbusername = '********';
    private $dbpassword = '********';
    private $dbname = '********';
    private $dbtable = '********';

    public function __construct()/*$dbserver, $dbname, $dbusername, $dbpassword*/
    {
        try
        {
            $pdo = new PDO('mysql:host='.$this->dbserver.';dbname='.$this->dbname, $this->dbusername, $this->dbpassword);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->pdo = $pdo;
        }
        catch(PDOException $e)
        {
            echo 'ERROR: ' . $e->getMessage();
            die();
        }
    } 
    
    public function query($query, $params = array())
    {
        $statement = $this->pdo->prepare($query);
        $statement->execute($params);

        if (explode(' ', $query)[0] == 'SELECT')
        {
            // if (explode(' ', $query)[1] == '*')
            // {
            //     $data = $statement->fetchAll(PDO::FETCH_CLASS, 'Reservation');
            // }
            // else
            // {
                $data = $statement->fetchAll(PDO::FETCH_ASSOC);
            //}
            return $data;
        }
    }
}
