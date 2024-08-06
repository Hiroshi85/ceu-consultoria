package com.arcticcuyes.gestion_proyectos.services;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.arcticcuyes.gestion_proyectos.models.Participante;
import com.arcticcuyes.gestion_proyectos.models.Recurso;
import com.arcticcuyes.gestion_proyectos.models.Usuario;
import com.arcticcuyes.gestion_proyectos.repositories.RecursoRepository;

@Service
public class RecursoService {
    @Autowired
    private RecursoRepository recursoRepository;

    @Autowired
    private ProyectoService proyectoService;

    @Autowired
    private StorageService storageService;

    public Recurso crearRecurso(MultipartFile multipartFile, Recurso recurso){
        if(recurso.isEsArchivo() && multipartFile != null){
            Recurso recurso2 = storageService.uploadFilesRelatedToProject(
            multipartFile, 
            recurso.getProyectoAsociado().getIdProyecto(), 
            recurso.getEntregableAsociado().getIdEntregableProyecto(),
            recurso.getPropietario());
            return recurso2;
        }
        
        Recurso recursoEnlace = recursoRepository.save(recurso);
        return recursoEnlace;
    }

    public List<Recurso> getAllRecursosByIdProyecto(Long idProyecto, Usuario user){
        if(user.getRoles().stream().map(rol -> rol.getRol()).toList().contains("ROLE_ADMIN")){
            return recursoRepository.findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(idProyecto);
        }

        List<Participante> participantes = proyectoService.getParticipantesProyecto(idProyecto);
        for (Participante part : participantes) {
            if(part.getConsultorParticipante().getUsuarioConsultor().getId() == user.getId()){
                return recursoRepository.findByProyectoAsociadoIdProyectoAndEntregableAsociadoNull(idProyecto);
            }
        }

        return null;
    }

    public Recurso getRecursoById(Long idRecurso, Long idProyecto, Usuario user){
        if(user.getRoles().stream().map(rol -> rol.getRol()).toList().contains("ROLE_ADMIN")){
            return recursoRepository.findById(idRecurso).orElse(null);
        }

        List<Participante> participantes = proyectoService.getParticipantesProyecto(idProyecto);
        for (Participante part : participantes) {
            if(part.getConsultorParticipante().getUsuarioConsultor().getId() == user.getId()){
                return recursoRepository.findById(idRecurso).orElse(null);
            }
        }
        return null;
    }
}
