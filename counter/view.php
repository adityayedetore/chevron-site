
<!DOCTYPE html>
<html>
<head>
    <title></title>
    <style type="text/css">
        #container {
            width: 500px;
            margin: 0 auto;
            padding-top: 10px;
            padding-bottom: 30px;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Viewing Experiment Status</h1>
        <?php 
            $arr = json_decode(file_get_contents('array.json'), true);
            echo "<h2>Summary</h2>";
            echo "Number of participants who are currently working or have dropped: ";
            echo "<b>";
            $numWorking = 0;
            $numDone = 0;
            for ($i=0; $i < 45 * 6 + 1; $i++) { 
                if ($arr[$i] > 0 && $arr[$i] < 9 ) {
                    $numWorking = $numWorking + $arr[$i];
                }
                if ($arr[$i] == 9) {
                    $numDone = $numDone + 1;
                }
            }
            echo $numWorking;
            echo "</b>";
            echo "<br>";
            echo " The number of participants definitely done: ";
            echo "<b>";
            echo $numDone;
            echo "</b>";
            echo "<br>";
            echo "The number of participants left is: ";
            echo "<b>";
            echo 45 * 6  - $numDone;
            echo "</b>";
            echo "<br>";
            echo "<h2>Full Array</h2>";
            echo "<p>Each slot in the array below indicates a single experimental trial. If the value is 0, then the trial has yet to be filled. If it is 1, someone is working on the trial at the moment, or they have stopped working on it. If it is 7, then that participant either is about to finish, or almost finished and didn't click the submit button, or they finished and we did not recieve their data. 7s generally not a good number to see. If it is 9, that means that the trial has definitely been submitted, and the data has been collected. </p>";
            echo "<p>Hint: to see which values are filled, search page with cmd f for 1 or 0 </p>";
            echo "<pre>";
            print_r($arr);
            echo "</pre>";
        ?>
    </div>
</body>
</html>
