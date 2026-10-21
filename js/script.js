
/* ==========================================
   PARANICE - JAVASCRIPT
   Bootstrap 5.0.2
   PARALLAX CONTROLADO POR SCROLL
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       1. NAVEGACION FIJA
    ====================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* ======================================
       2. ANO DEL FOOTER
    ====================================== */

    const year = document.getElementById("currentYear");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ======================================
       3. MENU RESPONSIVE
    ====================================== */

    const navbarCollapse =
        document.getElementById("navbarParanice");

    if (navbarCollapse && typeof bootstrap !== "undefined") {

        const links = navbarCollapse.querySelectorAll(".nav-link");

        links.forEach(function (link) {
            link.addEventListener("click", function () {

                if (window.innerWidth < 992) {
                    const instance =
                        bootstrap.Collapse.getInstance(navbarCollapse);

                    if (instance) {
                        instance.hide();
                    }
                }
            });
        });
    }


    /* ======================================
       4. ELEMENTOS DEL PARALLAX
    ====================================== */

    const hero = document.querySelector(".hero-parallax");
    const background = document.querySelector(".parallax-background");
    const left = document.querySelector(".character-left");
    const right = document.querySelector(".character-right");

    if (!hero || !background) return;

    const motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    let animationFrame = null;


    /* ======================================
       5. ACTUALIZAR PARALLAX
    ====================================== */

    function updateParallax() {

        animationFrame = null;

        const disabled =
            window.innerWidth < 768 ||
            motionPreference.matches;

        if (disabled) {
            background.style.transform = "translate3d(0,0,0)";

            if (left) {
                left.style.transform = "translate3d(0,0,0)";
            }

            if (right) {
                right.style.transform = "translate3d(0,0,0)";
            }

            return;
        }

        const rect = hero.getBoundingClientRect();

        /*
           Medimos cuanto ha subido la seccion
           respecto al inicio de la pantalla.
        */

        const scrollAmount = Math.max(
            0,
            Math.min(-rect.top, hero.offsetHeight)
        );

        /*
           FONDO
           Avanza al 35% del desplazamiento.
        */

        const backgroundY = Math.min(
            scrollAmount * 0.35,
            240
        );

        background.style.transform =
            `translate3d(0, ${backgroundY}px, 0)`;


        /*
           VAINILLA
           Se mueve hacia abajo dentro de la
           seccion, compensando el scroll.
        */

        if (left) {

            const leftY = Math.min(
                scrollAmount * 0.65,
                340
            );

            left.style.transform =
                `translate3d(0, ${leftY}px, 0)`;
        }


        /*
           GALLETA
           Se mueve a una velocidad diferente.
        */

        if (right) {

            const rightY = Math.min(
                scrollAmount * 0.48,
                260
            );

            right.style.transform =
                `translate3d(0, ${rightY}px, 0)`;
        }
    }


    /* ======================================
       6. OPTIMIZAR ANIMACION
    ====================================== */

    function requestUpdate() {

        if (animationFrame !== null) return;

        animationFrame = window.requestAnimationFrame(
            updateParallax
        );
    }

    window.addEventListener("scroll", requestUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestUpdate);

    if (motionPreference.addEventListener) {
        motionPreference.addEventListener(
            "change",
            requestUpdate
        );
    }

    requestUpdate();



});
