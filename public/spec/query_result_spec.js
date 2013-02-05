define(
  [
    "../js/query_result"
  ],
  function(QueryResult) {
    describe('QueryResult', function() {
      it('is a component', function() {
        expect(QueryResult.name).to.be.a("string");
        expect(QueryResult.name).to.equal("Component");
      });
  });

  return {
    name: "query_result_spec"
  }
});
