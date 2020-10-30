module.exports = function () {
  return function (style) {
    style.define('log', function() {
      console.log(...arguments);
    });
    style.define('WrapRegisterComponent', function (name) {
      style.define(`${name}`, function (...args) {

        const callArgs = new style.nodes.Arguments();
        callArgs.push(new style.nodes.Literal(name.name));

        for (arg of args) {
          if (arg && !arg.isNull) {
            callArgs.push(new style.nodes.Literal(arg));
          }
        }

        return new style.nodes.Call('ApplyMods', callArgs);
      });
    });
  };
};
