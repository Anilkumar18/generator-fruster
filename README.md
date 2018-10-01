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

    Copying .../fruster-template-service-js-archive-master-zip/app.js
    Copying .../fruster-template-service-js-archive-master-zip/config.js
    Copying .../fruster-template-service-js-archive-master-zip/Dockerfile
    Copying .../fruster-template-service-js-archive-master-zip/fruster-template-service.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/clients/BarServiceClient.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/constants.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/docs.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/errors.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/handlers/GetFooHandler.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/managers/FooManager.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/models/FooModel.js
    Copying .../fruster-template-service-js-archive-master-zip/lib/repos/FooRepo.js
    Copying .../fruster-template-service-js-archive-master-zip/package-lock.json
    Copying .../fruster-template-service-js-archive-master-zip/README.md
    Copying .../fruster-template-service-js-archive-master-zip/schemas/Foo.json
    Copying .../fruster-template-service-js-archive-master-zip/schemas/FooWithBar.json
    Copying .../fruster-template-service-js-archive-master-zip/schemas/GetFooRequest.json
    Copying .../fruster-template-service-js-archive-master-zip/schemas/User.json
    Copying .../fruster-template-service-js-archive-master-zip/spec/FooRepo.spec.js
    Copying .../fruster-template-service-js-archive-master-zip/spec/GetFooHandler.spec.js
    Copying .../fruster-template-service-js-archive-master-zip/spec/support/fixtures.js
    Copying .../fruster-template-service-js-archive-master-zip/spec/support/jasmine-runner.js
    Copying .../fruster-template-service-js-archive-master-zip/spec/support/jasmine.json
    Copying .../fruster-template-service-js-archive-master-zip/spec/support/MockBarService.js
    Copying .../fruster-template-service-js-archive-master-zip/spec/support/spec-constants.js
    create package.json
    added 309 packages in 13.785s
    Done!

    cd fruster-example-service
