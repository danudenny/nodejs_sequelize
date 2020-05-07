module.exports = app => {
    const comment = require("../controllers/comment.controller");
    var router = require("express").Router();
  
    router.post("/", comment.create);
    router.get("/", comment.findAll);
  
    app.use('/api/comment', router);
  };