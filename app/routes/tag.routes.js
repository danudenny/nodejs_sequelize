module.exports = app => {
    const tag = require("../controllers/tag.controller");
    var router = require("express").Router();
  
    router.post("/", tag.create);
    router.post("/makepost", tag.addBlog);
    router.get("/", tag.findAll);
    router.get("/published", tag.findAllPublished);
    router.get("/:id", tag.findOne);
    router.put("/:id", tag.update);
    router.delete("/:id", tag.delete);
    router.delete("/", tag.deleteAll);
  
    app.use('/api/tag', router);
  };