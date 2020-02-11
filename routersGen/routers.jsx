const router = require("express").Router();
console.log("routers.jsx");

const {
  getAll,
  createNew,
  getIndividual,
  deleteIndividual,
  updateIndividual,
  getMultiple
} = require("./controllers.jsx");

router
  .route("/resources")
  .get(getAll)
  .post(createNew);

router
  .route("/projects")
  .get(getAll)
  .post(createNew);

router
  .route("/tasks")
  .get(getAll)
  .post(createNew);

router
  .route("/resources/:id")
  .get(getIndividual)
  .delete(deleteIndividual);

router
  .route("/projects/:id")
  .get(getIndividual)
  .delete(deleteIndividual);

router
  .route("/tasks/:id")
  .get(getIndividual)
  .delete(deleteIndividual);

router.route("/project_tasks/:id").get(getMultiple);

module.exports = router;
