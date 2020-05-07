const db = require('../models');
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Name cannot be empty!"
        });
        return;
    }

    const category = {
        name: req.body.name,
        description: req.body.description,
        meta: req.body.meta
    };

    Category.create(category)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a Category"
            });
        });
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Category.findAll({ 
      include: ["blog"],
      where: condition 
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving category."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findByPk(id)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: "Error retrieving Category with id=" + id
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Category.update(req.body, {where: {id: id}})
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Category was updated succesfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        }).catch((err) => {
            res.status(500).send({
                message: "Error updating Category with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Category.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
}

exports.deleteAll = (req, res) => {
    Category.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
          res.send({ message: `${nums} Category were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Category."
          });
        });
}