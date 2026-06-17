document.addEventListener("DOMContentLoaded", function () {

    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");

    if (!checkin || !checkout) return;

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
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

    // CHECK-IN mínimo = amanhã
    checkin.min = getTomorrow();
    checkin.max = maxDate;

    // CHECK-OUT começa bloqueado
    checkout.disabled = true;
    checkout.value = "";
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

        // 🔥 BLOQUEIO REAL DO MESMO DIA (ESSENCIAL)
        if (checkout.value === checkinValue) {
            checkout.value = "";
        }

        // 🔥 BLOQUEIO DE QUALQUER DATA INVÁLIDA
        if (checkout.value && checkout.value < minCheckout) {
            checkout.value = "";
        }
    }

    checkin.addEventListener("change", function () {
        updateCheckoutRules();
    });

    checkout.addEventListener("focus", updateCheckoutRules);
    checkout.addEventListener("click", updateCheckoutRules);
    checkout.addEventListener("input", updateCheckoutRules);

});document.addEventListener("DOMContentLoaded", function () {

    const checkin = document.getElementById("checkin");
    const checkout = document.getElementById("checkout");

    if (!checkin || !checkout) return;

    function formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
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

    // 🔒 CHECK-IN sempre a partir de amanhã (dinâmico)
    const minCheckin = getTomorrow();

    checkin.min = minCheckin;
    checkin.max = maxDate;

    // 🔒 CHECK-OUT começa bloqueado
    checkout.disabled = true;
    checkout.value = "";
    checkout.max = maxDate;
    checkout.min = "";

    function updateCheckoutRules() {

        const checkinValue = checkin.value;

        if (!checkinValue) {
            checkout.disabled = true;
            checkout.value = "";
            checkout.min = "";
            return;
        }

        checkout.disabled = false;

        // 🔥 regra principal: check-out = check-in + 1 dia
        const minCheckout = addDays(checkinValue, 1);
        checkout.min = minCheckout;

        // limpa se inválido
        if (checkout.value && checkout.value < minCheckout) {
            checkout.value = "";
        }
    }

    checkin.addEventListener("change", updateCheckoutRules);

    checkout.addEventListener("change", function () {
        updateCheckoutRules();
    });

});