<?php

// funcion para mostrar todos los contactos
function obtenerContactos(){
    include 'db.php';

    try {
        return $conn -> query("SELECT * FROM contactos");
    } catch (Exception $e) {
        echo "Error". $e -> getMessage(). "<br>";

        return false; // en caso de un error
    }
}

// funcion para mostrar solo la informacion de un contacto en especifico
function obtenerContacto($id){
    include 'db.php';

    try {
        return $conn -> query("SELECT * FROM contactos WHERE id = $id");
    } catch (Exception $e) {
        echo "Error". $e -> getMessage(). "<br>";

        return false; // en caso de un error
    }
}