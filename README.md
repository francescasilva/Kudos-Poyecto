# Kudos-Poyecto 
##  Validación de archivos CSV  con Autenticación

### Funcionalidad

Es una aplicación Back-End que nos permita a los usuarios autenticados, específicamente con rol de `admin`, cargar archivos CSV para la creación de registros en una base de datos PostgreSQL. La aplicación  valida los datos del archivo CSV, permite la corrección de registros inválidos y asegura que solo usuarios autorizados realicen la carga de datos.

### Tecnologías usadas:

![image](https://github.com/francescasilva/Kudos-Poyecto/assets/151888611/23efd090-68f2-4c41-a63f-142b9d53871c)

- **Node**: nos permite desarrollar la aplicacion del lado del servidor
- **Express**: para manejar la lógica del servidor.
- **PostgreSQL**: para almacenamiento de datos.
- **Middlewares**: Autenticación/Autorización, Uso de JWT para manejar sesiones de usuario y control de acceso.
- **Testing:** Vitest/Supertest
- **TypeScript**: lenguaje de programcación
  
### Endpoints

- **Autenticación**: Endpoint `/login` para autenticación de usuarios, que verifica credenciales (email y password) y retorna un token JWT.
- **Carga de Datos**: Endpoint `/upload` protegido con middleware de autorización, para la carga y procesamiento de archivos CSV.


### **Procesamiento de Archivos CSV**

- Recibe archivo CSV en endpoint `/upload`
- Valida el archivo CSV (name, email, age)
- Generar una respuesta de registros exitosos y/o  errores  por registro
- El file upload maneja la carga de archivos
- La libreria multer nos ayuda a cargar los  archivos
- El archivo html  hace la simulacion de carga de archivos
 
### **Realiza validaciones de los datos cargados**

- Con cvs parser cumple la funcion leer los archivos csv
- Al finalizar la lectura del archivo si hay datos que estan vacios y que no se cumplio con los requerimientos solicitados como el name, email, age y  role te enviara los errores y en caso los datos sean correctos te mostrara todos los datos validados
  
```json
{
  "ok": true,
  "data": {
    "success": [
      {
        "id": 1,
        "name": "Thiago Silva",
        "email": "thiago.silva@example.com",
        "age": 10
      }
      // Otros registros exitosos...
    ],
    "errors": [
      {
        "row": 4,
        "details": {
          "name": "El campo 'name' no puede estar vacío.",
          "email": "El formato del campo 'email' es inválido.",
          "age": "El campo 'age' debe ser un número positivo."
        }
      }
      // Otros registros con errores...
    ]
  }
}
```

### **Requiere autenticación para acceder a ciertas funcionalidades**

-  El archivo auth router nos ayuda con el registro,login de un usuario y autenticacion de funcionalidades a admin. 
- Agregue middlewares para la autenticacion, autorizacion, errores y validacion.
  
### **Para instalar y ejecutar el proyecto, sigue estos pasos**
```
git clone git@github.com:francescasilva/Kudos-Poyecto.git
```

### **Instalar dependencias**
```
npm install
```

### **Configura las variables de entorno en un archivo .env**

- Colocar tu informacion de base de datos:

```bash
PGHOST=localhost

PGDATABASE=[base-de-datos]

PGPORT=[puerto]

PGUSER=[usuario]

PGPASSWORD=[password]

PGADMINDATABASE=[admin-database]

PORT=[puerto]

CLIENT_ORIGIN=*
```
### **Utiliza en siguiente comando para inicializar el proyecto**
```
npm run dev
```
## **Despliegue en Render**

`<link>` : <https://kudos-poyecto.onrender.com/upload>






 
 


 

