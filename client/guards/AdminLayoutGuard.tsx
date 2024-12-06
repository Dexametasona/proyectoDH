'use client'
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAdminAlert, showGuardAuthAlert } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { authData, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    console.log('Se ejecuto el effect')
    if(loading) return;
    console.log('se ejecuto cuando el loading termino')
    if (authData === null) {
      showGuardAuthAlert({success: () => router.push('/login')});
      return;
    }
    if (authData.rol !== 0) {
      showGuardAdminAlert({success: () => router.push('/login')});
    }
  }, [authData, router, loading]);

  if (loading ||authData === null || authData.rol !== 0) return null;

  return children;
}