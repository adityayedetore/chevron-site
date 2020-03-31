<?php include "counter_functions.php" ?>  
<?php 
    /* 
     * If ?function=key is added to the end of an http
     * request to this page, then the function corresponding 
     * to the sepcific key will be called. 
     */
    if(isset($_GET['function'])) {
        switch ($_GET['function']) {
            case "getCounter":
                echo getCounter();
                //echo getCounter();
            case "incCount":
                echo incCount();
                break;
            case "decCount":
                echo decCount();
                break;
            case "finishedForSure":
                finishedForSure();
                break;
            case "almostFinished":
                almostFinished();
                break;
            case "stripUnfinished":
                stripUnfinished();
                break;
            case "resett":
                resett();
                break;
            default:
                echo "key matches no function";
        }
    }
?>