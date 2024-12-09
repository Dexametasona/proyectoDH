'use client'
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAdminAlert, showGuardAuthAlert } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type GenericComponentProps = Record<string, unknown>;
const isAdminGuard = <P extends GenericComponentProps>(WrappedComponent: React.ComponentType<P>) => {
  const AuthGuard = (props: P) => {
    const { authData } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (authData === null) {
        showGuardAuthAlert({success:()=>router.push('/login')})
        return;
      }
      if(authData.rol!=0){
        showGuardAdminAlert({success:()=>router.push('/login')})
        
      }
    }, [authData, router]);

    if (authData === null) return null;
    if (authData.rol !== 0) return null;

    return (<WrappedComponent {... props}/>);
  };
  AuthGuard.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return AuthGuard;
};

export default isAdminGuard;