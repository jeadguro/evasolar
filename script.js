
        // Animación del logo pieza por pieza
        document.addEventListener('DOMContentLoaded', function() {
            const progressBar = document.getElementById('progress-bar');
            const loadingScreen = document.getElementById('loading-screen');
            const animatedLogo = document.getElementById('animated-logo');
            const logoText = document.getElementById('logo-text');
            const tagline = document.getElementById('tagline');
            
            // Secuencia de animación
            const animationSequence = [
                { id: 'hoja', delay: 300 },      // Hoja primero
                { id: 'panel1', delay: 900 },    // Fila 1
                { id: 'panel2', delay: 1050 },
                { id: 'panel3', delay: 1200 },
                { id: 'panel21', delay: 1400 },  // Fila 2
                { id: 'panel22', delay: 1550 },
                { id: 'panel23', delay: 1700 },
                { id: 'panel31', delay: 1900 },  // Fila 3
                { id: 'panel32', delay: 2050 },
                { id: 'panel33', delay: 2200 },
            ];
            
            // Ejecutar animación
            animationSequence.forEach((item, index) => {
                setTimeout(() => {
                    const element = document.getElementById(item.id);
                    if (element) {
                        element.classList.add('visible');
                    }
                    // Actualizar barra de progreso
                    const progress = ((index + 1) / animationSequence.length) * 80;
                    progressBar.style.width = progress + '%';
                }, item.delay);
            });
            
            // Mostrar texto del logo
            setTimeout(() => {
                logoText.classList.add('visible');
                progressBar.style.width = '90%';
            }, 2600);
            
            // Mostrar tagline
            setTimeout(() => {
                tagline.classList.add('visible');
                progressBar.style.width = '100%';
            }, 2900);
            
            // Agregar efecto de brillo al completar
            setTimeout(() => {
                animatedLogo.classList.add('logo-complete');
            }, 3000);
            
            // Ocultar loading screen
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 3800);
        });

        // Header scroll
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Form to WhatsApp
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = this.querySelector('input[name="nombre"]').value;
            const telefono = this.querySelector('input[name="telefono"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const servicio = this.querySelector('select[name="servicio"]').value;
            const pago = this.querySelector('input[name="pago"]').value;
            const mensaje = this.querySelector('textarea[name="mensaje"]').value;
            
            const whatsappMsg = `¡Hola! Me gustaría cotizar:%0A%0A*Nombre:* ${nombre}%0A*Teléfono:* ${telefono}%0A*Email:* ${email}%0A*Servicio:* ${servicio}%0A*Pago de luz:* ${pago}%0A*Mensaje:* ${mensaje}`;
            window.open(`https://wa.me/526677950481?text=${whatsappMsg}`, '_blank');
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });