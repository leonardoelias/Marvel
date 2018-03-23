import CryptoJS from "crypto-js";
import moment from "moment";

import { marvelApi as config } from "./config";
import { http } from "./api";

import { Persons } from "./components/Person";
import { Pagination } from "./components/Pagination";
import { Modal } from "./components/Modal";

class UI {
  constructor() {
    this.handlePagination = this.handlePagination.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  getCharacters(origOptions = {}) {
    const defaultOptions = { page: 1, count: 10, id: "" };
    const options = Object.assign(defaultOptions, origOptions);

    const URI = "/v1/public/characters";
    const timeStamp = moment().unix();
    const hash = CryptoJS.MD5(
      timeStamp + config.privateKey + config.publicKey
    ).toString(CryptoJS.enc.Hex);

    const currentOffset =
      options.page === 1 ? 0 : options.count * (options.page - 1);

    let params = `?apikey=${
      config.publicKey
    }&ts=${timeStamp}&hash=${hash}&limit=${
      options.count
    }&offset=${currentOffset}`;

    if (options.id) {
      params = params.concat(`&id=${options.id}`);
    }

    return `${config.baseUrl}${URI}${params}`;
  }

  handlePagination(e) {
    let pageOff = e.target.hash.replace("#", "");
    let url = this.getCharacters({ page: pageOff });

    http
      .get(url)
      .then(response => {
        Persons(response.data.results);
      })
      .then(response => {
        this.initEvents();
      })
      .catch(err => console.log(err));

    e.preventDefault();
  }

  filter(e) {
    let persons = document.querySelectorAll(".person__item");

    if (this.value.length > 0) {
      for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        let contentName = person.querySelector(".person__name");
        let name = contentName.textContent;
        let expression = new RegExp(this.value, "i");
        if (!expression.test(name)) {
          person.classList.add("person__invisible");
        } else {
          person.classList.remove("person__invisible");
        }
      }
    } else {
      for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        person.classList.remove("person__invisible");
      }
    }
  }

  closeModal(e) {
    document.getElementById("modal").className = "";
    document.querySelector(".modal__wrap").innerHTML = "";
  }

  openModal(e) {
    e.preventDefault();
    e.stopPropagation();

    let personId = e.currentTarget.dataset.id;
    var url = this.getCharacters({ id: personId });

    document.getElementById("modal").className = "modal__overlay load";

    http
      .get(url)
      .then(response => {
        Modal(response.data.results[0]);
      })
      .then(response => {
        document
          .querySelector(".close")
          .addEventListener("click", this.closeModal, true);
      })
      .catch(err => console.log(err));
  }

  initEvents() {
    let that = this;

    let filterInput = document.querySelector("#search");
    filterInput.addEventListener("input", this.filter);

    let personElm = document.querySelectorAll(".person__item");
    [].forEach.call(personElm, function(each) {
      each.addEventListener("click", that.openModal);
    });

    let paginationElm = document.querySelectorAll("#pagination a");
    [].forEach.call(paginationElm, function(each) {
      each.addEventListener("click", that.handlePagination);
    });
  }

  render() {
    let url = this.getCharacters();

    http
      .get(url)
      .then(response => {
        Persons(response.data.results);
      })
      .then(response => {
        this.initEvents();
      })
      .catch(err => console.log(err));
  }
}

export const ui = new UI();
