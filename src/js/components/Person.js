function renderEvents(events) {
  if (events.items.length === 0) {
    return `<div class="person__series--empty">Evento indisponível</div>`;
  }

  return `
    ${events.items
      .map(
        (item, index) => `
      ${index < 3 ? `<span>${item.name}</span>` : ""}
    `
      )
      .join("")}
  `;
}

function renderSeries(series) {
  if (series.items.length === 0) {
    return `<div class="person__series--empty">Série indisponível</div>`;
  }

  return `
    ${series.items
      .map(
        (item, index) => `
      ${index < 3 ? `<span>${item.name}</span>` : ""}
    `
      )
      .join("")}
  `;
}

function renderPersons(persons) {
  return `
    ${persons
      .map(
        person => `
      <li class="person__item" data-id="${person.id}">
            <div class="content__left">
                <img src="${person.thumbnail.path}.${
          person.thumbnail.extension
        }" class="person__image" alt="">
                <span class="person__name">${person.name}</span>
            </div>
            <div class="content__center">
                <div class="person__series">
                    ${renderSeries(person.series)}
                </div>
            </div>
            <div class="content__right">
                <div class="person__events">
                    ${renderEvents(person.events)}
                </div>
            </div>
        </a>
      </li>
    `
      )
      .join("")}
  `;
}

export const Persons = persons => {
  const markup = `
      <li class="list-person__header">
          <div>Personagem</div>
      </li>
      <li class="list-person__header">
          <div>Séries</div>
      </li>
      <li class="list-person__header">
          <div>Eventos</div>
      </li>
      ${renderPersons(persons)}
  `;

  document.getElementById("list-person").innerHTML = markup;
};
