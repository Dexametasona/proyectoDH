import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-100 font-sans">
    
      <section className="bg-white py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Nuestra Misión</h2>
        <p className="text-lg text-gray-700 text-center leading-relaxed max-w-4xl mx-auto">
          En <span className="font-bold text-primary">Game Yard</span>, nuestra misión es transformar cualquier celebración en una experiencia única y llena de alegría. Nos especializamos en el alquiler de juegos de feria diseñados para entretener a personas de todas las edades en cualquier tipo de evento: cumpleaños, bodas, eventos corporativos, festivales y más.
        </p>
      </section>

      <section className="bg-secondary py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Nuestros Objetivos</h2>
        <ul className="space-y-4 max-w-4xl mx-auto">
          <li className="flex items-center">
            <span className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-4">1</span>
            <p className="text-white text-lg">Llevar entretenimiento de alta calidad a cada evento.</p>
          </li>
          <li className="flex items-center">
            <span className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-4">2</span>
            <p className="text-white text-lg">Ofrecer una experiencia personalizada que se adapte a tus necesidades y las de tus invitados.</p>
          </li>
          <li className="flex items-center">
            <span className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-4">3</span>
            <p className="text-white text-lg">Crear momentos inolvidables que unan a las personas a través de la diversión.</p>
          </li>
        </ul>
      </section>

      <section className="bg-white py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">¡Elige tus Juegos Favoritos!</h2>
        <p className="text-lg text-gray-700 text-center leading-relaxed max-w-4xl mx-auto">
          Desde juegos clásicos como el tiro al blanco y la pesca de patitos hasta opciones modernas y dinámicas, contamos con una amplia variedad para garantizar que cada evento sea único y especial.
        </p>
      </section>

      <section className="bg-gray-100 py-12 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">¡Reserva Hoy!</h2>
        <p className="text-lg text-gray-700 text-center leading-relaxed max-w-4xl mx-auto mb-8">
          Dale un toque mágico y divertido a tu celebración con <span className="font-bold text-primary">Game Yard</span>. Completa el siguiente formulario para ponerte en contacto con nosotros y empezar a planear tu evento inolvidable.
        </p>
     </section>
    
    </div>
  );
};

export default ContactPage;
