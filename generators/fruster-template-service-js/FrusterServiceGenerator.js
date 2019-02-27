const Generator = require("yeoman-generator");
const fs = require("fs-extra");
const read = require("fs-readdir-recursive")
const request = require("superagent");
const unzip = require("unzip");
const path = require("path");

class FrusterServiceGenerator extends Generator {

    constructor(args, options) {
        super(args, options);

        /** @type {Object} */
        this.options = this.options;

        this.option("name", {
            type: String,
            default: "",
            description: "The name of the service."
        });

        this.zipFile = "master.zip";
        this.frusterTemplateServiceName = "fruster-template-service";
        this.frusterTemplateServiceVarName = "frusterTemplateService";
        this.appName = this.options.name;
        this.cachePath = "./fruster-template-service-js-master";
        this.exampleCode = this.options.exampleCode;
    }

    writing() {
        this.done = this.async();

        this.destinationRoot("./");

        return request
            .get("https://github.com/frostdigital/fruster-template-service-js/archive/master.zip")
            // .on("error", (error) => console.log(error))
            .pipe(fs.createWriteStream(this.zipFile))
            .on("finish", () => this._readZipFile());
    }

    _readZipFile() {
        fs.createReadStream("./" + this.zipFile)
            .pipe(unzip.Extract({ path: "./" }))
            .on("close", () => this._moveFiles());
    }

    _moveFiles() {
        console.log("Creating", this.appName);

        const filesToAlwaysCopy = [
            ".editorconfig",
            ".gitignore",
            ".jshintrc",
            "Dockerfile",
            "README.md",
            "app.js",
            "config.js",
            "fruster-template-service.js",
            "package-lock.json",
            "package.json",
            "constants.js",
            "docs.js",
            "errors.js",
            "jasmine-runner.js",
            "jasmine.json",
            "spec-constants.js"
        ];

        const filesToCopy = read(this.cachePath, () => true);

        filesToCopy.forEach(fileName => {
            const actualFileName = path.basename(fileName);

            let file = fs.readFileSync(`${this.cachePath}/${fileName}`).toString();
            file = this._replaceAll(file, this.frusterTemplateServiceName, this.appName);
            file = this._replaceAll(file, this.frusterTemplateServiceVarName, this._toCamelCase(this.appName));

            if (this.exampleCode) {
                const dirUrl = `${this.destinationRoot()}/${this._replaceAll(fileName, this.frusterTemplateServiceName, this.appName)}`;

                console.log(`[COPY]] ${dirUrl}`);

                fs.ensureFileSync(dirUrl);
                fs.writeFileSync(dirUrl, file);
            } else {
                const dirUrlBackup = `${this.destinationRoot()}/${this._replaceAll(fileName, this.frusterTemplateServiceName, this.appName)}`;
                const dirUrl = dirUrlBackup.replace(actualFileName, "");

                if (filesToAlwaysCopy.includes(actualFileName)) {
                    console.log(`[CREATE] ${dirUrlBackup}`);

                    fs.ensureFileSync(dirUrlBackup);
                    fs.writeFileSync(dirUrlBackup, file);
                } else {
                    console.log(`[COPY]] ${dirUrl}`);

                    fs.ensureDirSync(dirUrl);
                }
            }
        });

        try {
            fs.removeSync(this.cachePath);
        } catch (err) {
            console.error(err);
        }

        try {
            fs.removeSync(this.zipFile);
        } catch (err) {
            console.error(err);
        }

        this.done();
    }

    /**
     * @param {String} string
     * @param {String} search
     * @param {String} replace
     */
    _replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    /**
     * @param {String} string
     */
    _toCamelCase(string) {
        let strings = string.split("-");

        strings = strings.map((s, i) => {
            if (i > 0)
                return s[0].toUpperCase() + s.substring(1);
            return s;
        });

        return strings.join("");
    }

}

module.exports = FrusterServiceGenerator;
