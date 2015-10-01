import ReactJson from '../lib/react-json-schema';

describe('ReactJson', function () {
  
  /* Function: parseSchema */
  desribe('when parsing schema', function () {
    const rootOnlySchemaValid = {
      "component": "Tester",
      "title": "I'm a Tester"
    };
    
    describe('and when the schema\'s root type is of type', function () {
      describe('`Array`', function () {
        
      });
      describe('`object`', function () {
        it('should not return a parsed result if the root does not have the property `component`', function () {
          
        });
      });
    });
  });
});
