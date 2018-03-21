function renderEvents(events) {
  if (events.items.length === 0) {
    return `<div class="modal--empty">Evento indisponível</div>`;
  }

  return `
    ${events.items.map(item => `<span>${item.name}</span>`).join("")}
  `;
}

function renderSeries(series) {
  if (series.items.length === 0) {
    return `<div class="modal--empty">Série indisponível</div>`;
  }

  return `
    ${series.items.map(item => `<span>${item.name}</span>`).join("")}
  `;
}

export const Modal = person => {
  console.log(person);
  const markup = `
    <img src="${person.thumbnail.path}.${person.thumbnail.extension}">
    <p class="modal--name">${person.name}</p>
    <h2>Descrição</h2>
    <p>${person.description}</p>
    <h2>Séries</h2>
    <p>
        ${renderSeries(person.series)}
    </p>
    <h2>Eventos</h2>
    <p>
        ${renderEvents(person.events)}
    </p>
  `;

  document.getElementById("modal").className = "modal__overlay open";
  document.querySelector(".modal__wrap").innerHTML = markup;
};
