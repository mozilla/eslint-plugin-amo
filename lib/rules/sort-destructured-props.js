'use strict';

const stringNaturalCompare = require('string-natural-compare');

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description: 'Ensure destructured props are sorted',
      githubIssue: null,
      recommended: false,
    },
    messages: {
      error:
        'Destructured props must be sorted. Example: `const { Component, _a, b, c } = props;`',
    },
    fixable: 'code',
    schema: [],
  },

  create: (context) => {
    const EXCLUDED_TYPES = ['ExperimentalRestProperty', 'RestElement'];
    const SOURCE_CODE = context.getSourceCode();

    const getName = (prop) => prop.leftName;

    const sort = (props) => {
      return [...props].sort((a, b) => {
        return stringNaturalCompare(getName(a), getName(b));
      });
    };

    const sameOrder = (a, b) => {
      return a.map(getName).toString() === b.map(getName).toString();
    };

    return {
      ObjectPattern: (node) => {
        const { properties } = node;

        const props = properties
          .map((property, index) => {
            const { type, key, value } = property;

            if (EXCLUDED_TYPES.includes(property.type)) {
              return null;
            }

            let leftName = key.name;
            let rightName = key.name !== value.name ? `: ${value.name}` : null;

            if (value.type === 'ObjectPattern') {
              leftName = key.name;
              rightName = `: ${SOURCE_CODE.getText(value)}`;
            } else if (value.left) {
              const { left, right } = value;

              leftName = left.name;
              rightName = ` = ${SOURCE_CODE.getText(right)}`;
            }

            return {
              leftName,
              rightName,
            };
          })
          .filter((prop) => prop !== null);

        const sortedProps = sort(props);

        if (!sameOrder(props, sortedProps)) {
          context.report({
            node,
            messageId: 'error',
            fix: (fixer) => {
              return sortedProps.map((prop, index) => {
                let newText = getName(prop);
                if (prop.rightName) {
                  newText = `${newText}${prop.rightName}`;
                }

                return fixer.replaceText(properties[index], newText);
              });
            },
          });
        }
      },
    };
  },
};
