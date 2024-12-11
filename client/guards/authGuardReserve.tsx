"use client";
import LoginModal from "@/components/LoginModal";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

type GenericComponentProps = Record<string, unknown>;

const isAuthReserve = <P extends GenericComponentProps>(WrappedComponent: React.ComponentType<P>) => {
    const UserGuard = (props: P) => {
        const { authData } = useAuthContext();
        const [showModal, setShowModal] = useState(false);
        
        
        useEffect(() => {
            if (authData === null) {
                setShowModal(true); // Mostrar el modal si no está autenticado
            } else {
                setShowModal(false); // Ocultar el modal si está autenticado
            }
        }, [authData]);

        
        if (showModal) {
            return <LoginModal/>;
        }

        return <WrappedComponent {...props} />;
    };
    UserGuard.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"
        })`;
    return UserGuard;
};

export default isAuthReserve;
