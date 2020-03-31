<?php 
    function resett() {
        $i = 45 * 6 + 1;
        $arr = array_fill (0, $i, 0);
        file_put_contents("array.json",json_encode($arr));
        return json_encode($arr);
	}
	function getCounter() {
        $arr = json_decode(file_get_contents('array.json'), true);
        for ($i = 0; $i < 45 * 6 + 1; $i++) {
            if ($arr[$i] < 1) {
                return (int) $i;      // Return the new count
            }
        }
        return  45 * 6 + 1;
	}
	function incCount() {
        $arr = json_decode(file_get_contents('array.json'), true);
        if (isset($_GET['n'])) {
            $i =  (int) $_GET['n'];
            $arr[$i] = $arr[$i] + 1;
            file_put_contents("array.json",json_encode($arr));
            return $i;
        }
	}
    function almostFinished() {
        $arr = json_decode(file_get_contents('counter/array.json'), true);
        if (isset($_POST['numParticipant'])) {
            $i =  intval( $_POST['numParticipant']);
            $arr[$i] = 5;
            echo json_encode($arr);
            file_put_contents("counter/array.json",json_encode($arr));
            return $i;
        }
        return "hmmm";
    }
    function finishedForSure() {
        $arr = json_decode(file_get_contents('counter/array.json'), true);
        if (isset($_POST['numParticipant'])) {
            $i =  intval( $_POST['numParticipant']);
            $arr[$i] = 9;
            echo json_encode($arr);
            file_put_contents("counter/array.json",json_encode($arr));
            return $i;
        }
        return "hmmm";
    }
	function decCount($counterID) {
        $arr = json_decode(file_get_contents('array.json'), true);
        if (isset($_GET['n'])) {
            $i =  (int) $_GET['n'];
            $arr[$i] = 0;
            file_put_contents("array.json",json_encode($arr));
            return $i;
        }
	}
    function stripUnfinished() {
        $arr = json_decode(file_get_contents('array.json'), true);
        if (isset($_GET['clear_up_to'])) {
            for ($i=0; $i < (int) $_GET['clear_up_to']; $i++) { 
                if ($arr[$i] < 9) {
                    $arr[$i] = 0;
                }
            }
        }
        file_put_contents("array.json",json_encode($arr));
    }
	
?>
