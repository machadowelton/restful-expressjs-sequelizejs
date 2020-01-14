module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'Biblioteca',
    description: '',
    termsOfService: '',
    contact: {
      name: 'biblioteca@email.com',
      email: 'biblioteca@email.com',
      url: 'https://www.biblioteca.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000/rest',
      description: 'Local server',
    },
    // {
    //   url: 'https://api_url_testing',
    //   description: 'Testing server',
    // },
    // {
    //   url: 'https://api_url_production',
    //   description: 'Production server',
    // },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: 'Leitores',
    },
    {
      name: 'Login',
    },
  ],
  paths: {
    '/login': {
      get: {
        tags: ['Login'],
        description: 'Login de usuários',
        operationId: 'Login',
        security: {
          basicAuth: [],
        },
        responses: {
          '200': {
            description: 'a',
          },
        },
      },
    },
    '/leitor/{id}': {
      get: {
        tags: ['Leitores'],
        description: 'Retornará um leitor de acordo com o id',
        operationId: 'Buscar Leitor pelo id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              type: 'integer',
              default: 1,
            },
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'Leitores listados',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Leitor',
                },
              },
            },
          },
          '400': {
            description: 'Erro ao listar',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Parâmetros invalidos: count',
                  internal_code: '',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Leitores'],
        description: 'Irá deletar um leitor de acordo com id',
        operationId: 'Deletar Leitor por id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              type: 'integer',
              default: 1,
            },
            required: true,
          },
        ],
        responses: {
          '200': {
            description: 'Leitores listados',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Leitores',
                },
              },
            },
          },
          '400': {
            description: 'Erro ao listar',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Parâmetros invalidos: count',
                  internal_code: '',
                },
              },
            },
          },
        },
      },
    },
    '/leitor': {
      get: {
        tags: ['Leitores'],
        description: 'listarPaginado',
        operationId: 'listarPaginado',
        parameters: [
          {
            name: 'count',
            in: 'query',
            schema: {
              type: 'integer',
              default: 1,
            },
            required: true,
          },
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              default: 1,
            },
            required: true,
          },
          {
            name: 'order',
            in: 'query',
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
              default: 'asc',
            },
            required: false,
          },
        ],
        responses: {
          '200': {
            description: 'Leitores listados',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Leitores',
                },
              },
            },
          },
          '400': {
            description: 'Erro ao listar',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
                example: {
                  message: 'Parâmetros invalidos: count',
                  internal_code: '',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Usuario: {
        type: 'object',
        description: 'Schema do usuário',
        properties: {
          id: {
            type: 'integer',
            description: 'id do usuario',
          },
          emai: {
            type: 'string',
            description: 'email do usuario',
          },
          senha: {
            type: 'string',
            description: 'Senha do usuario',
          },
          permissao: {
            type: 'string',
            enum: ['leitor, operador'],
            default: '',
          },
        },
      },
      Leitor: {
        type: 'object',
        description: 'Schema de cadastro do leitor',
        properties: {
          nome: {
            type: 'string',
            description: 'Nome do leitor',
          },
          sobrenome: {
            type: 'string',
            description: 'Sobrenome do leitor',
          },
          dat_nascimento: {
            type: 'string',
            description: 'Data de nascimento',
          },
          email: {
            type: 'string',
            description: 'Email do leitor',
          },
          cpf: {
            type: 'string',
            description: 'cpf do leitor',
          },
        },
      },
      LeitorCadastro: {
        type: 'object',
        description: 'Schema de cadastro do leitor',
        $ref: '#/components/schemas/Leitor',
        properties: {
          usuario: {
            $ref: '#/components/schemas/Usuario',
          },
        },
      },
      Leitores: {
        type: 'array',
        $ref: '#/components/schemas/Leitor',
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          internal_code: {
            type: 'string',
          },
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
      basicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    securityDefinitions: {
      basicAuth: {
        type: 'basic',
      },
    },
    security: {
      basicAuth: [],
    },
  },
};
