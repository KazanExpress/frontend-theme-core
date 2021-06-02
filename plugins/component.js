module.exports = function () {
  return function (style) {
    style.define('log', function() {
      console.log(...arguments);
    });
    style.define('getName', function(node) {
      return new style.nodes.Literal(node.name || node);
    });
    style.define('WrapRegisterComponent', function (name, block) {
      style.define(`__${name}Block`, function() {
        return block;
      })
      style.define(`${name}`, function (...args) {

        const callArgs = new style.nodes.Arguments();
        callArgs.push(new style.nodes.Literal(name.name || name));

        for (let arg of args) {
          if (arg && !arg.isNull) {
            callArgs.push(new style.nodes.Literal(arg.name));
          }
        }

        return new style.nodes.Call('ApplyMods', callArgs);
      });
    });

    style.define('WrapRegisterMod', function (name, namespace, block) {
      style.define(`__${namespace.val}Modification${name.val}`, function () {
        return block;
      });
    });
  };
};
