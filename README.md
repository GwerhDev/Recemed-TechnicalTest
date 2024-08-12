# Prueba técnica para puesto Full Stack | Recemed

## Descripción

Esta prueba técnica está diseñada para evaluar la implementación de una aplicación Full Stack que incluye autenticación y manejo de prescripciones médicas utilizando la API de Recemed.

## Autenticación de Usuario

Cuando no se detecta un usuario conectado, se utiliza un [Route Guard](https://vike.dev/routing#route-guards) de Vike que renderiza un formulario de inicio de sesión dividido en dos pasos:

1. **Formulario de RUT**: El primer paso verifica si el usuario existe a través de la [API de Recemed](http://rec-staging.recemed.cl/doc/index.html#/User/RecWeb_Api_UserController_exists). Si el usuario existe, se almacena el RUT en las cookies.

2. **Formulario de Contraseña**: En el segundo paso, se usa el RUT almacenado junto con la contraseña proporcionada por el usuario para validar las credenciales en el [endpoint de login de la API de Recemed](http://rec-staging.recemed.cl/doc/index.html#/UserSession/RecWeb_Api_UserSessionController_create). Si el login es exitoso, se almacena el token y los datos del usuario en las cookies para su uso en solicitudes protegidas.

## Paginación y Fetching de Datos

Una vez autenticado el usuario, se redirige a la página principal (CSR) donde se realiza un fetching de datos desde el [endpoint de prescripciones médicas de la API de Recemed](http://rec-staging.recemed.cl/doc/index.html#/Prescription/RecWeb_Api_Patient_PrescriptionController_index). Este proceso incluye la paginación tipo "ver más", utilizando el parámetro `page` en la petición a la API de prescripciones.

## Comandos para Levantar el Proyecto

Para levantar el proyecto, sigue estos pasos:

1. **Instalar las dependencias**:
    ```bash
    npm install
    ```

2. **Levantar el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

## Testing

Se ha implementado un test para el servicio de fetching de prescripciones a la API de Recemed, ya que es un punto crítico para el correcto funcionamiento de la aplicación. Puedes ejecutar los tests con el siguiente comando:

```bash
npm test
