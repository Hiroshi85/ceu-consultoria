package com.arcticcuyes.gestion_proyectos.models;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="PARTICIPANTE", uniqueConstraints = {@UniqueConstraint(name="UniqueConsultorProyecto", columnNames = {"id_consultor", "id_proyecto"})})
public class Participante {
    @Id
    @Column(name="id_participante")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long idParticipante;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name="created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_proyecto", nullable = false)
    private Proyecto proyectoIngresado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_consultor", nullable = false)
    private Consultor consultorParticipante;

    @ManyToMany(mappedBy = "participantesAsignados")
    private Set<Tarea> tareas = new HashSet<>();
}