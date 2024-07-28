import { PlusIcon, ChevronsRightIcon, PenBox } from "lucide-react";

import { Drawer, DrawerClose, DrawerContent,  DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import HitoForm from "./form";
import { Hito } from "@/types/proyecto/Hito";
import { Button } from "@/components/ui/button";
import { useProjectDetail } from "../../contexto/proyecto-detail.context";

interface IProps {
  asEdit? : boolean,
  task? : Hito
}

export default function NewHitoModal(
  { asEdit, task } : IProps
) {
  const { setSelectedHito } = useProjectDetail()
  return (
    <Drawer direction="right">
      <DrawerTrigger
        asChild
      >
          
          {
          !asEdit ? (
            <Button className="bg-ceu-celeste text-white self-end mb-4" size={"sm"}>
                <PlusIcon />
                Añadir hito
            </Button>
          ) : (
            <Button
              size={"sm"}
              className="py-1.5 bg-ceu-azul"
              onClick={() => {
                if(task){
                  setSelectedHito(task)
                }
              }}
            >
              <PenBox size={16}/>
              <span className="sr-only">
                Editar tarea
              </span>
            </Button>
          )
        }
       
      </DrawerTrigger>
      <DrawerContent 
      className="py-0 h-[calc(100vh-80px)] bottom-0 right-0 left-auto mt-0 w-full lg:max-w-[60%] rounded-none
        overflow-hidden overflow-y-auto
      "
      style={
        {scrollbarWidth: 'thin'}
      }
      >
        <div data-vaul-no-drag>
          <DrawerHeader className="px-2 py-1.5">
              <DrawerClose>
                <ChevronsRightIcon size={18} />
                <span className="sr-only">
                    Cerrar formulario de hitos
                </span>
              </DrawerClose>
          </DrawerHeader>
          <div className="px-4 py-2">
            <HitoForm />
          </div>
         
        </div>
      </DrawerContent>
    </Drawer>
  );
}