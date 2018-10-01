const Generator = require("yeoman-generator");
const fs = require("fs-extra");
const remote = require("yeoman-remote");
const read = require("fs-readdir-recursive")

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
	}

	writing() {
		const done = this.async();
		const that = this;

		this.destinationRoot("./");

		remote("https://github.com/frostdigital/fruster-template-service-js/archive/master.zip", function (err, cachePath) {
			if (!err) {
				const frusterTemplateServiceName = "fruster-template-service";
				const frusterTemplateServiceVarName = "frusterTemplateService";
				const appName = that.options.name;
				const filesToCopy = read(cachePath);

				filesToCopy.forEach(fileName => {
					console.log(`Copying ${cachePath}/${fileName}`);

					let file = fs.readFileSync(`${cachePath}/${fileName}`).toString();
					file = that._replaceAll(file, frusterTemplateServiceName, appName);
					file = that._replaceAll(file, frusterTemplateServiceVarName, that._toCamelCase(appName));

					fs.ensureFileSync(`${that.destinationRoot()}/${that._replaceAll(fileName, frusterTemplateServiceName, appName)}`);
					fs.writeFileSync(`${that.destinationRoot()}/${that._replaceAll(fileName, frusterTemplateServiceName, appName)}`, file);
				});

			} else {
				console.error("ERROR: Unable to fetch fruster-template-service-js at this time, sorry :( ");
				throw err;
			}

			done();
		}.bind(this));
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
