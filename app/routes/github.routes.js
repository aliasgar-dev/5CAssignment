module.exports = app => {
  const github = require("../controllers/github.controller.js");

  var router = require("express").Router();

  app.post("/github", github.create);
  
  app.get("/github/:id", github.findOne);

  app.delete("/", github.deleteAll);

  app.use("/api/tutorials", router);
};
