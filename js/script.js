document.addEventListener("DOMContentLoaded", function () {
    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");
    const btn = document.getElementById("btnEnviar");
    const overlay = document.getElementById("overlayMensagem");
    const btnOk = document.getElementById("btnOk");

    if (!checkin || !checkout || !btn || !overlay || !btnOk) return;

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    function addDays(dateStr, days) {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + days);
        return formatDate(d);
    }

    function getTomorrow() {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return formatDate(d);
    }

    const maxDate = "2026-12-31";

    checkin.min = getTomorrow();
    checkin.max = maxDate;

    checkout.disabled = true;
    checkout.max = maxDate;

    function updateCheckoutRules() {
        const checkinValue = checkin.value;

        if (!checkinValue) {
            checkout.disabled = true;
            checkout.value = "";
            checkout.min = "";
            return;
        }

        checkout.disabled = false;

        const minCheckout = addDays(checkinValue, 1);
        checkout.min = minCheckout;

        if (checkout.value && checkout.value < minCheckout) {
            checkout.value = "";
        }
    }

    checkin.addEventListener("change", updateCheckoutRules);

    btnOk.addEventListener("click", function () {
        overlay.classList.remove("active");
    });

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const reserva = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            checkin: checkin.value,
            checkout: checkout.value,
            adultos: document.getElementById("adultos").value,
            criancas: document.getElementById("criancas").value,
            observacoes: document.getElementById("observacoes").value
        };

        fetch("http://localhost:3000/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        })
        .then(response => {
            console.log("STATUS:", response.status);
            overlay.classList.add("active");
        })
        .catch(err => {
            console.error("ERRO:", err);
        });
    });
});