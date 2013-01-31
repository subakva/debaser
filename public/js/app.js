$(function() {
  var editor = document.getElementById('query-editor');
  // CodeMirror.fromTextArea(editor);
  CodeMirror.fromTextArea(editor, {
    mode: 'text/x-sql',
    theme: 'monokai',
    indentWithTabs: true,
    smartIndent: true,
    matchBrackets : true,
    autofocus: true
  });
});
