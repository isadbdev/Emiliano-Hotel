document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.getElementById("tabelaReservas");

  fetch("http://localhost:3000/reservas")
    .then(response => response.json())
    .then(data => {
      data.forEach(reserva => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${reserva.nome}</td>
          <td>${reserva.email}</td>
          <td>${reserva.checkin}</td>
          <td>${reserva.checkout}</td>
          <td>${reserva.adultos}</td>
          <td>${reserva.criancas}</td>
          <td>${reserva.observacoes}</td>
        `;

        tabela.appendChild(row);
      });
    })
    .catch(err => console.error("Erro ao carregar reservas:", err));
});