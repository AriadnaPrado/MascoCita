# Estándares de Código y Documentación

Este documento define las reglas obligatorias para la documentación y el estilo de comentarios en el código fuente del proyecto.

## Reglas Generales

1.  **Formato Obligatorio:** Todo código nuevo o modificado debe incluir comentarios en formato **JSDoc** (`/** ... */`).
2.  **Alcance:** Se debe documentar cada Clase, Componente, Método y Propiedad pública.
3.  **Idioma:** Español neutro y técnico.

## Reglas de Contenido y Tono

* **Profesionalidad:** Los comentarios deben ser puramente descriptivos y técnicos.
* **Brevedad:** Explicar la funcionalidad de forma concisa (qué hace y para qué sirve).
* **Impersonalidad:** No utilizar primera persona ("hice", "agregué") ni dirigirse al desarrollador ("tienes que").
* **Prohibiciones Estrictas:**
    * **NO** usar expresiones coloquiales (ej. "aquí está la magia", "truco sucio").
    * **NO** mencionar correcciones de errores pasados (ej. "arreglado el bug", "antes fallaba").
    * **NO** utilizar símbolos gráficos o emojis (❌, ✅, 🚀, ⚠️).

## Ejemplos

### Incorrecto ❌
```javascript
// Arreglé esto porque daba error antes
// Esta función es la que hace la magia del login
async login() { ... }