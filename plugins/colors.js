module.exports = function ({ baseColors, fnName }) {
  const bases = baseColors[ 0 ];
  return function (style) {
    for (let key in bases) {
      style.define(key, function (type) {
        let value = bases[ key ];
        let parsed = value.match(/hsla\((.*)\)/)[ 1 ].split(',');
        let hsla = new style.nodes.HSLA(
          new style.nodes.Unit(parseInt(parsed[ 0 ]), 'hue').val,
          new style.nodes.Unit(parseInt(parsed[ 1 ]), 'saturation').val,
          new style.nodes.Unit(parseInt(parsed[ 2 ]), 'lightness').val,
          new style.nodes.Unit(parseInt(parsed[ 3 ]), 'alpha').val
        )

        if (type && type.name) {
          let args = new style.nodes.Arguments;
          args.push(type)
          args.push(hsla)
          return new style.nodes.Call(fnName, args)
        } else {
          return hsla
        }
      });
    }
  };
};
