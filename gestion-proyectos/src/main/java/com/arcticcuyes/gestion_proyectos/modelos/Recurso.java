package com.arcticcuyes.gestion_proyectos.modelos;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="RECURSO")
public class Recurso {
    @Id
    @Column(name="id_recurso")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idRecurso;

    @Column(nullable = false, length = 50)
    private String titulo;

    @Column(nullable = false, length = 500)
    private String enlace;

    @Basic
    private boolean activo = true;

    @Column(name="es_archivo", nullable = false)
    private boolean esArchivo = true;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_proyecto", referencedColumnName = "id_proyecto")
    private Proyecto proyectoAsociado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_tarea", referencedColumnName = "id_tarea")
    private Tarea tareaAsociada;

}