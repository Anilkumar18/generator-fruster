const Generator = require("yeoman-generator");
const askName = require("inquirer-npm-name");
const validatePackageName = require("validate-npm-package-name");

class YeomanGenerator extends Generator {

    constructor(args, options) {
        super(args, options);

        process.argv.forEach(function (val, index, array) {
            console.log(index + ': ' + val);
        });

        this.options.name = process.argv[3];

        this.option("name", {
            type: String,
            description: "Service name"
        });

        this.option("exampleCode", {
            type: String,
            description: "Whether or not to incldue example code"
        });
    }

    initializing() {
        this.props = { name: this.options.name || "" };

        if (this.options.name) {
            const name = this.options.name;
            const packageNameValidity = validatePackageName(name);

            if (packageNameValidity.validForNewPackages) {
                this.props.name = name;
                this.destinationRoot(`./${name}`);
            } else {
                throw new Error(
                    packageNameValidity.errors[0] ||
                    "The name option is not a valid npm package name."
                );
            }
        }
    }

    _getModuleNameParts(name) {
        const moduleName = {
            name,
            repositoryName: this.props.repositoryName
        };

        if (moduleName.name.startsWith("@")) {
            const nameParts = moduleName.name.slice(1).split("/");

            Object.assign(moduleName, {
                scopeName: nameParts[0],
                localName: nameParts[1]
            });
        } else
            moduleName.localName = moduleName.name;

        if (!moduleName.repositoryName)
            moduleName.repositoryName = moduleName.localName;

        return moduleName;
    }

    prompting() {
        let promtedName;

        if (this.props.name) {
            promtedName = Promise.resolve({ name: this.props.name });
        } else {
            promtedName = askName({
                name: "name",
                default: this.props.name,
                message: "Service name",
            }, this);
        }

        return promtedName.
            then(answer => {
                const moduleNameParts = this._getModuleNameParts(answer.name);
                Object.assign(this.props, moduleNameParts);
            })
            .then(this._askFor.bind(this));
    }

    _askFor() {
        const prompts = [{
            name: 'exampleCode',
            message: 'Example code? - y/n',
            default: "y"
        }];

        return this.prompt(prompts)
            .then(props => {
                this.props.exampleCode = this.props.exampleCode === "y";
                this.props = Object.assign(this.props, props);
            });
    }

    writing() {
        this.destinationRoot(`./${this.props.name}`);
    }

    default() {
        this.composeWith(require.resolve("../fruster-template-service-js/FrusterServiceGenerator.js"), { name: this.props.name, exampleCode: this.props.exampleCode === "y" });
    }

    installing() {
        this.npmInstall();
    }

    end() {
        this.log("Done!");
    }
};

module.exports = YeomanGenerator;
