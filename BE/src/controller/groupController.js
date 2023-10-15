const models = require('../models/index');
const getAllGroup = async (req, res) => {
    try {
        const group = await models.Group.findAll({});
        return res.status(200).json({ group });
    }
    catch (err) {
        return res.status(400).json({ message: 'Something wrong', err });
    }
}
const createGroup = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newGroup = await models.Group.create({ name, description });
        return res.status(200).json({ newGroup });
    }
    catch (err) {
        return res.status(400).json({ message: 'Something wrong', err });
    }
}

const deleteGroup = async (req, res) => {
    let { id } = req.params;
    try {
        const deleteGroup = await models.Group.destroy({ where: { id } });
        return res.status(200).json({ message: 'Xóa group thành công', deleteGroup });
    }
    catch (err) {
        return res.status(400).json({ message: 'Something wrong', err });
    }
}
module.exports = {
    getAllGroup, createGroup, deleteGroup
}