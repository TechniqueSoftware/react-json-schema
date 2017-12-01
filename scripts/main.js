/**
 * Intentionally un-minified for your debugging pleasure
*/
(function () {
  var e = React.createElement;

  /**
   * React components
   */
  var Greeting = createReactClass({
    render: function() {
      return e('h1', null, 'Hello world!');
    }
  });

  var playgroundSchema = {
    "component": "div",
    "className": "clearfix",
    "children": [{
      "component": "div",
      "className": "sm-col sm-col-6",
      "text": "Suckers"
    },{
      "component": "div",
      "className": "sm-col sm-col-6",
      "text": "Suckers"
    }]
  }

  // var playground = ReactJsonSchema();
  ReactDOM.render(React.createElement(Greeting),
      document.getElementById('content'));
})();
