"use client"
import {  signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/AppBar";
import { useRouter } from "next/navigation";
import Login from "../app/api/signin/page"

export function AppbarClient() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={Login} onSignout={async () => {
        await signOut()
        router.push("/signin")
      }} user={session?.user} />
   </div>
  );
}