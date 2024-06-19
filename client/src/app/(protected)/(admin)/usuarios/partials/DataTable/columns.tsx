"use client"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/DataTable/column-header"
import { Usuario } from "@/types/usuario"
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash2Icon } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import DeleteUserDialog from "../dialogs/delete"

function getBadgeByRol(rol: string){
    switch(rol){
      case "ROLE_ADMIN":
        return <Badge variant="success">Administrador</Badge>
      case "ROLE_CLIENTE":
        return <Badge variant="ghost">Cliente</Badge>
      case "ROLE_CONSULTOR":
        return <Badge variant="default">Consultor</Badge>
      default:
        return <Badge variant="outline">Cliente</Badge>
    }
}

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "name",
    id: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo electrónico",
  },
  {
    accessorKey: "roles",
    id: "roles",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Rol" />
    ),
    cell: ({row}) => {
      const roles =  row.original.roles
      return getBadgeByRol(roles[0].rol)
    },
    filterFn: (rows, id, value) => {
      const original = rows.original.roles
      return original.some((rol) => rol.rol.toLowerCase() === value) 
    }
  },
  {
    accessorKey: "enabled",
    id: "enabled",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Activo" />
    ),
    cell: ({row}) => {
      const usuario = row.original
      return (  
          <Badge variant={usuario.enabled ? "success" : "ghost"}>
            {usuario.enabled ? "Sí" : "No"}
          </Badge>
      )
    } 
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <div className="flex gap-2">
          <Link
            href={`/usuarios/${user.id}`}
          >
            <Button className="py-1.5 h-fit" variant="link" size={"sm"}>
              <Edit size={16}/>
            </Button>
          </Link>
          <DeleteUserDialog user={user} />
        </div>
      )
    },
  },
]
