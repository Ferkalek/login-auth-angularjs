<?php
$user = json_decode(file_get_contents('php://input'));

$email = $user->mail;
$pass = md5($user->pass);

$connect = mysqli_connect("localhost", "root", "", "tr_exp_bd");
if ($connect->connect_errno) {
    die("BD connection failed: " . $connect->connect_errno);
}
$query = "SELECT `email` FROM `users` WHERE  `email` =  '".$email."'";

$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0) {
    echo 'Такой пользователь есть!';
    $connect->close();
    exit();
} else {

//    mysql_select_db('tr_exp_bd');

    $queryInsert =  "INSERT INTO `users` (`username`, `email`, `password`) VALUES ('".$email."', '".$email."', '".$pass."')";
    $resultInsert = mysqli_query($connect, $queryInsert);

    $createTableKat = "CREATE TABLE  `tr_exp_bd`.`".$email."_kategory`
    (`id` INT NOT NULL AUTO_INCREMENT,`title_kat` VARCHAR( 100 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, PRIMARY KEY (  `id` ))";

//    $createTableExpens = "CREATE TABLE  `tr_exp_bd`.`".$email."_expens` (`id` INT NOT NULL ,`expens` VARCHAR( 100 )
//    CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL, `sum` FLOAT NOT NULL, `date` DATE NOT NULL, PRIMARY KEY (  `id` ))";


    mysql_query($createTableKat);
//    mysql_query($createTableExpens);


    if ($resultInsert) {
        session_start();
        $_SESSION['uid'] = $email;
        echo json_encode(array('bool'=>'true','msg-class'=>'success-msg','msg'=>'Регистрация прошла успешно!'));
    }
    $connect->close();
    exit();
}