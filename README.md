# RNApdbee frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `docker build . -t rnapdbee-frontend && docker run -i -t --rm -p 80:80 --name rnapdbee-frontend rnapdbee-frontend` to start a dev server in a docker container. Navigate to http://localhost:80/.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Mock server

To get prism Docker image use `docker pull stoplight/prism`.

Then, You can run the Prism mocks via command:
 - on BASH terminal: `docker run -v $(pwd)/api/api-spec-mock.yaml:/api-spec.yaml -p 4010:4010 stoplight/prism mock -h 0.0.0.0 "/api-spec.yaml"`
 - on POWERSHELL terminal: `docker run -v ${pwd}/api/api-spec-mock.yaml:/api-spec.yaml -p 4010:4010 stoplight/prism mock -h 0.0.0.0 "/api-spec.yaml"`
 - on CMD terminal: `docker run -v %cd%/api/api-spec-mock.yaml:/api-spec.yaml -p 4010:4010 stoplight/prism mock -h 0.0.0.0 "/api-spec.yaml"`
