'use client'
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAuthAlert } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { authData , loading} = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && authData === null) {
      showGuardAuthAlert({ success: () => router.push("/login") });
    }
  }, [authData, router, loading]);
  if(loading || authData === null) return null;

  return children;
};

export default AuthGuard;
