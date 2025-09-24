document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const proposalCard = document.querySelector('.proposal-card');
    const acceptBtn = document.getElementById('accept-btn');
    const rejectBtn = document.getElementById('reject-btn');
    const buttonsContainer = document.querySelector('.buttons-container');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.heading-1, .sub-heading, .text-large, .proposal-card').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Lógica de los botones ---
    
    // Función para el redireccionamiento a WhatsApp
    function handleAccept() {
        const numeroTelefono = '593978976404';
        const mensajeWhatsapp = `Hola Sebastian. Sí, acepto. <3`;
        const whatsappURL = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensajeWhatsapp)}`;
        window.open(whatsappURL, '_blank');
    }

    // Lógica para el botón de Aceptar
    acceptBtn.addEventListener('click', handleAccept);

    // Lógica para el botón de Rechazar
    rejectBtn.addEventListener('click', () => {
        buttonsContainer.style.opacity = '0';
        buttonsContainer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            // Cambiar los botones de posición y apariencia
            acceptBtn.textContent = 'Rechazar';
            acceptBtn.classList.remove('btn-green');
            acceptBtn.classList.add('btn-red');
            acceptBtn.removeEventListener('click', handleAccept);
            
            rejectBtn.textContent = 'Aceptar';
            rejectBtn.classList.remove('btn-red');
            rejectBtn.classList.add('btn-green');
            rejectBtn.removeEventListener('click', () => {});
            rejectBtn.addEventListener('click', handleAccept);

            buttonsContainer.style.opacity = '1';
            buttonsContainer.style.transform = 'scale(1)';
        }, 500); // Duración de la animación
    });

});