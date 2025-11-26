# Implementación de Roles de Admin y Flujo de Turnos

Este documento detalla los cambios realizados para implementar el control de acceso basado en roles (RBAC) y el flujo de publicación de turnos.

## 1. Resumen de Cambios

### Base de Datos
- **Tabla `Usuarios`**: Se agregó la columna `rol` de tipo `ENUM('cliente', 'admin')`. El valor por defecto es `'cliente'`.

### Backend
- **Modelo `Usuario`**: Actualizado para incluir el campo `rol`.
- **Router `Usuario`**: Nuevo endpoint `GET /api/usuarios/:id/rol` para consultar el rol de un usuario.
- **Router `Turnos`**: Nuevo endpoint `PUT /api/turnos/admin/publicar/:id` para cambiar el estado de un turno de "Pendiente" a "Disponible".
- **Lógica de Negocio**:
  - Los turnos creados por el Admin ahora nacen con estado **"Pendiente"**.
  - Solo los turnos "Disponibles" son visibles para los clientes.

### Frontend
- **Guard `adminGuard`**: Protege la ruta `/admin-panel`. Verifica que el usuario esté autenticado Y que su rol sea 'admin'.
- **Componente `App`**: Oculta el enlace "Admin" en la navegación si el usuario no es administrador.
- **Componente `AdminPanel`**:
  - Se agregó el botón **"Publicar"** para turnos en estado "Pendiente".
- **Componente `Turnos`**: Ahora utiliza `getCurrentUser()` de AWS Amplify para obtener el ID real del usuario autenticado.

---

## 2. Guía: Cómo Asignar Rol de Admin

Actualmente, la aplicación gestiona el rol `admin` en su propia base de datos (MariaDB), separada de los grupos de AWS Cognito. Existen varias formas de gestionar esto.

### Opción A: Script Automatizado (Recomendada)
Hemos creado un script de utilidad para facilitar esta tarea sin tocar SQL manualmente.

1.  Abre una terminal en la raíz del proyecto.
2.  Ejecuta el script pasando el **email** del usuario:

    ```bash
    node scripts/set-admin.js usuario@ejemplo.com
    ```

3.  El script buscará al usuario por email y actualizará su rol a `admin`.

### Opción B: SQL Directo
Si prefieres usar una herramienta de base de datos (como DBeaver, Workbench o la terminal):

1.  Obtén el ID del usuario (puedes buscarlo por email):
    ```sql
    SELECT id, email, rol FROM Usuarios WHERE email = 'usuario@ejemplo.com';
    ```
2.  Ejecuta la actualización:
    ```sql
    UPDATE Usuarios SET rol = 'admin' WHERE email = 'usuario@ejemplo.com';
    ```

### Opción C: ¿Se puede desde AWS Cognito?
**Respuesta Corta**: No directamente con la implementación actual.

**Explicación Técnica**:
Actualmente, tu aplicación tiene una "fuente de verdad" híbrida:
- **Identidad (Quién eres)**: AWS Cognito.
- **Datos del Perfil (Qué rol tienes)**: Base de datos local (MariaDB).

Aunque crees un grupo "Admin" en Cognito, tu backend actual no mira ese grupo; mira la columna `rol` en la tabla `Usuarios`.

**¿Cómo se podría hacer en el futuro?**
Para gestionar roles desde Cognito, tendríamos que refactorizar el backend para:
1.  Leer los `groups` del token JWT que envía Cognito.
2.  Sincronizar esos grupos con la base de datos local cada vez que el usuario inicia sesión.

*Por ahora, la **Opción A** es la más rápida y efectiva para tu etapa de desarrollo.*

---

## 3. Flujo de Trabajo de Turnos

1.  **Creación (Admin)**: El admin crea un turno. Estado inicial: **"Pendiente"**. (Invisible para clientes).
2.  **Publicación (Admin)**: El admin hace clic en "Publicar". Estado pasa a: **"Disponible"**. (Visible para clientes).
3.  **Reserva (Cliente)**: El cliente reserva el turno. Estado pasa a: **"Reservado"**.
4.  **Confirmación/Cancelación (Admin)**: El admin gestiona el turno final.
