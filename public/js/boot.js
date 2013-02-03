'use strict';

define(
  [
    'js/sql_editor',
    'js/query_results'
  ],
  function(
    SQLEditor,
    QueryResults
  ) {
    function initialize() {
      SQLEditor.attachTo('#sql-editor');
      QueryResults.attachTo('#query-results');
    }
    return initialize;
  }
);
