# MascoCita

Sistema de gestión de turnos para clínica veterinaria.

## Inicio Rápido

Sigue estos pasos para levantar el proyecto en tu entorno local. Recomendamos utilizar **PowerShell** como terminal.

### Prerrequisitos

- Node.js (v18 o superior recomendado)
- Angular CLI (`npm install -g @angular/cli`)
- Base de datos MariaDB/MySQL (o acceso a RDS)

### 1. Backend

El backend es una aplicación Node.js/Express.

1.  Abre **PowerShell** y navega a la carpeta del backend:
    ```powershell
    cd backend
    ```
2.  Instala las dependencias (si aún no lo has hecho):
    ```powershell
    npm install
    ```
3.  Inicia el servidor ejecutando el archivo principal:
    ```powershell
    node index.js
    ```
    El servidor correrá por defecto en el puerto configurado (ej. 3000 o 8080).

### 2. Frontend

El frontend es una aplicación Angular.

1.  Abre una nueva pestaña de **PowerShell** en la raíz del proyecto:
    ```powershell
    # Si estás en la carpeta backend, sube un nivel:
    cd ..
    ```
2.  Instala las dependencias (si aún no lo has hecho):
    ```powershell
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```powershell
    ng serve
    ```
4.  Abre tu navegador en `http://localhost:4200/`.

