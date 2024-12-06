"use client";
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAuthAlert } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type GenericComponentProps = Record<string, unknown>;

const isAuth = <P extends GenericComponentProps>(WrappedComponent: React.ComponentType<P>) => {
  const UserGuard = (props: P) => {
    const { authData } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (authData === null){
        showGuardAuthAlert({success:()=>router.push('/login')})
      }
    }, [authData, router]);
    
    if (authData === null){
      showGuardAuthAlert({success:()=>router.push('/login')})
    };

    return <WrappedComponent {...props} />;
  };
  UserGuard.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;
  return UserGuard;
};

export default isAuth;
