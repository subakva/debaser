define(
  [
    "../js/sql_editor"
  ],
  function(SQLEditor) {
    describe("SQLEditor", function() {
      it('is a component', function() {
        expect(SQLEditor.name).to.be.a("string");
        expect(SQLEditor.name).to.equal("Component");
      });
  });

  return {
    name: "sql_editor_spec"
  }
});
