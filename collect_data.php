<?php include "counter/counter_functions.php" ?>    
<?php 
	/*
	 * This sets the value in the counter storage array
	 * for a participant who submits the form to 9, indicating that
	 * the form has been succesfully submitted. 
	 */
	finishedForSure(); 
?>

<?php 
$df = fopen("cerchioquadrato.csv", "a");
clearstatcache();
$column_titles = array_slice(array_keys($_POST),0, 13);
$column_titles = array_merge($column_titles, array('trial'));
$column_titles = array_merge($column_titles, array('description'));
if(!(filesize("cerchioquadrato.csv"))) {
	//the file is empty, we initialize collum titles
	fputcsv($df, $column_titles);
}
$x = array_slice($_POST,0,9);
$x = array_merge($x,array(implode("|", $_POST['q1'])));
$x = array_merge($x,array(implode("|", $_POST['q2'])));
$x = array_merge($x,array(implode("|", $_POST['q3'])));
$movie_arr = array('1C-1', '1NC-1','1C-2');
$movie_arr = array_merge($movie_arr, explode(",", $_POST['movie_order']));

$column_titles = array_keys($_POST);
for ($i=12; $i < 21; $i++) { 
	$y  = array($_POST[$column_titles[$i + 1]]);
	$y = array_merge(array($i - 11),$y);
	$y = array_merge(array($movie_arr[$i - 12]),$y);
	$z = array_merge($x, $y);
	fputcsv($df, $z);
}
echo "<h1>Good job, You have finished the study! </h1>";
echo "<h1>You may now close this page. </h1>";
fclose($df);
?> 