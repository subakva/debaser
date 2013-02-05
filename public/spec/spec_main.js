require.config(
  {
    baseUrl:'..',
  }
);

require(
  [
    'require',
    'components/jquery/jquery',
    'spec/components/mocha/mocha',
    'spec/components/chai/chai'
  ],
  function(require){
    mocha.setup('bdd');
    require(
      [
        'spec/components/chai/chai',
        'spec/sql_editor_spec',
        'spec/query_result_spec'
      ],
      function(chai){
        expect = chai.expect;
        mocha.run();
      }
    );
  }
);
