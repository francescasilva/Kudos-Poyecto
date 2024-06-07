# Kudos-Poyecto 

Es un sistema de carga y validacion de datos con autenticacion 

**Para instalar y ejecutar el proyecto, sigue estos pasos**

git clone git@github.com:francescasilva/Kudos-Poyecto.git

**Instalar dependecias: **
```
npm install
```
![TypeScript Icon](![image](https://github.com/francescasilva/Kudos-Poyecto/assets/151888611/7a5003c5-d9e6-45c2-91c0-2b789117c960)
)
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
 
 


 

