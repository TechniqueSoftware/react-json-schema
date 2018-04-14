/**
 * Intentionally un-minified for your debugging pleasure
*/
(function () {
  var $CONTENT = document.getElementById('content');
  var e = React.createElement;

  var playground = new ReactJsonSchema.default();

  var editor = ace.edit('editor', {
    mode: 'ace/mode/json',
    highlightActiveLine: false,
    showFoldWidgets: false,
    showLineNumbers: false,
    displayIndentGuides: false,
    fontSize: 14,
    fontFamily: 'Roboto Mono',
    theme: 'ace/theme/chrome',
    useSoftTabs: true,
    tabSize: 2
  });

  function renderData() {
    try {
      var data = JSON.parse(editor.getValue());
      ReactDOM.render(playground.parseSchema(data), $CONTENT);
    } catch (e) {
      ReactDOM.render(e.message, $CONTENT);
    }
  }

  editor.on('change', renderData);

  renderData();
})();
