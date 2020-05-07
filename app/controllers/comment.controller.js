const db = require('../models');
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.name) {
        res.status(400).send({
            message: "Title cannot be empty!"
        });
        return;
    }

    const comment = {
        name: req.body.name,
        text: req.body.text,
        blogId: req.body.blogId
    };

    Comment.create(comment)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while createing a Blog Post"
            });
        });
}

exports.findAll = (req, res) => {
    Comment.findAll()
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

// exports.findOne = (req, res) => {
//     const id = req.params.id;

//     Blog.findByPk(id)
//         .then(data => {
//             res.send(data);
//         }).catch(err => {
//             res.status(500).send({
//                 message: "Error retrieving Post with id=" + id
//             });
//         });
// }

// exports.update = (req, res) => {
//     const id = req.params.id;

//     Blog.update(req.body, {where: {id: id}})
//         .then(num => {
//             if(num == 1) {
//                 res.send({
//                     message: "Post was updated succesfully."
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot update post with id=${id}. Maybe post was not found or req.body is empty!`
//                 });
//             }
//         }).catch((err) => {
//             res.status(500).send({
//                 message: "Error updating post with id=" + id
//             });
//         });
// }

// exports.delete = (req, res) => {
//     const id = req.params.id;

//     Blog.destroy({
//         where: { id: id }
//     })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Post was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Post with id=" + id
//       });
//     });
// }

// exports.deleteAll = (req, res) => {
//     Blog.destroy({
//         where: {},
//         truncate: false
//     })
//         .then(nums => {
//           res.send({ message: `${nums} Posts were deleted successfully!` });
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while removing all Posts."
//           });
//         });
// }

// exports.findAllPublished = (req, res) => {
//     Blog.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Post."
//       });
//     });
// }