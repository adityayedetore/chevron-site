<?php 
	if (strcmp($_POST['password'], "tNADDndF4DcprrZZDbNmXHgy") == 0) {
		header("Location: index.html");
		echo "password correct";
	}
	else {
		echo "Password incorrect";
	}
?>
