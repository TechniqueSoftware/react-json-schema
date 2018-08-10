(function () {
  var aceConfig = {
    mode: 'ace/mode/json',
    highlightActiveLine: false,
    showFoldWidgets: false,
    showLineNumbers: false,
    displayIndentGuides: false,
    fontSize: 14,
    fontFamily: 'Roboto Mono',
    theme: 'ace/theme/terminal',
    useSoftTabs: false,
    tabSize: 2,
    showGutter: false,
  };

  var exampleConfig = [{
    id: 'formExample',
    outputId: 'formExampleOutput',
  }, {
    id: 'swiperExample',
    outputId: 'swiperExampleOutput',
    rjsComponentMap: {
      Swiper: ReactIdSwiper
    }
  }];

  var examples = [];
  exampleConfig.forEach(function (config) {
    var rjsInstance = new ReactJsonSchema.default();
    if (config.rjsComponentMap) {
      rjsInstance.setComponentMap(config.rjsComponentMap);
    }
    var editor = ace.edit(config.id, aceConfig);
    var example = {
      id: config.id,
      outputId: config.outputId,
      rjs: rjsInstance,
      editor: editor
    };
    editor.on('change', function (event) {
      renderData(example, event);
    });
    examples.push(example);
    renderData(example);
  });

  function renderData(example, event) {
    var $content = document.getElementById(example.outputId);
    try {
      var data = JSON.parse(example.editor.getValue());
      ReactDOM.render(example.rjs.parseSchema(data), $content);
    } catch (e) {
      ReactDOM.render(React.createElement('span', {
        'style': { 'color': 'rgb(238, 16, 0)' }
      }, e.message), $content);
    }
  }
})();
