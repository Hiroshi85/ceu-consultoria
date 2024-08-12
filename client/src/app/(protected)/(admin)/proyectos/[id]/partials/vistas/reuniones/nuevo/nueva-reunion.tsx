"use client"
import { Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from '@/app/(protected)/(admin)/proyectos/[id]/partials/contexto/proyecto-detail.context';
import { Tarea } from "@/types/proyecto/Tarea";
import { useRef } from "react";
import NewReunionForm from "./form";

interface IProps {
  task? : Tarea
}

export default function AddReunionDialog(
  { task} : IProps
) {
  const { setSelectedTask, selectedTask, tareaForm } = useProjectDetail()
  const dialogRef = useRef(null)
  
  return (
    <Dialog 
      onOpenChange={(isOpen) => {
        if(!isOpen && selectedTask){
          // Reinicia los valores del formulario
          setSelectedTask(null)
          tareaForm.reset({
            titulo: "Nueva tarea",
            fechaFin: new Date(),
            fechaInicio: new Date(),
            descripcion: "",
            estado: 0,
            participantesAsignados: [],
            subtareas: []
          })
        }
      }}
    >
      <DialogTrigger
        asChild
        ref={dialogRef}
      >
         <Button className="flex items-center gap-2" variant={"default"} size={"sm"}>
          <Video size={20} />
          <span>Crear reunión</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] max-h-[550px] overflow-hidden overflow-y-auto" 
        style={
          {scrollbarWidth: 'thin'}
        }
      >
        <DialogTitle className="text-ceu-celeste">
            {
                task ? `Editar tarea ${task.titulo}` : `Nueva tarea` 
            }
        </DialogTitle>
        <NewReunionForm />
      </DialogContent>
    </Dialog>
  );
}
