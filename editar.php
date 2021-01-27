<?php 
    include 'inc/layout/header.php'; 
    include 'inc/funciones/funciones.php';

    $id = filter_var($_GET['id'], FILTER_VALIDATE_INT);

    if (!$id) {
        die('Hubo un error...');
    }

    $resultado = obtenerContacto($id);
    $contacto = $resultado -> fetch_assoc();
?>


<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn volver">Volver</a>
        <h1>Editar contacto</h1>
    </div>
</div>

<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Editar contacto</legend>

        <?php include 'inc/layout/formulario.php';?>
    </form>
</div>
<?php include 'inc/layout/footer.php'; ?>