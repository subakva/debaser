'use strict';

define(
  [
    'js/sql_editor',
    'js/query_result'
  ],
  function(
    SQLEditor,
    QueryResult
  ) {
    function initialize() {
      SQLEditor.attachTo('#sql-editor');
      QueryResult.attachTo('#query-result');
    }
    return initialize;
  }
);
