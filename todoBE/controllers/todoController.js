const { query } = require("express");
const { pool } = require("../config/database")

exports.addTodoList = async (req, res) => {
    const { label, value } = req.body
    console.log(label)

    const insertQuery = "INSERT INTO todolist (label,value) VALUES (?,?)";

    try {
        const [response] = await pool.query(insertQuery, [label, value]);
        // const [allData] = await pool.query(selectQuery);
        return res.status(200).json({ message: "List added Successfully" })
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error" })
    }

}

exports.getList = async (req, res) => {
    const selectQuery = "Select * from todolist"
    try {
        const [response] = await pool.query(selectQuery);
        return res.status(200).json({ message: "List fetch successfully", data: response })
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error" })

    }
}

exports.deleteAll = async (req, res) => {
    const deleteQuery = "delete from todoList"
    try {
        const [value] = await pool.query(deleteQuery);
        return res.status(200).json({ message: "All the List are deleted successfully" })

    }
    catch (e) {
        return res.status(500).json({ message: "Server Error" })
    }
}

exports.editElement = async (req, res) => {
    const { id, value } = req.body;
    console.log(">>")

    try {
        const selectQuery = "Select * from todolist";
        const [selectQueryData] = await pool.query(selectQuery);
        console.log(selectQueryData)
        const isIdFind = selectQueryData.some((ele) => ele.id === id);

        if (!isIdFind) {
            return res.status(400).json({ message: "Id not found " })
        }

        const updatequery = "UPDATE todolist set value = ? where id = ?"
        const [updatedValue] = await pool.query(updatequery, [value, id]);

       
        return res.status(200).json({ message: "Value Updated Successfully" })
    }
    catch (e) {
        return res.status(500).json({ message: "Server Error" })
    }
}

