'use strict';

define(

  [
    'components/flight/lib/component'
  ],

  function(defineComponent) {

    return defineComponent(sqlEditor);

    function sqlEditor() {
      this.defaultAttrs({
        sqlTextSelector: 'textarea',
        connectionSelector: 'select',
        runSelector: 'button'
      });

      this.after('initialize', function() {
        var sqlText = this.$node.find(this.attr.sqlTextSelector).get(0);
        CodeMirror.fromTextArea(sqlText, {
          mode: 'text/x-sql',
          theme: 'monokai',
          indentWithTabs: true,
          smartIndent: true,
          matchBrackets : true,
          autofocus: true
        });

        var connectionSelect = this.$node.find(this.attr.connectionSelector);
        var runButton = this.$node.find(this.attr.runSelector);
      });
    }
  }
);
