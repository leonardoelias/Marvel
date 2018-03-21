"use strict";

import "./src/scss/common.scss";
import { ui } from "./src/js/ui";

const init = () => {
  ui.render();
};

document.addEventListener("DOMContentLoaded", init);
