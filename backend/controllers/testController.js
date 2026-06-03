const Test = require("../models/Test");
const { success, error } = require("../utils/response");

exports.createTest = async (req, res) => {
    const { text } = req.body;
    if (!text || !text.trim()) {
        return error(res, "内容不能为空");
    }
    const test = await Test.create({ text });
    return success(res, test, 201);
};

