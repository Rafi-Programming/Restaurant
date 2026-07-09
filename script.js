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

reservationForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const fullName = reservationForm.querySelector('input[type="text"]').value;
    const email = reservationForm.querySelector('input[type="email"]').value;
    const phone = reservationForm.querySelector('input[type="tel"]').value;
    const guests = reservationForm.querySelector('input[type="number"]').value;
    const eventType = reservationForm.querySelector("select").value;

    if (!fullName || !email || !phone || !guests || !eventType) {

        alert("Please complete all fields.");
        return;

    }

    // Simulation jika URL / KEY belum diisi
    if (SUPABASE_URL === "" || SUPABASE_ANON_KEY === "") {

        alert("Simulation Mode");
        return;

    }

    try {

        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/reservations`,
            {
                method: "POST",

                headers: {

                    apikey: SUPABASE_ANON_KEY,

                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,

                    "Content-Type": "application/json",

                    Prefer: "return=representation"

                },

                body: JSON.stringify({

                    full_name: fullName,

                    email,

                    phone,

                    guests: Number(guests),

                    event_type: eventType

                })

            }
        );

        const result = await response.text();

        console.log("STATUS:", response.status);
        console.log("RESPONSE:", result);

        if (!response.ok) {

            alert(result);
            return;

        }

        alert("Reservation Successfully Sent!");

        reservationForm.reset();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

});
