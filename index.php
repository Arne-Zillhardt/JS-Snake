<!DOCTYPE html>
<head>
<script src="script.js"></script>
<link  rel="stylesheet" href="style.css">
</head>

<body onload="start()">
<h1 class="project-headline">Snake</h1>
    <p class="project-paragraph">The popular game Snake. What did you thought?</p>
    <table class="snake-table">
        <?php
            for($i = 0; $i <= 25; $i++){
                echo "<tr>";
                for($j = 0; $j <= 80; $j++){
                    echo "<td id=\"". $j ."_". $i ."\" class=\"cell\"></td>";
                }
                echo "</tr>";
            }
        ?>
    </table>
</body>