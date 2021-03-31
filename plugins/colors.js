module.exports = function ({ baseColors }) {
  const bases = baseColors[ 0 ];
  return function (style) {
    for (let key in bases) {
      style.define(key, function (...types) {
        let value = bases[ key ];
        let parsed = value.match(/hsla\((.*)\)/)[ 1 ].split(',');

        const colorParts = [
          'hue',
          'saturation',
          'lightness',
          'alpha'
        ];

        const hslaParts = colorParts.reduce((acc, cur, ind) => {
          acc[cur] = parseInt(parsed[ind]);
          return acc;
        }, {});

        const modMap = {
          LT: {
            direction: 1,
            target: 'lightness',
          },
          L: {
            direction: 1,
            target: 'lightness',
          },
          DK: {
            direction: -1,
            target: 'lightness',
          },
          D: {
            direction: -1,
            target: 'lightness',
          },
          ST: {
            direction: 1,
            target: 'saturation',
          },
          DS: {
            direction: -1,
            target: 'saturation',
          },
          A: {
            direction: 0.01,
            target: 'alpha',
            base: 0,
          },
        };

        for (arg of types) {
          if (arg && !arg.isNull) {
            const action = arg.name.match(/([A-Z]{1,2})/)[0];
            let amount = arg.name.match(/([0-9]){1,}/)[0];
            let newPart = modMap[action].base !== undefined ? modMap[action].base : hslaParts[modMap[action].target]

            if (modMap[action]) {
              amount *= modMap[action].direction;
              newPart += amount;

              hslaParts[modMap[action].target] = newPart;
            }
          }
        }

        let hsla = new style.nodes.HSLA(
          ...(Object
              .keys(hslaParts)
              .map(el => new style.nodes.Unit(hslaParts[el], el).val)
          ),
        );

        return hsla;
      });
    }
  };
};
