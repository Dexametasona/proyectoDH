"use client";
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAuthAlert } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type GenericComponentProps = Record<string, unknown>;

const isAuth = <P extends GenericComponentProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  const UserGuard = (props: P) => {
    const { authData, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if(loading) return;
      if (authData === null || authData.rol != 1) {
        console.log('dentro del effect')
        showGuardAuthAlert({ success: () => router.push("/login") });
        return;
      }
    }, [authData, router, loading]);

    if ((authData === null || authData.rol != 1) && !loading) {
      console.log('fuera del effect')
      showGuardAuthAlert({ success: () => router.push("/login") });
      return;
    }

    return <WrappedComponent {...props} />;
  };
  UserGuard.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return UserGuard;
};

export default isAuth;
