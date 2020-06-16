class Resolver {
  public handlerFor(command: any): any {
    return command.handler();
  }
}

class Bus {
  private resolver: Resolver;

  public constructor(resolver: Resolver = new Resolver()) {
    this.resolver = resolver;
  }

  public dispatch(command: any) {
    const handler_cls = this.resolver.handlerFor(command);
    if (handler_cls === null) {
      throw Error(`Can't find handler for command ${command.name}`);
    }

    const h = new handler_cls();
    return h.handle(command);
  }
}

class Command {
  public handler = () => null;
}

class CommandHandler {
  public handle = (command: any) => {};
}

class Query {
  public handler = () => {};
}

class QueryHandler {
  public handle = (query: any) => {};
}

export { Bus, Command, CommandHandler, Query, QueryHandler };
