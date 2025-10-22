// /c:/Users/Natanael_VR/Desktop/semestre II/PLat. colab.digit/PCD_WEB_RKJJE/java.js
// GitHub Copilot
// Animaciones profesionales para logos y elementos HTML.
// Uso: incluye este archivo y añade clases:
//  - .logo-animate  (hover: escala/rotación)
//  - .logo-shimmer  (efecto brillo desplazable)
//  - .card-reveal   (aparecer al hacer scroll)
//  - .svg-draw      (trazar path SVG automáticamente)
//  - .btn-micro     (ripple en click)
//  - cualquier elemento con data-parallax-speed="0.2" para parallax

(() => {
    // Inject basic CSS needed for animations
    const css = `
    .logo-animate { transition: transform 400ms cubic-bezier(.2,.9,.3,1), filter 350ms; will-change: transform, filter; transform-origin: center; }
    .logo-animate.hovered { transform: scale(1.06) rotate(-3deg); filter: drop-shadow(0 8px 18px rgba(0,0,0,0.12)); }

    .logo-shimmer { position: relative; overflow: hidden; }
    .logo-shimmer::after {
        content: ''; position: absolute; left:-150%; top:0; width:250%; height:100%;
        background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%);
        transform: translateX(0); transition: transform 1.8s ease-in-out;
        pointer-events: none;
    }
    .logo-shimmer.shimmering::after { transform: translateX(60%); transition-duration: 1.2s; }

    .card-reveal { opacity: 0; transform: translateY(18px) scale(0.995); transition: opacity 520ms ease, transform 520ms cubic-bezier(.2,.9,.3,1); will-change: opacity, transform; }
    .card-reveal.in-view { opacity: 1; transform: translateY(0) scale(1); }

    .btn-micro { position: relative; overflow: hidden; }
    .btn-micro .ripple { position: absolute; border-radius: 50%; transform: scale(0); background: rgba(255,255,255,0.35); pointer-events: none; }

    .svg-draw path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1s cubic-bezier(.2,.9,.3,1); }
    .svg-draw.drawn path { stroke-dashoffset: 0; }

    /* small utilities */
    .parallax-elem { will-change: transform; transition: transform 120ms linear; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Helpers
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // Logo hover animation
    function bindLogoHover(root = document) {
        root.querySelectorAll('.logo-animate').forEach(el => {
            if (el._logoHoverBound) return; el._logoHoverBound = true;
            el.addEventListener('mouseenter', () => el.classList.add('hovered'));
            el.addEventListener('mouseleave', () => el.classList.remove('hovered'));
            // small idle pulse
            let pulse;
            el.addEventListener('mouseover', () => {
                pulse = setInterval(() => {
                    el.animate([{ transform: 'scale(1.00)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1.00)' }], { duration: 900, easing: 'ease-in-out' });
                }, 1400);
            });
            el.addEventListener('mouseout', () => clearInterval(pulse));
        });
    }

    // Shimmer effect toggle (useful for logos or badges)
    function bindShimmer(root = document, options = { interval: 2800 }) {
        const els = Array.from(root.querySelectorAll('.logo-shimmer'));
        if (!els.length) return;
        let idx = 0;
        setInterval(() => {
            if (els.length === 0) return;
            els.forEach((e, i) => e.classList.toggle('shimmering', i === idx));
            idx = (idx + 1) % els.length;
        }, options.interval);
    }

    // Scroll reveal using IntersectionObserver
    function bindReveal(root = document) {
        const observer = new IntersectionObserver((entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.classList.add('in-view');
                } else {
                    // optionally remove if you want re-trigger
                    // e.target.classList.remove('in-view');
                }
            }
        }, { threshold: 0.14 });
        root.querySelectorAll('.card-reveal').forEach(el => observer.observe(el));
    }

    // SVG stroke draw animation
    function bindSvgDraw(root = document) {
        root.querySelectorAll('.svg-draw').forEach(svg => {
            if (svg._svgDrawBound) return; svg._svgDrawBound = true;
            const paths = svg.querySelectorAll('path, line, polyline, polygon');
            paths.forEach(p => {
                try {
                    const len = p.getTotalLength ? p.getTotalLength() : p.getBoundingClientRect().width;
                    p.style.strokeDasharray = len;
                    p.style.strokeDashoffset = len;
                } catch (err) { /* ignore */ }
            });
            // trigger draw when visible
            const io = new IntersectionObserver((entries, obs) => {
                entries.forEach(en => {
                    if (en.isIntersecting) {
                        svg.classList.add('drawn');
                        obs.unobserve(svg);
                    }
                });
            }, { threshold: 0.1 });
            io.observe(svg);
        });
    }

    // Button ripple effect
    function bindButtonMicro(root = document) {
        root.querySelectorAll('.btn-micro').forEach(btn => {
            if (btn._rippleBound) return; btn._rippleBound = true;
            btn.addEventListener('click', e => {
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                const size = Math.max(rect.width, rect.height) * 1.6;
                ripple.style.width = ripple.style.height = size + 'px';
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.opacity = '0.9';
                btn.appendChild(ripple);
                ripple.animate([{ transform: 'scale(0)', opacity: 0.9 }, { transform: 'scale(1)', opacity: 0 }], { duration: 600, easing: 'cubic-bezier(.2,.9,.3,1)' });
                setTimeout(() => ripple.remove(), 650);
            });
        });
    }

    // Parallax on mouse move or scroll for elements with data-parallax-speed
    function bindParallax(root = document) {
        const elems = Array.from(root.querySelectorAll('[data-parallax-speed]')).map(el => {
            const s = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
            el.classList.add('parallax-elem');
            return { el, s };
        });
        if (!elems.length) return;
        // mouse parallax (desktop)
        let lastX = 0, lastY = 0;
        window.addEventListener('mousemove', (ev) => {
            const w = window.innerWidth, h = window.innerHeight;
            const cx = (ev.clientX - w / 2) / (w / 2);
            const cy = (ev.clientY - h / 2) / (h / 2);
            elems.forEach(({ el, s }) => {
                const tx = clamp(cx * 18 * s, -30, 30);
                const ty = clamp(cy * 12 * s, -20, 20);
                el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
            });
        }, { passive: true });

        // subtle scroll parallax (mobile & adds depth)
        window.addEventListener('scroll', () => {
            const sc = window.scrollY;
            elems.forEach(({ el, s }) => {
                const offset = -(sc * s) * 0.12;
                el.style.transform = `translate3d(0, ${offset}px, 0)`;
            });
        }, { passive: true });
    }

    // Public init function
    function initAnimations(root = document) {
        // if DOM not ready, wait
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                bindLogoHover(root);
                bindShimmer(root);
                bindReveal(root);
                bindSvgDraw(root);
                bindButtonMicro(root);
                bindParallax(root);
            });
        } else {
            bindLogoHover(root);
            bindShimmer(root);
            bindReveal(root);
            bindSvgDraw(root);
            bindButtonMicro(root);
            bindParallax(root);
        }
    }

    // Auto-init on load
    initAnimations(document);

    // Expose minimal API
    window.ProfessionalAnimations = {
        init: initAnimations,
        bindLogoHover,
        bindShimmer,
        bindReveal,
        bindSvgDraw,
        bindButtonMicro,
        bindParallax
    };
})();