<?php 
    include 'inc/layout/header.php'; 
    include 'inc/funciones/funciones.php';    
?>

<div class="contenedor-barra">
    <h1>Agenda de contactos</h1>
</div>

<!-- creando el formulario -->
<div class="bg-amarillo contenedor sombra">
    <form id="contacto" action="#">
        <legend>Añada un contacto <span>Todos los campos son obligatorios</span></legend>

        <?php include 'inc/layout/formulario.php';?>
    </form>
</div>

<!-- contactos -->
<div class="bg-blanco sombra contenedor contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class="buscador sombra" placeholder="Buscar contacto...">

        <p class="total-contactos"><span></span> Contactos</p>

        <div class="contenedor-tabla">
            <table class="listado-contactos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    $contactos = obtenerContactos();
                    if ($contactos -> num_rows) { 
                        foreach ($contactos as $contacto) { ?>
                    <tr>
                        <td><?php echo $contacto['nombre']; ?></td>
                        <td><?php echo $contacto['empresa']; ?></td>
                        <td><?php echo $contacto['telefono']; ?></td>
                        <td>
                            <a href="editar.php?id=<?php echo $contacto['id']; ?>" class="btn btn-editar"><i class="fas fa-pen-square"></i></a>
                            <button data-id="<?php echo $contacto['id']; ?>" type="button" class="btn btn-borrar"><i class="fas fa-trash-alt"></i></button>
                        </td>
                    </tr>
                <?php 
                        }
                    }                
                ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include 'inc/layout/footer.php'; ?>