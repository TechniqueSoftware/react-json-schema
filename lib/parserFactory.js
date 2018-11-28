import ReactJsonSchema from "./ReactJsonSchema";

export default (options = { components: {}, middleware: [] }) => {
  // make sure that nobody instatiates this factory with optiuons that don't include the required defaults
  const defaultOptions = {
    components: {},
    middleware: [],
    ...options
  };

  let i = -1;

  const next = schema => {
    if (!parser.middleware.length) return;
    if (i < middleware.length - 1) {
      i += 1;
      parser.middleware[i](schema, next);
    } else {
      i = -1;
    }
  };

  class ReactJsonSchemaWithMiddleware extends ReactJsonSchema {
    createComponent(schema) {
      next(schema);
      return super.createComponent(schema);
    }
  }

  const parser = new ReactJsonSchemaWithMiddleware();

  const parser = {
    ...defaultOptions,
    withMiddleware(...middlewares) {
      this.middleware = [...this.middleware, ...middlewares];
      return this;
    },

    withComponents(components = {}) {
      this.components = { ...this.components, components };
      return this;
    },

    // doesn't change the current behavior of parseSchema
    parseSchema(schema) {
        if (Object.keys(this.components).length) {
            parser.setComponentMap(this.components);
        }

        return parser.parseSchema(schema);
    },

    // alternatively in keeping with the method chaining pattern
    parseSchemaAlternative(schema) {
        if (Object.keys(this.components).length) {
            parser.setComponentMap(this.components);
        }

        this.schema = parser.parseSchema();

        return this;
    }
  };

  return parser;
};
