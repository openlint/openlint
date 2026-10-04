const { oas2, oas3_0, oas3_1 } = require('@openlint/openlint-formats');
module.exports = {
  aliases: {
    schema: {
      description: 'Foo',
      targets: [
        {
          formats: [oas2],
          given: ['$.definitions[*]'],
        },
        {
          formats: [oas3_0, oas3_1],
          given: ['$.components.schemas[*]'],
        },
      ],
    },
  },
};
