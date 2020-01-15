<?php
include "mysql.php";
$arr=array();
$result=$conn->query("select * from zhongguancun");
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();
}
echo json_encode($arr);