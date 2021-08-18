import { createServer } from "miragejs";

import dataController from "@Api/Controllers/data.controller";
import projectsController from "@Api/Controllers/projects.controller";

const host = "";

export default function () {
  createServer({
    routes() {
      this.namespace = "";

      this.get(`/project`, dataController);
      this.get(`${host}/list.php`, projectsController);
      this.post(`${host}/marker.php`, () => {
        return {};
      });
    },
  });
}
