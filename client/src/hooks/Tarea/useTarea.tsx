"use client";

import HandleServerResponse from "@/lib/handle-response";
import { fetcherLocal } from "@/server/fetch/client-side";
import { TareaDTO } from "@/types/proyecto/Tarea/dto/TareaDTO";
import { toast } from "sonner";

export default function useTarea() {

  async function updateTarea(tarea: TareaDTO, idTarea:number): Promise<boolean> {
    const toastId = toast.loading("Guardando ...");
    // Si el idHito existe, se actualiza el registro
    try {
      const response = await fetcherLocal(`/tareas/${idTarea}`, {
        method: "PUT",
        body: JSON.stringify(tarea)
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al actualizar tarea");
      }
      toast.success("Tarea actualizada", {
        id: toastId
      });
      return ok;
    } catch (e) {
      console.error(e);
      toast.error("Error al actualizar la tarea", {
        id: toastId
      });
      throw new Error("Error al actualizar tarea");
    }
  }

  async function deleteTarea(id: number) {
    const toastId = toast.loading("Eliminado ...");

    try {
      const response = await fetcherLocal(`/tareas/${id}`, {
        method: "DELETE"
      });
      const ok = await HandleServerResponse(response, undefined, toastId);
      if (!ok) {
        throw new Error("Error al eliminar el registro");
      }
      toast.success("Tarea eliminada", {
        id: toastId
      });
      return ok;
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar el registro", {
        id: toastId
      });
      throw new Error("Error al eliminar tarea");
    }
  }

  return {
    updateTarea,
    deleteTarea
  };
}