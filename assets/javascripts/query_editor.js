$(function() {

  window.Debaser = {};

  Debaser.QueryEditor = function(formSelector, resultSelector, resultTemplateSelector) {
    this.initializeEditor(formSelector);
    this.initialeQueryResults(resultSelector, resultTemplateSelector);
  };

  Debaser.QueryEditor.prototype = {
    initializeEditor: function(formSelector) {
      this.queryForm = $(formSelector);
      this.queryText = $('textarea', this.queryForm);
      CodeMirror.fromTextArea(this.queryText.get(0), {
        mode: 'text/x-sql',
        theme: 'monokai',
        indentWithTabs: true,
        smartIndent: true,
        matchBrackets : true,
        autofocus: true
      });
      this.initializeForm();
    },

    initializeForm: function() {
      this.queryForm.on('submit', function(self) {
        return function(event) {
          self.onFormSubmit(event);
        };
      }(this));
    },

    initialeQueryResults: function(resultSelector, resultTemplateSelector) {
      var templateHTML = $(resultTemplateSelector).html();
      this.queryResultTemplate = Mustache.compile(templateHTML);
      this.queryResults = $(resultSelector);
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      var form = this.queryForm;

      $.ajax({
        type:   form.attr('method'),
        url:    form.attr('action'),
        data:   form.serialize(),
        dataType: 'json',
        cache:  false,
        success: function(self) {
          return function(data, status, xhr) {
            self.onQuerySuccess(data, status, xhr);
          };
        }(this),
        error: function(self) {
          return function(xhr, status, error) {
            self.onQueryError(xhr, status, error);
          };
        }(this)
      });
      return false;
    },

    onQuerySuccess: function(data, status, xhr) {
      console.log('success: ', data, status, xhr);
      console.log('first: ', data.rows, data.rows[0]);
      var htmlResults = this.queryResultTemplate(data);
      this.queryResults.html(htmlResults);
    },

    onQueryError: function(xhr, status, error) {
      console.log('failed: ', xhr, status, error);
      var data = $.parseJSON(xhr.responseText);
      alert(data.message);
    }
  };

  // Initialize the query editor
  new Debaser.QueryEditor(
    '#sql-editor',
    '#query-result',
    '#query-result-template'
  );
});
