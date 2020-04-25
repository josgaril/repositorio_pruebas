package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Noticia;

public class NoticiaDAO implements IDAO<Noticia> {
	
	private static final Logger LOGGER = Logger.getLogger(NoticiaDAO.class.getCanonicalName());
	
	private static final String SQL_ALL = "SELECT id, titulo, fecha, contenido FROM noticia ORDER BY fecha DESC";
	private static NoticiaDAO INSTANCE = null;
	
	public NoticiaDAO() {
		super();
	}
	
public synchronized static NoticiaDAO getInstance() {
	if (INSTANCE == null) {
		INSTANCE = new NoticiaDAO();
	}
	return INSTANCE;
}


	@Override
	public List<Noticia> getAll() {
		LOGGER.info("Obtener todas las noticias  disponibles");
		
		ArrayList<Noticia> noticias = new ArrayList<Noticia>();	
		
			try(Connection con = ConnectionManager.getConnection();
					PreparedStatement pst = con.prepareStatement(SQL_ALL);
					ResultSet rs = pst.executeQuery();)
				{
					LOGGER.info(pst.toString());
					
					while(rs.next()) {
						noticias.add(mapper(rs));
					}
			} catch (SQLException e) {
				e.printStackTrace();
			}
		return noticias;
	}
	
	private Noticia mapper(ResultSet rs) throws SQLException{
		Noticia n = new Noticia();
		n.setId(rs.getInt("id"));
		n.setTitulo(rs.getString("titulo"));
		n.setFecha(rs.getTimestamp("fecha"));
		n.setContenido(rs.getString("contenido"));
		return n;
	}

	@Override
	public Noticia getById(int id) throws Exception {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");

	}

	@Override
	public Noticia insert(Noticia pojo) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");

	}

	@Override
	public Noticia update(Noticia pojo) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");

	}

	@Override
	public Noticia delete(int id) throws Exception, SQLException {
		throw new UnsupportedOperationException("NO ESTA IMPLEMENTADO");

	}

	
	
}
