module.exports = function () {
  return function (style) {
    style.define('getName', function (node) {
      return new style.nodes.Literal(node.name || node);
    });
    style.define('getString', function (node) {
      return new style.nodes.String(node.name || node);
    });
    style.define('WrapRegisterElement', function (name) {
      style.define(name.val, function (...args) {
        const callArgs = new style.nodes.Arguments();

        callArgs.push(new style.nodes.Literal(name.val || name));

        for (let arg of args) {
          if (arg && !arg.isNull) {
            callArgs.push(new style.nodes.Literal(arg.name));
          }
        }

        return new style.nodes.Call('ApplyMods', callArgs);
      });
    });
  };
};
