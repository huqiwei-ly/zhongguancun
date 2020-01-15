<?PHP
include "mysql.php";
if(isset($_POST['username'])){
    $user=$_POST['username'];
    $result=$conn->query("select * from zhucedenglu where username='$user'");
    if($result->fetch_assoc()){
        echo true;
    }else{
        echo false;
    }
}
if(isset($_POST['submit'])){
    $username=($_POST['username']);
    $password=($_POST['password']);
    $conn->query("insert zhucedenglu values(null,'$username','$password',NOW()) ");
    header('location:http://localhost//zhongguancun/src/login.html');
}
