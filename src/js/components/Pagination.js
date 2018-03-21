export const Pagination = parameter => {
  const markup = `
    <div class="pagination" id="pagination">
      <a href="#"><</a>
      <a href="#" page="1">1</a>
      <a href="#" page="2">2</a>
      <a href="#">></a>
    </div>
  `;

  document.getElementById("wrapper-pagination").innerHTML = markup;
};
