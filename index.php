<?php
include "back/loader.php";

$view = ViewsManager::getCurrentView();


?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">

    <title><?php echo $view['title'];?></title>

    <link rel="canonical" href="">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/mpj.css">
  </head>
  <body>

<header class="main-header green">
  <div class="header-nav">
    <?php ViewsManager::renderMenu(); ?>
  </div>

  <div class="logo">
    <a href="<?php echo ViewsManager::getHomeUrl();?>" class="logo-img" title="Mon prochain job"></a>
    <p>Découvrez si l'herbe est plus verte ailleurs !</p>
  </div>

</header>
<script>
var cfg = <?php echo json_encode($clientConfig);?>;
</script>
<main role="main" class="<?php echo "mpj-" . ViewsManager::getCurrentViewId();?>">

<?php


if ($view) {
  include $view['file'];
}

?>


<?php
// debug




echo '<pre>';


echo '<pre>';

?>
</main>

<footer class="container">
  <p>&copy; Company 2017-2019</p>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
<?php

ViewsManager::getCurrentViewJs();

?>
</html>
