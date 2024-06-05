import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth/options";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <> {children} </>;
}
