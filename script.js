/* ==========================================================
   GOURMET HAVEN
   Premium Restaurant Website
   script.js
========================================================== */


/* ==========================================
   SUPABASE CONFIG
========================================== */

const SUPABASE_URL = "https://sepidopkbjofeqoikbft.supabase.co";

const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kWq2BVS946uicaSLVMrMFQ_aM_XcHZR";

/* Membuat koneksi ke Supabase */
const sbClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
    
);
console.log(window.supabase);
console.log(supabase);

/* ==========================================================
   ELEMENT
========================================================== */

const navbar = document.getElementById("navbar");

const reservationBtn = document.getElementById("reservationBtn");

const reservationSection = document.getElementById("reservation");

const reservationForm = document.getElementById("reservationForm");


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

if (reservationBtn) {

    reservationBtn.addEventListener("click", () => {

        reservationSection.scrollIntoView({

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   NAVBAR EFFECT
========================================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 60) {

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});


/* ==========================================================
   SCROLL ANIMATION
========================================================== */

const revealItems = document.querySelectorAll(

".facility-card,.menu-card,.reservation-form,.section-title"

);

function reveal(){

    const trigger = window.innerHeight * 0.85;

    revealItems.forEach(item=>{

        if(item.getBoundingClientRect().top < trigger){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll",reveal);

window.addEventListener("load",reveal);


/* ==========================================================
   FORM SUBMIT
========================================================== */

reservationForm.addEventListener(

"submit",

async function(e){

    e.preventDefault();


    const fullName =
    reservationForm.querySelector('input[type="text"]').value.trim();

    const email =
    reservationForm.querySelector('input[type="email"]').value.trim();

    const phone =
    reservationForm.querySelector('input[type="tel"]').value.trim();

    const guests =
    reservationForm.querySelector('input[type="number"]').value;

    const eventType =
    reservationForm.querySelector("select").value;


    /* VALIDASI */

    if(

        !fullName ||

        !email ||

        !phone ||

        !guests ||

        !eventType

    ){

        alert("Please complete all fields.");

        return;

    }


    console.log("Mengirim ke Supabase...");

try {

    const { data, error } = await sbClient

        .from("reservations")

        .insert([
            {
                full_name: fullName,
                email: email,
                phone: phone,
                guests: Number(guests),
                event_type: eventType
            }
        ]);

    if (error) {
        console.error(error);
        alert(error.message);
        return;
    }

    console.log(data);
    alert("Reservation Successfully Sent!");
    reservationForm.reset();

} catch (err) {

    console.error("FULL ERROR:", err);
    alert(err.message);

}

});


/* ==========================================================
   BACK TO TOP
========================================================== */

const backTop = document.getElementById("backTop");

if(backTop){

    window.addEventListener("scroll",()=>{

        if(window.scrollY>600){

            backTop.classList.add("show");

        }

        else{

            backTop.classList.remove("show");

        }

    });

    backTop.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}


/* ==========================================================
   LOADING
========================================================== */

window.addEventListener("load",()=>{

    document.body.classList.add("loaded");

});


