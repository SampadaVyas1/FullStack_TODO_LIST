const express = require("express");
const { addTodoList, getList, deleteAll, editElement } = require("../controllers/todoController");

const router = express.Router()

router.get("/ping", (req, res) => {
    return res.status(200).send("pong")
})
router.post("/add", addTodoList);
router.get("/getList", getList);
router.delete("/deleteAll", deleteAll)
router.post("/edit", editElement)


module.exports = router;