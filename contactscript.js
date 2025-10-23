// contactscript.js

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transition = 'transform 0.3s, box-shadow 0.3s';
            button.style.transform = 'scale(1.05)';
            button.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 14px 36px rgba(0, 0, 0, 0.06)';
        });
    });

    const contactCard = document.querySelector('.contact-card');
    contactCard.addEventListener('mouseenter', () => {
        contactCard.style.boxShadow = '0 30px 70px rgba(139,69,19,0.14)';
    });

    contactCard.addEventListener('mouseleave', () => {
        contactCard.style.boxShadow = 'var(--shadow)';
    });
});