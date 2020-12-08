const { response, json } = require('express');

const uploadImg = async (req, res = response) => {
    const img = req.files.img;
    const imgName = img.path.split('/').pop();
    res.json({
        ok: true,
        imgName 
    })
}

module.exports = {
    uploadImg
}