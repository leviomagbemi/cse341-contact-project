require('dotenv').config();

const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

const isProduction = process.env.NODE_ENV === 'production';
const swaggerHost = process.env.SWAGGER_HOST || (isProduction
  ? 'cse341-contact-project-qd96.onrender.com'
  : `localhost:${process.env.PORT || 3000}`);
const swaggerScheme = process.env.SWAGGER_SCHEME || (isProduction ? 'https' : 'http');

const contactBodyParameter = {
  in: 'body',
  name: 'contact',
  description: 'Contact object',
  required: true,
  schema: {
    $ref: '#/definitions/Contact'
  }
};

const doc = {
  info: {
    title: 'Contact API',
    description: 'CSE341 Contact API Project'
  },
  host: swaggerHost,
  schemes: [swaggerScheme],
  definitions: {
    Contact: {
      firstName: 'Levi',
      lastName: 'Omagbemi',
      email: 'levi@email.com',
      favoriteColor: 'Blue',
      birthday: '2002-11-16'
    }
  },
  paths: {
    '/contacts/': {
      get: {
        summary: 'Get all contacts',
        responses: {
          200: {
            description: 'Successfully retrieved contacts'
          }
        }
      },
      post: {
        summary: 'Create a new contact',
        parameters: [
          {
            in: 'body',
            name: 'contact',
            description: 'Contact object',
            required: true,
            schema: {
              $ref: '#/definitions/Contact'
            }
          }
        ],
        responses: {
          201: {
            description: 'Contact created successfully'
          },
          400: {
            description: 'Bad Request'
          }
        }
      }
    },
    '/contacts/{id}': {
      get: {
        summary: 'Get contact by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: {
            description: 'Successfully retrieved contact'
          },
          400: {
            description: 'Bad Request'
          },
          404: {
            description: 'Contact not found'
          }
        }
      },
      put: {
        summary: 'Update a contact',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string'
          },
          {
            in: 'body',
            name: 'contact',
            description: 'Updated contact object',
            required: true,
            schema: {
              $ref: '#/definitions/Contact'
            }
          }
        ],
        responses: {
          200: {
            description: 'Contact updated successfully'
          },
          400: {
            description: 'Bad Request'
          },
          404: {
            description: 'Contact not found'
          }
        }
      },
      delete: {
        summary: 'Delete a contact',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          204: {
            description: 'Contact deleted successfully'
          },
          400: {
            description: 'Bad Request'
          },
          404: {
            description: 'Contact not found'
          }
        }
      }
    }
  }
};

const outputFile = './swagger.json';
const routes = ['./app.js'];


swaggerAutogen(outputFile, routes, doc).then(() => {
  const swaggerDocument = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

  swaggerDocument.paths['/contacts/'].post.parameters = [contactBodyParameter];

  swaggerDocument.paths['/contacts/{id}'].put.parameters = [
    {
      name: 'id',
      in: 'path',
      required: true,
      type: 'string'
    },
    contactBodyParameter
  ];

  fs.writeFileSync(outputFile, JSON.stringify(swaggerDocument, null, 2));
});
