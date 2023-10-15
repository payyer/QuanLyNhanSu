const { where } = require('sequelize');
const models = require('../models/index');
const bcrypt = require('bcrypt');
const getAllUser = async (req, res) => {
    try {
        const allUser = await models.User.findAll({ include: models.Group });
        return res.json({ allUser });
    }
    catch (err) {
        console.log(err);
        return res.json({ err });
    }
}

const createUser = async (req, res) => {
    const { email, password, userName, groupId } = req.body;
    try {
        if (!email) {
            return res.status(400).json({ err: "Bạn chưa nhập Email" });
        }
        if (!password) {
            return res.status(400).json({ err: "Bạn chưa nhập Password" });
        }
        if (!userName) {
            return res.status(400).json({ err: "Bạn chưa nhập User Name" });
        }
        const salt = bcrypt.genSaltSync();
        const hashingPassword = bcrypt.hashSync(password, salt);
        const newUser = await models.User.create({ email, password: hashingPassword, userName, groupId });
        return res.status(200).json({ message: 'Tạo mới user thành công!', newUser });
    }
    catch (err) {
        res.json({ err });
    }
}

const changeGroupUser = async (req, res) => {
    let { id } = req.params;
    let { changeGroup } = req.body;
    console.log(changeGroup);
    try {
        if (!id) {
            return res.satus(400).json({ meeasge: "You don't select id" });
        }
        const user = await models.User.findOne({ id });
        const updateUser = await user.update({ groupId: changeGroup })
        res.json({ updateUser });
    }
    catch (err) {
        console.log(err);
        res.satus(400).json({ err });
    }
}

const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        const user = await models.User.findOne({ where: { id } });
        if (user) {
            const deleteUser = await user.destroy();
            return res.status(200).json({ message: 'Xóa người dùng thành công!', deleteUser });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(400).json({ meeasge: 'Xóa người dùng thất bại', err })
    }

}

module.exports = {
    getAllUser, createUser, changeGroupUser, deleteUser
}