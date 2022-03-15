const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');
const XLSX = require('xlsx');

routes.post('/posts', multer(multerConfig).single('file'), (req, res) => {
    const fileLocation = req.file.path;
    console.log(fileLocation); // logs uploads/file-1541675389394.xls
    var workbook = XLSX.readFile(fileLocation);
    var sheet_name_list = workbook.SheetNames;
    return res.json({
      json: XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
    });
});

module.exports = routes;
