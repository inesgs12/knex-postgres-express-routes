const db = require("../../database");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  db.select()
    .from("todo")
    .orderBy("id")
    .then(data => {
      res.send(data);
    });
});

router.post("/", (req, res) => {
  // INSERT INTO tablename(column1, column2) VALUES(column1_value, column2_value);
  // Insert into the table name and then select all from the table where id is equal to inserted row.
  db.insert(req.body)
    .returning("*")
    .into("todo")
    .then(data => {
      res.send(data);
    });
});

// PUT updates everything, so if there is an attribute that is not passed in, it should remove it, whereas PATCH updates only what is sent and does not touch the rest.
router.put("/:id", (req, res) => {
  //   console.log(req.params.id);
  // select the todo where the id === req.params.id
  db("todo")
    .where({
      id: req.params.id
    })
    .update({
      title: req.body.title || null,
      is_done: req.body.is_done || null
    })
    .returning("*")
    .then(data => {
      res.send(data);
    });
});

router.patch("/:id", (req, res) => {
  db("todo")
    .where({
      id: req.params.id
    })
    .update(req.body)
    .returning("*")
    .then(data => {
      res.send(data);
    });
});

router.delete("/:id", (req, res) => {
  db("todo")
    .where({
      id: req.params.id
    })
    .del()
    .then(() => {
      res.json({ success: true });
    });
});

router.get("/:id", (req, res) => {
  db("todo")
    .where({
      id: req.params.id
    })
    .select()
    .then(data => {
      res.send(data);
    });
});

module.exports = router;
