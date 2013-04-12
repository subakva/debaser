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
      // this.queryResultTemplate = _.template(templateHTML);
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
      //[{"version":"20120510215153"},{"version":"20121010223839"},{"version":"20121011172704"},{"version":"20121011174717"},{"version":"20121012000345"},{"version":"20121016212034"},{"version":"20121017211619"},{"version":"20121106223853"},{"version":"20121109002510"},{"version":"20121113000733"},{"version":"20121120222611"},{"version":"20121221002749"},{"version":"20121222020424"},{"version":"20121222054304"},{"version":"20130105000855"},{"version":"20130105003608"},{"version":"20130109224330"},{"version":"20130214193009"},{"version":"20130219232052"},{"version":"20130221011831"},{"version":"20130226192231"},{"version":"20130227183422"},{"version":"20130313223806"},{"version":"20130401181831"},{"version":"20130403035739"},{"version":"20130403213630"}]
      console.log('success: ', data, status, xhr);
      console.log('first: ', data.rows, data.rows[0]);
      var htmlResults = this.queryResultTemplate(data);
      // var htmlResults = this.queryResultTemplate({
      //   columnNames: _.keys(data[0]),
      //   rows: data
      // });
      this.queryResults.html(htmlResults);
    },

    onQueryError: function(xhr, status, error) {
      console.log('failed: ', xhr, status, error);
      alert(error);
    }
  };

  // Initialize the query editor
  new Debaser.QueryEditor(
    '#sql-editor',
    '#query-result',
    '#query-result-template'
  );
});
