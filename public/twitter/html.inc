<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <title>Quien No Te Sigue en Twitter</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <style type="text/css">
      img {border-width: 0}
      * {font-family:'Lucida Grande', sans-serif;}
    </style>
  </head>
  <body>
    <center>
    <div>
      <h2>Quien No Te Sigue en Twitter.</h2>
      <p>¿Tienes problemas?<a href='./clearsessions.php'> Limpiar Sesión</a>.</p>
      <p>Contacto @<a href='http://twitter.com/infomundoorg'>infomundoorg</a></p>
      <hr />
        <?php if (isset($menu)) { ?>
          <?php echo $menu; ?>
        <?php } ?>
      <?php if (isset($status_text)) { ?>
        <?php echo '<h3>'.$status_text.'</h3>'; ?>
      <?php } ?>
      <p><pre><?php print_r($content); ?></pre></p>
    </div>
    </center>
  </body>
</html>