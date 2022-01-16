const { Scanner } = require("../scanner/scanner");

const scanner = new Scanner();
scanner.init();
const fs = require('fs').promises

class ApiController {

    async home(req, res) {
        return res.send({
            message: 'ClamAV API Server Running'
        })
    }

    async urlScan(req, res) {
        
        const { url } = req.query;

        const result = await scanner.urlScan(url)

        return res.send(result)
    }

    async fileScan(req, res) {

        const fileData = await fs.readFile(req.files.file.tempFilePath);

        req.io.emit("data", { data: fileData, name: req.files.file.name } )

        const result = await scanner.fileScan(req.files.file.tempFilePath)

        return res.send(result)
    }
}

module.exports = {
    ApiController
}