const NodeClam = require('clamscan')
const axios = require('axios');
const fs = require('fs');

class Scanner {
    constructor() {
        this.clamScan = null
        this.result = {
            file: null,
            isInfected: false,
            viruses: [],
            resultString: '',
            timeout: false
        }
    }

    async init() {
        this.clamScan = await new NodeClam().init({
            debugMode: false,
            clamscan: {
                active: false
            },
            clamdscan: {
                bypass_test: true,
                host: process.env.CLAM_HOST,
                port: process.env.CLAM_PORT,
                reloadDb: process.env.RELOAD_DB === 'true'
            },
        })
    }

    async #scan(file) {
        return await this.clamScan.isInfected(file);
    }

    async urlScan(url) {

        try {
            const tempDir = __dirname;
            const scanFile = `${tempDir}/tmp_file`;

            let body = await axios.get(url);

            fs.writeFileSync(scanFile, body.data);

            this.result = await this.#scan(scanFile);

            fs.unlinkSync(scanFile)
        } catch (err) {
            this.result.resultString = `Unexpected error: ${err}`
        }

        return this.result
    }

    async fileScan(file) {
        try {
            this.result = await this.#scan(file);

            fs.unlinkSync(file)
        } catch (err) {
            this.result.resultString = `Unexpected error: ${err}`
        }

        return this.result;
    }
}

module.exports = {
    Scanner
}