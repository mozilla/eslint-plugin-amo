const mapPositionsToArgs = (replacement, positions, staticArg) => {
  const args = [];

  const highestPosition = positions[positions.length - 1];

  for (let i = 0; i <= highestPosition; i++) {
    if (positions.includes(i)) {
      if (Array.isArray(replacement)) {
        args.push(...replacement);
      } else {
        args.push(replacement);
      }
    } else if (staticArg) {
      args.push(staticArg);
    }
  }

  return args;
};

const getArgs = (arg, positions) => {
  const args = mapPositionsToArgs(arg, positions, "'static'");
  return args.length > 1 ? args.join(', ') : args[0];
};

const getI18nValidCases = (methods, validInputs) => {
  return methods.reduce((acc, [method, positions]) => {
    const valid = validInputs.map((input) => {
      const args = getArgs(input, positions);
      return {
        code: `i18n.${method}(${args})`,
      };
    });
    return [...acc, ...valid];
  }, []);
};

const getI18nInvalidCases = (methods, invalidInputs) => {
  return methods.reduce((acc, [method, positions]) => {
    const invalid = invalidInputs.map(({ input, errors, output }) => {
      const args = getArgs(input, positions);
      const config = {
        code: `i18n.${method}(${args})`,
        errors: mapPositionsToArgs(errors, positions),
      };
      if (output) {
        config.output = `i18n.${method}(${getArgs(output, positions)})`;
      }
      return config;
    });
    return [...acc, ...invalid];
  }, []);
};

module.exports = {
  getI18nValidCases,
  getI18nInvalidCases,
};
