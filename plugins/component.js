module.exports = function () {
  return function (style) {
    style.define('log', function() {
      console.log(...arguments);
    });
    style.define('getName', function(node) {
      return new style.nodes.Literal(node.name || node);
    });
    style.define('WrapRegisterComponent', function (name) {
      style.define(`${name}`, function (...args) {

        const callArgs = new style.nodes.Arguments();
        callArgs.push(new style.nodes.Literal(name.name || name));

        for (arg of args) {
          if (arg && !arg.isNull) {
            callArgs.push(new style.nodes.Literal(arg.name));
          }
        }

        return new style.nodes.Call('ApplyMods', callArgs);
      });
    });
  };
};
