function renderPages(pages, currentPage) {
  const result = pages
    .map(page => {
      if (page === "...") {
        return `<span class="pagination-item">${page}</span>`;
      } else {
        return `<a class="pagination-item ${
          page === currentPage ? "pagination-item__active" : ""
        } " href="#${page}">${page}</a>`;
      }
    })
    .join("");

  return result;
}

function pag(currentPage, nrOfPages) {
  var delta = 2,
    range = [],
    rangeWithDots = [],
    l;

  range.push(1);

  if (nrOfPages <= 1) {
    return range;
  }

  for (let i = currentPage - delta; i <= currentPage + delta; i++) {
    if (i < nrOfPages && i > 1) {
      range.push(i);
    }
  }
  range.push(nrOfPages);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export const Pagination = (total, count, currentPage) => {
  const mountPages = pag(currentPage, Math.ceil(total / count));

  const markup = `
    <nav class="pagination-list" role="navigation">
      ${renderPages(mountPages, currentPage)}
    </nav>
  `;

  document.getElementById("pagination").innerHTML = markup;
};
