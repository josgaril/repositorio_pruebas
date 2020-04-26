package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;

public class CursoDAO implements IDAO<Curso>{
    private static final Logger LOGGER = Logger.getLogger(CursoDAO.class.getCanonicalName());
        
    private static CursoDAO INSTANCE = null;
    
    private static final String SQL_GET_ALL = 
            "   SELECT \n" + 
            "   c.id as curso_id, \n" + 
            "   c.nombre as curso_nombre, \n" + 
            "   c.imagen as curso_imagen, \n" + 
            "   c.precio as curso_precio,\n" + 
            "   pf.id as profesor_id, \n" + 
            "   pf.nombre as profesor_nombre, \n" + 
            "   pf.avatar as profesor_avatar, \n" + 
            "   pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
            "   FROM curso c \n" + 
            "   JOIN persona pf ON c.profesor = pf.id \n" + 
            "   ORDER BY c.id desc\n" + 
            "   LIMIT 500";

    private static final String SQL_GET_ALL_FILTER =             
    		"   SELECT \n" + 
            "   c.id as curso_id, \n" + 
            "   c.nombre as curso_nombre, \n" + 
            "   c.imagen as curso_imagen, \n" + 
            "   c.precio as curso_precio,\n" + 
            "   pf.id as profesor_id, \n" + 
            "   pf.nombre as profesor_nombre, \n" + 
            "   pf.avatar as profesor_avatar, \n" + 
            "   pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
            "   FROM curso c \n" + 
            "   JOIN persona pf ON c.profesor = pf.id \n" + 
            "   WHERE c.nombre LIKE ? \n" + 	
            " 	ORDER BY c.id desc\n" + 
            "	LIMIT 100";

    private static final String SQL_GET_BY_ID =             
    		"   SELECT \n" + 
            "   c.id as curso_id, \n" + 
            "   c.nombre as curso_nombre, \n" + 
            "   c.imagen as curso_imagen, \n" + 
            "   c.precio as curso_precio,\n" + 
            "   pf.id as profesor_id, \n" + 
            "   pf.nombre as profesor_nombre, \n" + 
            "   pf.avatar as profesor_avatar, \n" + 
            "   pf.sexo as profesor_sexo, \n" + 
			"	pf.rol as profesor_rol \n" + 
            "   FROM curso c \n" + 
            "   JOIN persona pf ON c.profesor = pf.id \n" + 
            "   WHERE c.id = ?";

	private static final String SQL_ALL_CURSOS_PROFESOR = "	SELECT * FROM curso WHERE profesor = ?";

    private CursoDAO() {
        super();
    }
    
    public synchronized static CursoDAO getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new CursoDAO();
        }
        return INSTANCE;
    }
    
    @Override
    public List<Curso> getAll() {
        LOGGER.info("Obtener todos los cursos disponibles");
        
        ArrayList<Curso> cursos = new ArrayList<Curso>();
        
        try(Connection con = ConnectionManager.getConnection();
                PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
                ResultSet rs = pst.executeQuery();)
            {   
                LOGGER.info(pst.toString());
                    
                while (rs.next()) {
                    cursos.add(mapper(rs)); 
                }
            }catch (SQLException e) {
                e.printStackTrace();
            }
        
        return cursos;
    }
    
    
        public List<Curso> getAllFilter(String filtro) throws Exception{
        LOGGER.info("Obtener todos los cursos disponibles con filtro: " + filtro);
        
        ArrayList<Curso> cursos = new ArrayList<Curso>();
        
        try(Connection con = ConnectionManager.getConnection();
                PreparedStatement pst = con.prepareStatement(SQL_GET_ALL_FILTER);)
        
        {
            pst.setString(1, '%' + filtro + '%');
            LOGGER.info(pst.toString());
                
            try (ResultSet rs = pst.executeQuery()){

                    while (rs.next()) {
                        cursos.add(mapper(rs)); 
                    }
                }
            }catch (SQLException e) {
                e.printStackTrace();
            }
        
        return cursos;
    }

    @Override
    public Curso getById(int id) throws Exception {
        
        Curso curso = null;
        try(Connection con = ConnectionManager.getConnection();
            PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);)
        {   
            pst.setInt(1, id);
            LOGGER.info(pst.toString());
            
            try(ResultSet rs = pst.executeQuery()){
                
                if (rs.next()) {
                    curso = mapper(rs);
                }else {
                    throw new Exception("No se ha encontrado el curso (" + id + ")" );
                }
                
            }catch(SQLException e) {
                e.printStackTrace();
                throw new SQLException("Error al acceder a los registros de cursos disponibles");   
            }
        }catch (Exception e) {
                e.printStackTrace();
                throw new Exception("No se ha podido obtener el curso (" + id + ")" );  
        }
        return curso;
    }

    /*
    public List<Curso> getAllCursosProfesor(int id) throws Exception{
        ArrayList<Curso> cursos = new ArrayList<Curso>();

  		  //Curso curso = null; 
  	  
  		  try(Connection con = ConnectionManager.getConnection(); 
  			  PreparedStatement pst = con.prepareStatement(SQL_ALL_CURSOS_PROFESOR);){
  	  
		  	  pst.setInt(1, id); 
		  	  LOGGER.info(pst.toString());
		  	  
		  	  try(ResultSet rs = pst.executeQuery()){
		  	  
			  	  //if (rs.next()) { 
			  		  //cursos.add(mapper(rs)); 
			  		  while (rs.next()) { 
				  		  cursos.add(mapper(rs)); 
			  		  } 
			  	  //}else { 
			  		  //throw new Exception("El profesor no tiene ningun curso: " + id); 
			  	  //} 			  	   
		  	  }catch(SQLException e) {
		  		  throw new Exception("No se encuentra el profesor");
		  	  }
  		  }  	 
  		 return cursos;
  	  }
  	  */
    
    @Override
    public Curso insert(Curso pojo) throws Exception, SQLException {
        throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
    }

    @Override
    public Curso update(Curso pojo) throws Exception, SQLException {
        throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
    }

    @Override
    public Curso delete(int id) throws Exception, SQLException {
        throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");
    }

    private Curso mapper(ResultSet rs) throws SQLException{
        Curso c = new Curso();
        c.setId(rs.getInt("curso_id"));
        c.setNombre(rs.getString("curso_nombre"));
        c.setImagen(rs.getString("curso_imagen"));
        c.setPrecio(rs.getFloat("curso_precio"));
        
        Persona profesor = new Persona();
        profesor.setId(rs.getInt("profesor_id"));
        profesor.setNombre(rs.getString("profesor_nombre"));
        profesor.setAvatar(rs.getString("profesor_avatar"));
        profesor.setSexo(rs.getString("profesor_sexo"));
        profesor.setRol(rs.getInt("profesor_rol"));

        c.setProfesor(profesor);
        return c;
    }
}
