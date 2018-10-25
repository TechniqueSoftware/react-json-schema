import ReactJsonSchema from './ReactJsonSchema';

const reactJsonSchemaFactory = (middleware = []) => {
  let i = -1;
  const next = (schema) => {
    if (!middleware.length) return;
    if (i < middleware.length - 1) {
      i += 1;
      middleware[i](schema, next);
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

  return new ReactJsonSchemaWithMiddleware();
};

export default reactJsonSchemaFactory;
