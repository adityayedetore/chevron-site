<?php
	$date = $_GET['date'];
 	$curr_results=file_get_contents('cerchioquadrato.csv');
  	file_put_contents('results/' . $date . '_results.csv' ,$curr_results);
  	if ($_GET['clear'] == 'yes') {
  		file_put_contents('cerchioquadrato.csv', '');
  	}
?>
