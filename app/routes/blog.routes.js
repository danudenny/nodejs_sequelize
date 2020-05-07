module.exports = app => {
    const post = require("../controllers/blog.controller");
    var router = require("express").Router();
  
    router.post("/", post.create);
    router.get("/", post.findAll);
    router.get("/published", post.findAllPublished);
    router.get("/:id", post.findOne);
    router.put("/:id", post.update);
    router.delete("/:id", post.delete);
    router.delete("/", post.deleteAll);
  
    app.use('/api/post', router);
  };