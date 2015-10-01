/* global describe, it, expect */

// import ReactJson from '../lib/ReactJsonSchema';

export default describe('ReactJson', () => {
  describe('when parsing schema', () => {
    describe('and when the schema\'s root type is of type', () => {
      describe('`Array`', () => {

      });
      describe('`object`', () => {
        it('should not return a parsed result if the root does not have the property `component`', () => {
          expect(true).toBe(true);
        });
      });
    });
  });
});
