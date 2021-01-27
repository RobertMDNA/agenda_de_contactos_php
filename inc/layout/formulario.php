<!-- campos -->
<div class="campos">
    <div class="campo">
        <label for="nombre">Nombre:</label>
        <input 
            type="text" 
            name="nombre" 
            id="nombre" 
            placeholder="Nombre Contacto"
            value="<?php echo ($contacto['nombre']) ? $contacto['nombre'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="empresa">Empresa:</label>
        <input 
            type="text" 
            name="empresa" 
            id="empresa" 
            placeholder="Nombre Empresa"
            value="<?php echo ($contacto['empresa']) ? $contacto['empresa'] : ''; ?>">
    </div>
    <div class="campo">
        <label for="telefono">Teléfono:</label>
        <input 
            type="tel" 
            name="telefono" 
            id="telefono" 
            placeholder="Teléfono Contacto"
            value="<?php echo ($contacto['telefono']) ? $contacto['telefono'] : ''; ?>">
    </div>
</div>

<div class="campo enviar">
    <?php
        $texto_btn = ($contacto['nombre']) ? 'Guardar' : 'Añadir';
        $accion = ($contacto['nombre']) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?php echo $accion; ?>">
    <?php if (isset($contacto['id'])): ?>
        <input type="hidden" id="id" value="<?php echo $contacto['id']; ?>">
    <?php endif; ?>
    <input type="submit" value="<?php echo $texto_btn; ?>">
</div>
