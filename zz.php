
<!DOCTYPE html>
<html lang="kr">
<head>
    <meta charset="UTF-8">
</head>

<body>
<?php
$t = microtime(true);
$micro = sprintf("%06d", ($t - floor($t)) * 1000000);
$d = new DateTime(date('Y-m-d H:i:s.' . $micro));

$returnStr = $d->format("Y-m-d H:i:s.u");

echo $returnStr;
?>

<script>
var currentURL = document.URL;
alert( currentURL );
</script>
</body>

</html>


