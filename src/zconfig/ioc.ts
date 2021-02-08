import { Container, decorate, inject, injectable, interfaces } from 'inversify';
import { autoProvide, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import 'reflect-metadata';

type Identifier = string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>;

const iocContainer = new Container();

const fluentProvider = makeFluentProvideDecorator(iocContainer);
// decorator repository
const repository = (identifier: Identifier) =>
    fluentProvider(identifier)
        .inSingletonScope()
        .done();

//decorator service
const service = (identifier: Identifier) =>
    fluentProvider(identifier)
        .inSingletonScope()
        .done();

export { iocContainer, repository, inject, service };
