const Generator = require("yeoman-generator");
const askName = require("inquirer-npm-name");

class YeomanGenerator extends Generator {

    constructor(args, options) {
        super(args, options);

        if (process.argv[3])
            this.options.name = process.argv[3];

        if (process.argv[4])
            this.options.exampleCode = process.argv[4];
        else if (process.argv[3])
            this.options.exampleCode = "n";

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
        this.props = { name: "", exampleCode: undefined };

        if (this.options.name) {
            this.props.name = this.options.name;
        }

        if (this.options.exampleCode !== undefined) {
            this.props.exampleCode = this.options.exampleCode;
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
                default: "fruster-template-service",
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
        if (this.props.exampleCode !== undefined) {
            this.props.exampleCode = this.props.exampleCode === "y";
            return;
        }

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
