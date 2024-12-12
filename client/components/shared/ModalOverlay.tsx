const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="fixed top-0 left-0 z-20 w-screen h-screen bg-black/70 grid place-items-center">
      {children}
    </section>
  );
};

export default ModalOverlay;
