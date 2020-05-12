# repositorio_pruebas

El proyecto consta de dos subproyectos, un proyecto AppRest y un AppCliente. 
En este proyecto podremos listar, añadir, modificar y eliminar alumnos. Cada alumno puede tener cursos contratados. Se podrán contratar cursos para un alumno o eliminar los ya contratados.

--- 

## IMAGENES

1. Página Principal. Página de Alumnos
![Página Alumnos](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/paginaAlumnos.png)

2. Modal para los cursos
![Modal](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/modal3.0.png)

3. Página de Noticias
![Página Noticias](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/paginaNoticias.png)

4. Página de Profesores
![Página Profesores](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/paginaProfesores.png)

5. Diseño Responsive
![Diseño Responsive](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/diseñoResponsive.png)

---

### SubProyectos

 1. AppCliente
	- Introducción
	
	En App cliente podemos gestionar el front-end del proyecto, gestionamos toda la interfaz gráfica para que el cliente pueda interactuar con la aplicación.

	- Tecnología usada
		
		Se utiliza HTML5, CSS3, JavaScript, JQuery y Bootstrap 4.4. 	

	- Configuración
	
		- El endpoint del repositorio está configurado al principio del archivo main.js(ubicado en la carpeta js)
		 
 		- Las llamadas ajax se realizan a través de una función ubicada en el archivo ajax.js(ubicado en la carpeta js).  Para que se realice correcamente cada llamada ajax es necesario pasar varios parámetros en la función ( método, url, datos). Dentro de la función ajax se utiliza una promesa. Aquí podemos gestionar los códigos de estado de cada llamada, y lo que devolverá. 

2. AppRest

	- Introducción

	En appRest podemos gestionar el back-end del proyecto, gestionamos toda la lógica para que funcione correctamente, la conexión con la base de datos...

	- Tecnología usada

	Se utiliza JAVA, JAX-RX, mysql, maven
	
	- Configuración ( conexión a bbdd y logs )

		- En el archivo pom.xml incluimos todas las dependencias necesarias(ubicado en el raiz de AppRest). 	
 	
		- En el archivo web.xml indicamos la url de mapeo para nuestra aplicación(ubicado en la carpeta WEbContent->WEBINF). En este caso es `<url-pattern>/api/</url-pattern>`
		
		- La conexión a la bbdd se realiza desde la clase ConnectionManager.java, ubicada en el paquete com.ipartek.formacion.model.dao de los recursos Java. 

		- La configuración necesaria para la conexión la obetenemos del fichero context.xml, ubicado en la caperta WebContent->META-INF. Aquí indicamos parámetros importantes como el driver necesario, la url para indicar que bbdd utilizamos, el usuario, password...

		- Utilizamos LOGGER para mostrar información por pantalla en Eclipse y realizar un mejor seguimiento del transcurso de la aplicación. Para ello, Introducimos declaramos la variable : 


		`private static final Logger LOGGER = 	Logger.getLogger(PersonaController.class.getCanonicalName());`

		En este ejemplo se está utilizando LOGGER en la clase PersonaController. 
		
		- EL script de la BBDD se encuentra en el raíz de AppRest.
		
		- El diagrama entidad-relación de la BBDD es el siguiente: 
		
		![Diagrama BBDD](https://github.com/josgaril/repositorio_pruebas/blob/version_3.0/scrennShoots/diagramaBBDD3.0.png)
		
		El nombre del curso y el título de la noticia son valores únicos, no pueden repetirse.
		Creado un índice de valor Único con los campos nombre y rol de una persona para que los alumnos o los profesores no puedan repetirse.

	
	- Detalle API rest con llamadas

		Se utilizan llamadas para los modelos Persona y Curso.
	
	   	+ Persona.  Configurado con el path: @Path("/personas")
	
			- @GET. (getAll) Utiliza @QueryParam("rol")  uri: `http://localhost:8080/apprest/api/personas/?rol={rol}`
				- Obtener personas por rol
				- Si el parámetro "rol" es nulo o está vació: 
					- Código de estado 200, devuelve todas las personas 
				- SI el parámetro "rol" es igual a "alumno":
					- Código de estado 200 si encuentra los alumnos
					- Código de estado 400 si tiene una error al conectar con la BD o en la sentencia SQL
				- SI el parámetro "rol" es igual a "profesor":
					- Código de estado 200 si encuentra los profesores
					- Código de estado 400 si tiene una error al conectar con la BD o en la sentencia SQL

		    	- @GET. (getById)  uri: `http://localhost:8080/apprest/api/personas/{id}`

				- Devuelve la persona indicada			
				- Códigos de estado:
					- 200 en caso correcto, devuelve la persona.
					- 404 si no encuentra esa persona.

			- @POST. (insert) uri: `http://localhost:8080/apprest/api/personas/`
				- Agregar persona
				- Códigos de estado:
					- 201 en caso correcto, se agrega la persona
					- 400 si no se cumplen las validaciones para agregar persona
					- 409 si existen conflictos, por ejemplo, al introducir un nombre de persona que ya existe(tiene que ser único).

			- @PUT. (update) uri: `http://localhost:8080/apprest/api/personas/{id}`

				- Modificar una persona

				- Códigos de estado:
					- 200 en caso correcto, modifica la persona
					- 400 si no se cumplen las validaciones al modificar persona
					- 404 si no encuentra la persona indicada				
					- 409 si existen conflictos, por ejemplo, al introducir un nombre de persona que ya existe(tiene que ser único).


			- @DELETE. (delete) uri: `http://localhost:8080/apprest/api/personas/{id}`

				- Eliminar una persona

				- Códigos de estado:
					- 200 en caso correcto, e la persona
					- 404 si no encuentra la persona indicada				
					- 409 si existen conflictos, por ejemplo, que la persona tenga cursos contratados.
		
			- @POST. (contratarCurso) uri: `http://localhost:8080/apprest/api/personas/{id}/curso/{id}`

				- Contratar un curso para una persona
				- Códigos de estado:
					- 201 en caso correcto, contrata el curso para esa persona
					- 409 si existen conflictos, por ejemplo, no existe la persona o no exite el curso a contratar
			
			- @DELETE. (eliminarCursoContratado) uri: `http://localhost:8080/apprest/api/personas/{id}/curso/{id}`

				- Eliminar un curso de una persona
				- Códigos de estado:
					- 201 en caso correcto, eliminar el curso de esa persona
					- 404 si no encuentra la persona indicada o el curso				

		+ Curso.  Configurado con el path: @Path("/cursos")

			- @GET. (getAll) Utiliza @QueryParam("filtro") uri: `http://localhost:8080/apprest/api/cursos/?filtro={filtro}`
				
				- Obtener cursos por nombre
				- Si el filtro es nulo o está vacío, devuelve todos los cursos.
				- En caso contrario, devuelve el curso indicado en el filtro. 
				- Código de estado: 
					- 200 en ambos casos.
				
			- @GET. (getById)  uri: `http://localhost:8080/apprest/api/cursos/{id}`

				- Devuelve el curso indicada			
				- Códigos de estado:
					- 200 en caso correcto, devuelve el curso.
					- 404 si no encuentra ese curso.
			- @PUT. (update) uri: `http://localhost:8080/apprest/api/cursos/{id}`
				
				- Modificar un curso

				- Códigos de estado:
					- 200 en caso correcto, modifica el curso
					- 400 si no se cumplen las validaciones al modificar el curso
					- 404 si no encuentra la el curso indicado				
					- 409 si existen conflictos, por ejemplo, al introducir un nombre de un curso que ya existe(tiene que ser único).
				
		+ Noticias.  Configurado con el path: @Path("/noticias")
		
			- @GET. (getAll)  uri: `http://localhost:8080/apprest/api/noticias/`
				
				- Devuelve todas las noticias. 
				- Cödigo de estado 200.
---

## Tags o Versiones

- v1.0final. Servicio REST funcionando para personas. (getAll, getByID, insert, update, delete)
- v2.0. Añadidas varias funcionalidades:
	- Servicio REST para curso (getAll y getByID).
	- Visualización de todos los cursos disponibles	
	- Visualización de todos los cursos contratados por cada alumno
	- Añadido a servicio REST de persona conratarCurso y eliminarCursoContratado.
- v2.1. Añadida funcionalidad de animaciones.
- v2.2.0 Mejorado control de errores al contratar curso, añadidos comentarios, organización css de index.css
- v2.3.0 Actualizado script BBDD y añadida llamada al servicio rest para noticias (petición GET para mostrar todas las noticias en otra página a través del botón Ver noticias).
- v2.4.0 Index responsive y mejor organización del código. Noticias ordenadas descendientemente y actualizadas imágenes del proyecto.
- v.2.5.0 Diferentes cambios en el proyecto:
	- Modificada llamada GET en PersonasController para poder obtener personas por nombre.
	- Al insertar o modificar una persona, en el formulario se indica si el nombre está o no disponible.
	- Contenido de noticas cambiado a LONGTEXT para poder meter HTML.
	- Actualizado script BBDD.
	- Código limpio y organizado.
	- Reestructuración de los archivos del repositorio.
	- Añadida documentación a los modelos Persona, Curso y Noticia.
- v.3.0
	- Añadida funcionalidad Gestión de profesores(alta, baja, modificación y gestión de cursos asignados).
	- Diseño responsive actualizado
- v.3.1.0 
	- Agregada funcionalidad filtrar personas por nombre e indicar si esá disponible o no el nombre en el formulario.
	- Agregado botón Cancelar en el formulario para cancelar los cambios del alumno o profesor.
- v3.2.0
	- Controlado numero de caracteres del nombre de una persona en el filtro por nombre.
	- Vaciar formulario al eliminar una persona.
