module.exports = app => {
    const uploadController  = require("../controllers/upload.controller");
    var router = require("express").Router();
    const upload = require("../middleware/upload");
  
    router.post("/", upload.single("file"), uploadController.uploadFiles);

    app.use('/api/upload', router);
  };