# Kudos-Poyecto 
##  Validación de archivos CSV  con Autenticación

### Funcionalidad

Es aplicación Back-End que permita a los usuarios autenticados, específicamente con rol de `admin`, cargar archivos CSV para la creación de registros en una base de datos PostgreSQL. La aplicación  valida los datos del archivo CSV, permite la corrección de registros inválidos y asegura que solo usuarios autorizados realicen la carga de datos.

### Tecnologías usadas:

- **Node**
- **Express**: para manejar la lógica del servidor.
- **PostgreSQL**: para almacenamiento de datos.
- **Middlewares**: Autenticación/Autorización, Uso de JWT para manejar sesiones de usuario y control de acceso.
- **Testing:** Vitest
- **TypeScript** 

### Endpoints

- **Autenticación**: Endpoint `/login` para autenticación de usuarios, que verifica credenciales (email y password) y retorna un token JWT.
- **Carga de Datos**: Endpoint `/upload` protegido con middleware de autorización, para la carga y procesamiento de archivos CSV.


### **Procesamiento de Archivos CSV**

- Recibe archivo CSV en endpoint `/upload`
- Valida el archivo CSV (name, email, age)
- Generar una respuesta de registros exitosos y/o  errores  por registro 

### **Para instalar y ejecutar el proyecto, sigue estos pasos**
```
git clone git@github.com:francescasilva/Kudos-Poyecto.git
```

### **Instalar dependecias: **
```
npm install
```

### **Configura las variables de entorno en un archivo .env**

colocar tu informacion de base de datos

PGHOST=localhost

PGDATABASE=[base-de-datos]

PGPORT=[puerto]

PGUSER=[usuario]

PGPASSWORD=[password]

PGADMINDATABASE=[admin-database]

PORT=[puerto]

CLIENT_ORIGIN=*

### **Características**

- Permite cargar datos

- Agregue un archivo controlador, para manejar la carga del archivos csv

- Cree un ruta /upload donde se realizara la carga de archivos

- Con la libreria multer pude subir archivos

- Agregue un archivo html para hacer la simulacion de subida de archivos

### **Realiza validaciones de los datos cargados**

- Con cvs parser lo utilice para leer los archivos csv

- **Al finalizar la lectura del archivo si hay datos que estan vacios y que no se cumplio con los requerimientos solcitados como el name, email, age y  role te envira los errores y en caso los datos sean correctos te mostrara todos los datos validados 

### **Requiere autenticación para acceder a ciertas funcionalidades**

- Agregue el archivo auth router para registro,login de un usuario y autenticacion de funcionalidade a admin. 

- Agregue middlewares para la autenticacion, autorizacion, errores y validacion.
 
 


 

