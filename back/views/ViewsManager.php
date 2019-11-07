<?php

class ViewsManager {


  static $views = [
    "home"=>[
        "file"=>"views/view-home.php",
        "label"=>false,
        "title"=>"Mon prochain job : et si on changeait de métier ?"
    ],
    "explorer"=>[
      "file"=>"views/view-explorer.php",
      "label"=>"Explorez",
      "title"=>"Mon prochain job : recherchez un nouveau métier"
    ],
    "documentation"=>[
      "file"=>"views/view-documentation.php",
      "label"=>"Documentation",
      "title"=>"Mon prochain job : consultez notre sélection de ressources"
    ],
    "testez-vous"=>[
      "file"=>"views/view-testez-vous.php"      ,
      "label"=>"Testez-vous",
      "title"=>"Mon prochain job : testez votre capacité à vous reconvertir",
      "js"=>["js/mpj-quiz.js"]
    ],
    "a-propos"=>[
      "file"=>"views/view-a-propos.php"      ,
      "label"=>"A propos",
      "title"=>"Mon prochain job : et si on changeait de métier ?"
    ],
  ];

  public static function getCurrentViewId() {
    $v = (isset($_REQUEST['v']) == false) ? "home" : trim(strtolower($_REQUEST['v']));
    if ( array_key_exists($v, self::$views) ) {
      return $v;
    }
    return false;
  }

  public static function getCurrentView() {
    $v = self::getCurrentViewId();
    if ($v) {
      return self::$views[$v];
    }
    return false;
  }

  public static function getCurrentViewJs() {
    $v = self::getCurrentView();
    if ($v) {
      if (array_key_exists("js", $v) && is_array($v["js"])) {
        foreach($v["js"] as $js) {
          echo '<script src="' . self::getHomeUrl() . $js . '"></script>';
        }
      }

    }

  }

  public static function renderMenu() {
    $v = self::getCurrentViewId();
    echo '<ul>';
    foreach(self::$views as $id => $value) {
      if ($value['label'] !== false) {
        echo '<li class="' . (($v == $id) ? ' active ': ''). '"><a href="' . self::getHomeUrl(). '?v=' . $id . '">' . $value['label']. '</a></li>';
      }
    }
    echo '</ul>';
  }

  public static function getHomeUrl() {
    global $cfg;
    return $cfg['url'];
  }



}
