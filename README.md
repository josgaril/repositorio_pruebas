# repositorio_pruebas

El proyecto consta de dos subproyectos, un proyecto AppRest y un AppCliente. 
En este proyecto podremos listar, añadir, modificar y eliminar alumnos. Cada alumno puede tener cursos contratados. Se podrán contratar cursos para un alumno o eliminar los ya contratados.

--- 

## IMAGEN

![Página principal](https://github.com/josgaril/repositorio_pruebas/blob/master/scrennShoots/paginaPrincipal.png)

![Modal](https://github.com/josgaril/repositorio_pruebas/blob/master/scrennShoots/modal.png)

---

### SubProyectos

 1. AppCliente
	- Introducción
	
	En App cliente podemos gestionar el front-end del proyecto, gestionamos toda la interfaz gráfica para que el cliente pueda interactuar con la aplicación.

	- Tecnología usada
		
		Se utiliza HTML5, CSS3, JavaScript y Bootstrap 4.4. 	

	- Configuración
	
		- En el archivo pom.xml incluimos todas las dependencias necesarias(ubicado en la raiz de AppClient). 	
 	
		- En el archivo web.xml indicamos la url de mapeo para nuestra aplicación(ubicado en la carpeta WEbContent->WEBINF). En este caso es ** <url-pattern>/api/</url-pattern> ** 	
	
		- El endpoint del repositorio está configurado al principio del archivo main.js(ubicado en la carpeta js)
		 
 		- Las llamadas ajax se realizan a través de una función ubicada en el archivo ajax.js(ubicado en la carpeta js).  Para que se realice correcamente cada llamada ajax es necesario pasar varios parámetros en la función ( método, url, datos). Dentro de la función ajax se utiliza una promesa. Aquí podemos gestionar los códigos de estado de cada llamada, y lo que devolverá. 

2. AppRest

	- Introducción

	En appRest podemos gestionar el back-end del proyecto, gestionamos toda la lógica para que funcione correctamente, la conexión con la base de datos...

	- Tecnología usada

	Se utiliza JAVA, JAX-RX, mysql, maven
	
	- Configuración ( conexión a bbdd y logs )

		- La conexión a la bbdd se realiza desde la clase ConnectionManager.java, ubicada en el paquete com.ipartek.formacion.model.dao de los recursos Java. 

		- La configuración necesaria para la conexión la obetenemos del fichero context.xml, ubicado en la caperta WebContent->META-INF. Aquí indicamos parámetros importantes como el driver necesario, la url para indicar que bbdd utilizamos, el usuario, password...

		- Utilizamos LOGGER para mostrar información por pantalla en Eclipse y realizar un mejor seguimiento del transcurso de la aplicación. Para ello, Introducimos declaramos la variable : 


		`private static final Logger LOGGER = 	Logger.getLogger(PersonaController.class.getCanonicalName());`

		En este ejemplo se está utilizando LOGGER en la clase PersonaController. 
	
	- Detalle API rest con llamadas

	 Se utilizan llamadas para los modelos Persona y Curso.
	
	- Persona.  Configurado con el path: @Path("/personas")
	
		- @GET. getAll.  uri: `http://localhost:8080/apprest/api/personas/`

			- Devuelve todas las personas, código 200. 

		- @GET- getById.  uri: `http://localhost:8080/apprest/api/personas/{id}`

			- Devuelve la persona indicada			
			- Códigos de estado:
				- 200 en caso correcto, devuelve la persona.
				- 404 si no encuentra esa persona.
					
		- @POST. insert. uri: `http://localhost:8080/apprest/api/personas/`
			- Crear persona
			- Códigos de estado:
				- 201 en caso correcto, se crea la persona
				- 400 si no se cumplen las validaciones para crear persona
				- 409 si existen conflictos, por ejemplo, al introducir un nombre de persona que ya existe(tiene que ser único).

		- @PUT. update. uri: `http://localhost:8080/apprest/api/personas/{id}`

			- Modificar una persona

			- Códigos de estado:
				- 200 en caso correcto, modifica la persona
				- 400 si no se cumplen las validaciones al modificar persona
				- 404 si no encuentra la persona indicada				
				- 409 si existen conflictos, por ejemplo, al introducir un nombre de persona que ya existe(tiene que ser único).


		- @DELETE. delete uri: `http://localhost:8080/apprest/api/personas/{id}`

			- Eliminar una persona

			- Códigos de estado:
				- 200 en caso correcto, e la persona
				- 404 si no encuentra la persona indicada				
				- 409 si existen conflictos, por ejemplo, que la persona tenga cursos contratados.
		- @POST. contratarCurso. uri: `http://localhost:8080/apprest/api/personas/{id}/curso/{id}`

			- Contratar un curso para una persona
			- Códigos de estado:
				- 201 en caso correcto, contrata el curso para esa persona
				- 409 si existen conflictos, por ejemplo, no existe la persona o no exite el curso a contratar
		- @DELETE. eliminarCursoContratado uri: `http://localhost:8080/apprest/api/personas/{id}/curso/{id}`

			- Eliminar un curso de una persona
			- Códigos de estado:
				- 201 en caso correcto, eliminar el curso de esa persona
				- 404 si no encuentra la persona indicada o el curso				

	- Curso.  Configurado con el path: @Path("/cursos")
		- @GET. getAll.  uri: `http://localhost:8080/apprest/api/cursos/`

			- Devuelve todos los cursos, código 200. 
		- @GET- getById.  uri: `http://localhost:8080/apprest/api/cursos/{id}`

			- Devuelve el curso indicada			
			- Códigos de estado:
				- 200 en caso correcto, devuelve el curso.
				- 404 si no encuentra ese curso.
---

## Tags o Versiones

- v1.0final. Servicio REST funcionando para personas. (getAll, getByID, insert, update, delete)
- v2.0. Añadidas varias funcionalidades :
	- Servicio REST para curso (getAll y getByID).
	- Visualización de todos los cursos disponibles	
	- Visualización de todos los cursos contratados por cada alumno
	- Añadido a servicio REST de persona conratarCurso y eliminarCursoContratado.
- v.2.1. Añadida funcionalidad de animaciones.



