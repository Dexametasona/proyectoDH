"use client";
import LoginModal from "@/components/LoginModal";
import { useAuthContext } from "@/context/AuthContext";
import { useEffect, useState } from "react";

type GenericComponentProps = Record<string, unknown>;

const isAuthReserve = <P extends GenericComponentProps>(WrappedComponent: React.ComponentType<P>) => {
    const UserGuard = (props: P) => {
        const { authData } = useAuthContext();
        const [showModal, setShowModal] = useState(false);
        const [modalClosed, setModalClosed] = useState(false);
        
        useEffect(() => {
            if (!authData && !modalClosed) {
                setShowModal(true); // Solo muestra el modal si no está autenticado y no lo ha cerrado
            }
        }, [authData, modalClosed]);

        const handleCloseModal = () => {
            setShowModal(false); // Oculta el modal
            setModalClosed(true); // Marca que el usuario cerró manualmente el modal
        };

        if (!authData) {
            return (
                <>
                    {showModal && (
                        <LoginModal 
                            onClose={handleCloseModal} 
                        />
                    )}
                </>
            );
        }

        return <WrappedComponent {...props} />;
    };
    UserGuard.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"
        })`;
    return UserGuard;
};

export default isAuthReserve;
