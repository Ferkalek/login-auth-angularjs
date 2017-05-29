<?php
$user = json_decode(file_get_contents('php://input'));

$email = $user->mail;
$pass = md5($user->pass);

$connect = mysqli_connect("localhost", "root", "", "tr_exp_bd");
$output = array();
$query = "SELECT * FROM `users` WHERE  `email` =  '".$email."' AND `password` = '".$pass."'";

$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_array($result)) {
        $output[] = $row;
    }

    session_start();
    $_SESSION['uid'] = uniqid('ang_');
    print $_SESSION['uid'];

    echo json_encode($output);
}
$connect->close();
exit();