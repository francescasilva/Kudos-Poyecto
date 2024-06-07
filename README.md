# Kudos-Poyecto 
# Sistema de Carga y Validación de Datos con Autenticación

## Objetivo

Desarrollar una aplicación Back-End segura y robusta que permita a los usuarios autenticados, específicamente con rol de `admin`, cargar archivos CSV para la creación de registros en una base de datos PostgreSQL. La aplicación debe validar los datos del archivo CSV, permitir la corrección de registros inválidos y asegurar que solo usuarios autorizados realicen la carga de datos.

## Tecnologías Específicas

- **Backend**: Express para manejar la lógica del servidor.
- **Base de Datos**: PostgreSQL para almacenamiento de datos.
- **Autenticación/Autorización**: Uso de JWT para manejar sesiones de usuario y control de acceso.
- **Testing:** Vitest

## Backend (Express + PostgreSQL)

### Endpoints

- **Autenticación**: Endpoint `/login` para autenticación de usuarios, que verifica credenciales (email y password) y retorna un token JWT.
- **Carga de Datos**: Endpoint `/upload` protegido con middleware de autorización, para la carga y procesamiento de archivos CSV.

### **Middleware de Autorización**

- Verificar el JWT en cada solicitud al endpoint `/upload`, asegurando que solo usuarios con rol de `admin` puedan acceder.
- Un usuario con rol `admin` deberá ser pre-creado en la base de datos (seed).

### **Procesamiento de Archivos CSV**

- Recibir archivo CSV en endpoint `/upload`
- Leer y validar el contenido del archivo CSV (name, email, age) y por cada fila crear un registro en la tabla `users`
- Generar una respuesta detallada con los registros exitosos y un informe de errores específicos por registro y campo:
Es un sistema de carga y validacion de datos con autenticacion 

**Para instalar y ejecutar el proyecto, sigue estos pasos**

git clone git@github.com:francescasilva/Kudos-Poyecto.git

**Instalar dependecias: **
```
npm install
```

**Configura las variables de entorno en un archivo .env**

colocar tu informacion de base de datos

PGHOST=localhost

PGDATABASE=[base-de-datos]

PGPORT=[puerto]

PGUSER=[usuario]

PGPASSWORD=[password]

PGADMINDATABASE=[admin-database]

PORT=[puerto]

CLIENT_ORIGIN=*

**Características**

**Permite cargar datos**

 .Agregue un archivo controlador, para manejar la carga del archivos csv

 .Cree un ruta /upload donde se realizara la carga de archivos

 .Con la libreria multer pude subir archivos

 .Agregue un archivo html para hacer la simulacion de subida de archivos

**Realiza validaciones de los datos cargados**

 .Con cvs parser lo utilice para leer los archivos csv

 .Al finalizar la lectura del archivo si hay datos que estan vacios y que no se cumplio con los requerimientos solcitados como el name, email, age y  role te envira los errores y en caso los datos sean correctos te mostrara todos los datos validados 

**Requiere autenticación para acceder a ciertas funcionalidades**

Agregue el archivo auth router para registro,login de un usuario y autenticacion de funcionalidade a admin. 

Agregue middlewares para la autenticacion, autorizacion, errores y validacion.
 
 


 

