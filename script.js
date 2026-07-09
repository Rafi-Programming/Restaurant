/* ==========================================================
   GOURMET HAVEN
   Premium Restaurant Website
   script.js
========================================================== */

/* ==========================================================
   SUPABASE CONFIGURATION
   Isi jika nanti website sudah di-hosting
========================================================== */

const SUPABASE_URL = "https://sepidopkbjofeqoikbft.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_kWq2BVS946uicaSLVMrMFQ_aM_XcHZR";

/*
Contoh:

const SUPABASE_URL =
"https://xxxxxxxx.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOi...";
*/


/* ==========================================================
   ELEMENT
========================================================== */

const navbar = document.getElementById("navbar");

const reservationBtn =
document.getElementById("reservationBtn");

const reservationSection =
document.getElementById("reservation");

const reservationForm =
document.getElementById("reservationForm");


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

if (reservationBtn) {

    reservationBtn.addEventListener("click", () => {

        reservationSection.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    });

}


/* ==========================================================
   NAVBAR SCROLL EFFECT
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ==========================================================
   SCROLL REVEAL
========================================================== */

const revealElements = document.querySelectorAll(

    ".facility-card, .menu-card, .section-title, .reservation-form"

);

const revealOnScroll = () => {

    const trigger = window.innerHeight * 0.85;

    revealElements.forEach((item) => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.classList.add("active");

        }

    });

};

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);


/* ==========================================================
   FORM SUBMIT
========================================================== */

reservationForm.addEventListener(

    "submit",

    async function (e) {

        e.preventDefault();

        const fullName =
            reservationForm.querySelector(
                'input[type="text"]'
            ).value;

        const email =
            reservationForm.querySelector(
                'input[type="email"]'
            ).value;

        const phone =
            reservationForm.querySelector(
                'input[type="tel"]'
            ).value;

        const guests =
            reservationForm.querySelector(
                'input[type="number"]'
            ).value;

        const eventType =
            reservationForm.querySelector(
                "select"
            ).value;


        /* VALIDASI */

        if (

            !fullName ||

            !email ||

            !phone ||

            !guests ||

            !eventType

        ) {

            alert("Please complete all fields.");

            return;

        }


        /* ==========================================
           JIKA BELUM PAKAI SUPABASE
        ========================================== */

        if (

            SUPABASE_URL === "https://sepidopkbjofeqoikbft.supabase.co" ||

            SUPABASE_ANON_KEY === "sb_publishable_kWq2BVS946uicaSLVMrMFQ_aM_XcHZR"

        ) {

            console.table({

                fullName,

                email,

                phone,

                guests,

                eventType

            });

            alert(

                "Reservation submitted successfully! (Simulation Mode)"

            );

            reservationForm.reset();

            return;

        }


        /* ==========================================
           SUPABASE FETCH
        ========================================== */

        try {

            const response = await fetch(

                `${SUPABASE_URL}/rest/v1/reservations`,

                {

                    method: "POST",

                    headers: {

                        apikey:

                            SUPABASE_ANON_KEY,

                        Authorization:

                            `Bearer ${SUPABASE_ANON_KEY}`,

                        "Content-Type":

                            "application/json",

                        Prefer:

                            "return=representation"

                    },

                    body: JSON.stringify({

                        full_name: fullName,

                        email: email,

                        phone: phone,

                        guests: Number(guests),

                        event_type: eventType

                    })

                }

            );

            if (!response.ok) {

                throw new Error(

                    "Failed to save reservation."

                );

            }

            alert(

                "Reservation Successfully Sent!"

            );

            reservationForm.reset();

        }

        catch (error) {

            console.error(error);

            alert(

                "An error occurred while sending reservation."

            );

        }

    }

);


/* ==========================================================
   BACK TO TOP
   (Jika nanti ditambahkan tombol)
========================================================== */

const backTop = document.getElementById("backTop");

if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 600) {

            backTop.classList.add("show");

        }

        else {

            backTop.classList.remove("show");

        }

    });

    backTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   LOADING ANIMATION
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================================================
   CONSOLE MESSAGE
========================================================== */

console.log(
`
==========================================
 Gourmet Haven Restaurant
 Premium Website Prototype
 Frontend by First Garage
==========================================
`
);