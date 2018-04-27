(function () {
  var $CONTENT = document.getElementById('content');
  var playground = new ReactJsonSchema.default();
  playground.setComponentMap({
    Swiper: ReactIdSwiper
  });

  var editor = ace.edit('editor', {
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
  });

  function renderData() {
    try {
      var data = JSON.parse(editor.getValue());
      ReactDOM.render(playground.parseSchema(data), $CONTENT);
    } catch (e) {
      ReactDOM.render(React.createElement('span', {
        'style': { 'color': 'rgb(238, 16, 0)' }
      }, e.message), $CONTENT);
    }
  }

  editor.on('change', renderData);

  renderData();
})();
