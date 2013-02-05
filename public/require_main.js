require.config(
  {
    baseUrl:'.'
  }
);

require(
  [
    'require',
    'components/jquery/jquery',
    'components/bootstrap/docs/assets/js/bootstrap',
    'components/codemirror/lib/codemirror',
    'components/codemirror/mode/sql/sql',
    'components/es5-shim/es5-shim',
    'components/es5-shim/es5-sham',
    'components/flight/lib/compose',
    'components/flight/lib/registry',
    'components/flight/lib/advice',
    'components/flight/lib/logger',
    'components/flight/tools/debug/debug'
  ],
  function(require){
    var compose     = require('components/flight/lib/compose');
    var registry    = require('components/flight/lib/registry');
    var advice      = require('components/flight/lib/advice');
    var withLogging = require('components/flight/lib/logger');
    var debug       = require('components/flight/tools/debug/debug');

    debug.enable(true);
    compose.mixin(registry, [advice.withAdvice, withLogging]);

    require([ 'js/boot' ], function(initialize) {
      initialize();
    });
  }
);
