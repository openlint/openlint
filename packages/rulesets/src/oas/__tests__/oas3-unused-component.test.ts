import { DiagnosticSeverity } from '@stoplight/types';
import * as path from '@stoplight/path';
import * as Parsers from '@openlint/openlint-parsers';
import { Document } from '@openlint/openlint-core';

import testRule from '../../__tests__/__helpers__/tester';
import unusedComponentNegative from '../../__tests__/__fixtures__/unusedComponent.negative.json';
import unusedComponent from '../../__tests__/__fixtures__/unusedComponent.json';
import unusedComponentsSchemaRemoteLocal from './__fixtures__/unusedShared/unusedComponentsSchema.remoteLocal.json';
import unusedComponentsSchemaDefinition from './__fixtures__/unusedShared/unusedComponentsSchema.definition.json';
import unusedComponentsSchemaIndirect1 from './__fixtures__/unusedShared/unusedComponentsSchema.indirect.1.json';
import unusedComponentsSchemaIndirect2 from './__fixtures__/unusedShared/unusedComponentsSchema.indirect.2.json';

const remoteLocalDocument = new Document<any, any>(
  JSON.stringify(unusedComponentsSchemaRemoteLocal),
  Parsers.Json,
  path.join(__dirname, './__fixtures__/unusedShared/unusedComponentsSchema.remoteLocal.json'),
);
const definitionDocument = new Document<any, any>(
  JSON.stringify(unusedComponentsSchemaDefinition),
  Parsers.Json,
  path.join(__dirname, './__fixtures__/unusedShared/unusedComponentsSchema.definition.json'),
);
const indirectDocument = new Document<any, any>(
  JSON.stringify(unusedComponentsSchemaIndirect1),
  Parsers.Json,
  path.join(__dirname, './__fixtures__/unusedShared/unusedComponentsSchema.indirect.1.json'),
);
const indirect2Document = new Document<any, any>(
  JSON.stringify(unusedComponentsSchemaIndirect2),
  Parsers.Json,
  path.join(__dirname, './__fixtures__/unusedShared/unusedComponentsSchema.indirect.2.json'),
);

testRule('oas3-unused-component', [
  {
    name: 'empty object',
    document: {
      openapi: '3.0.0',
    },

    errors: [],
  },

  {
    name: 'meeting an invalid json pointer',
    document: {
      openapi: '3.0.0',
      'x-hook': {
        $ref: "'$#@!!!' What?",
      },
      paths: {},
      components: {
        schemas: {
          NotHooked: {
            type: 'object',
          },
        },
      },
    },
    errors: [
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'schemas', 'NotHooked'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },

  {
    name: 'all components are referenced',
    document: unusedComponentNegative,
    errors: [],
  },

  {
    name: 'orphaned components',
    document: unusedComponent,

    errors: [
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'schemas', 'SomeSchema'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'parameters', 'SomeParameter'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'requestBodies', 'SomeBody'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'callbacks', 'SomeCallback'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'examples', 'SomeExample'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'headers', 'SomeHeader'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'links', 'SomeLink'],
        severity: DiagnosticSeverity.Warning,
      },
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'responses', 'SomeResponse'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
  },

  {
    name: 'unreferenced components when analyzing an in-memory document',
    document: {
      openapi: '3.0.0',
      'x-hook': {
        $ref: '#/components/schemas/Hooked',
      },
      'x-also-hook': {
        $ref: '#/components/schemas/Hooked',
      },
      paths: {
        '/path': {
          post: {
            parameters: [
              {
                $ref: '#/components/schemas/HookedAsWell',
              },
              {
                $ref: `${definitionDocument.source}#/components/schemas/ExternalFs`,
              },
              {
                $ref: 'https://oas3.library.com/defs.json#/components/schemas/ExternalHttp',
              },
            ],
          },
        },
      },
      components: {
        schemas: {
          Hooked: {
            type: 'object',
          },
          HookedAsWell: {
            name: 'value',
            in: 'query',
            type: 'number',
          },
          Unhooked: {
            type: 'object',
          },
        },
      },
    },
    errors: [
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'schemas', 'Unhooked'],
        severity: DiagnosticSeverity.Warning,
      },
    ],
    mocks: {
      'https://oas3.library.com/defs.json': {
        components: {
          schemas: {
            ExternalHttp: {
              type: 'number',
            },
          },
        },
      },
      [definitionDocument.source!]: definitionDocument.data,
    },
  },

  {
    name: 'a directly self-referencing document from the filesystem',
    document: remoteLocalDocument,
    errors: [],
    mocks: {
      [remoteLocalDocument.source!]: remoteLocalDocument.data,
    },
  },

  {
    name: 'an indirectly self-referencing document from the filesystem',
    document: indirectDocument,
    errors: [
      {
        message: 'Potentially unused component has been detected.',
        path: ['components', 'schemas', 'Unhooked'],
        severity: DiagnosticSeverity.Warning,
        source: indirectDocument.source!,
      },
    ],
    mocks: {
      [indirectDocument.source!]: indirectDocument.data,
      [indirect2Document.source!]: indirect2Document.data,
    },
  },
  {
    name: 'all components are referenced with percent-encoded refs',
    document: {
      openapi: '3.0.0',
      paths: {
        '/path': {
          get: {
            parameters: [
              {
                $ref: '#/components/parameters/%24top',
              },
            ],
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    $ref: '#/components/schemas/$resource',
                  },
                },
              },
              default: {
                $ref: '#/components/responses/%24default',
              },
            },
          },
        },
      },
      components: {
        parameters: {
          $top: {
            name: '$top',
            in: 'query',
            type: 'integer',
          },
        },
        responses: {
          $default: {
            description: 'Ruh Roh',
          },
        },
        schemas: {
          $resource: {
            type: 'string',
          },
        },
      },
    },
    errors: [],
  },
]);
