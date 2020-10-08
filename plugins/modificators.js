module.exports = function () {
  return function (style) {
    style.define('WrapMod', function (name, block) {
      style.define(`Modification${name.string}`, function () {
        return block
      });
    });
  };
};
