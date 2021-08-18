import project from "./project.json";
const projects = {
  ["project"]: project,
};

const dataController = (schema, request) => {
  const re = /(\/|=)/;
  return (
    projects[request.responseURL.split(/(\/|=)/).pop()] || {
      status: "error",
      msg: "Отсутствует проект с данным названием.",
    }
  );
};

export default dataController;
