const db = require('../models');
const Tag = db.tag;
const Blog = db.blog;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty!"
        });
        return;
    }

    const tag = {
        name: req.body.name
    };

    Tag.create(tag)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while createing a Tag Tag"
            });
        });
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Tag.findAll({ 
        include: [
            {
                model: db.blog,
                as: "blog",
                attributes: ["title", "description"],
                through: {
                    attributes: [],
                }
            },
        ],
      where: condition 
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving posts."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tag.findByPk(id)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Tag with id=" + id
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Tag.update(req.body, {where: {id: id}})
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Tag was updated succesfully."
                });
            } else {
                res.send({
                    message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating post with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Tag.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tag was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tag with id=" + id
      });
    });
}

exports.deleteAll = (req, res) => {
    Tag.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
          res.send({ message: `${nums} Tags were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Tags."
          });
        });
}

exports.findAllPublished = (req, res) => {
    Tag.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Tag."
      });
    });
}

exports.addBlog = (req, res) => {
    return Tag.findByPk(req.body.tagId)
    .then((tag) => {
        if (!tag) {
            return res.status(401).send({
                message: "No tag found"
            });
        }
        return db.blog.findByPk(req.body.blogId)
        .then((blog) => {
            if (!blog) {
                return res.status(401).send({
                    message: "No blog found"
                });
            }
            tag.addBlog(blog);
            return res.status(200).send({
                message: "Successful add"
            });
        });
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Error adding"
        });
    });
};


