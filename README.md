# Fruster yeoman generator

## Install the Generator

Install yeoman and the fruster generator:

```
npm install -g yo generator-fruster
```
alt. if yeoman already installed:
```
npm install -g generator-fruster
```

## How to generate new service

```
yo fruster
```

## Generator Output

    yo fruster
    
    ? Module Name (fruster-generic-service) fruster-example-service
    ? Module Name fruster-example-service

    Copying ../fruster-template-service-js-master/app.js
    Copying ../fruster-template-service-js-master/config.js
    Copying ../fruster-template-service-js-master/Dockerfile
    Copying ../fruster-template-service-js-master/fruster-template-service.js
    Copying ../fruster-template-service-js-master/lib/clients/BarServiceClient.js
    Copying ../fruster-template-service-js-master/lib/constants.js
    Copying ../fruster-template-service-js-master/lib/docs.js
    Copying ../fruster-template-service-js-master/lib/errors.js
    Copying ../fruster-template-service-js-master/lib/handlers/GetFooHandler.js
    Copying ../fruster-template-service-js-master/lib/managers/FooManager.js
    Copying ../fruster-template-service-js-master/lib/models/FooModel.js
    Copying ../fruster-template-service-js-master/lib/repos/FooRepo.js
    Copying ../fruster-template-service-js-master/package-lock.json
    Copying ../fruster-template-service-js-master/README.md
    Copying ../fruster-template-service-js-master/schemas/Foo.json
    Copying ../fruster-template-service-js-master/schemas/FooWithBar.json
    Copying ../fruster-template-service-js-master/schemas/GetFooRequest.json
    Copying ../fruster-template-service-js-master/schemas/User.json
    Copying ../fruster-template-service-js-master/spec/FooRepo.spec.js
    Copying ../fruster-template-service-js-master/spec/GetFooHandler.spec.js
    Copying ../fruster-template-service-js-master/spec/support/fixtures.js
    Copying ../fruster-template-service-js-master/spec/support/jasmine-runner.js
    Copying ../fruster-template-service-js-master/spec/support/jasmine.json
    Copying ../fruster-template-service-js-master/spec/support/MockBarService.js
    Copying ../fruster-template-service-js-master/spec/support/spec-constants.js
    create package.json
    added 309 packages in 13.785s
    Done!

    cd fruster-example-service
