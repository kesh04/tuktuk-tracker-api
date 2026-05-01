import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TukTuk Tracking API',
      version: '1.0.0',
      description: 'API for tracking tuk-tuk vehicles across Sri Lanka police jurisdictions',
      contact: {
        name: 'API Support'
      }
    },
   servers: [
  {
    url: process.env.NODE_ENV === 'production'
      ? 'http://tuktuk-tracking-api-env.eba-2vamptqe.ap-southeast-1.elasticbeanstalk.com'
      : 'http://localhost:3000',
    description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
  }
],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token (login first to get one)'
        }
      },
      schemas: {

        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email:    { type: 'string', format: 'email', example: 'admin@police.lk' },
            password: { type: 'string', example: 'Admin@123' }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            _id:           { type: 'string' },
            username:      { type: 'string' },
            email:         { type: 'string' },
            role:          { type: 'string', enum: ['central_admin', 'provincial_admin', 'police_station', 'viewer'] },
            province:      { type: 'object', nullable: true },
            district:      { type: 'object', nullable: true },
            policeStation: { type: 'object', nullable: true },
            token:         { type: 'string' }
          }
        },

        Province: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            name:      { type: 'string', example: 'Western Province' },
            code:      { type: 'string', example: 'WP' },
            districts: { type: 'array', items: { type: 'object' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ProvinceInput: {
          type: 'object',
          required: ['name', 'code'],
          properties: {
            name: { type: 'string', example: 'Western Province' },
            code: { type: 'string', example: 'WP' }
          }
        },

        District: {
          type: 'object',
          properties: {
            _id:            { type: 'string' },
            name:           { type: 'string', example: 'Colombo' },
            code:           { type: 'string', example: 'COL' },
            province:       { type: 'object' },
            policeStations: { type: 'array', items: { type: 'object' } },
            createdAt:      { type: 'string', format: 'date-time' },
            updatedAt:      { type: 'string', format: 'date-time' }
          }
        },
        DistrictInput: {
          type: 'object',
          required: ['name', 'code', 'province'],
          properties: {
            name:     { type: 'string', example: 'Colombo' },
            code:     { type: 'string', example: 'COL' },
            province: { type: 'string', description: 'Province ObjectId' }
          }
        },

   
        PoliceStation: {
          type: 'object',
          properties: {
            _id:           { type: 'string' },
            name:          { type: 'string', example: 'Colombo Fort Police Station' },
            code:          { type: 'string', example: 'COL_PS_01' },
            district:      { type: 'object' },
            address:       { type: 'string' },
            contactNumber: { type: 'string' },
            location: {
              type: 'object',
              properties: {
                type:        { type: 'string', enum: ['Point'] },
                coordinates: { type: 'array', items: { type: 'number' }, example: [79.8428, 6.9344] }
              }
            }
          }
        },
        PoliceStationInput: {
          type: 'object',
          required: ['name', 'code', 'district'],
          properties: {
            name:          { type: 'string', example: 'New Police Station' },
            code:          { type: 'string', example: 'NEW_PS_01' },
            district:      { type: 'string', description: 'District ObjectId' },
            address:       { type: 'string', example: 'Main Street, Colombo' },
            contactNumber: { type: 'string', example: '0112421111' },
            location: {
              type: 'object',
              properties: {
                type:        { type: 'string', enum: ['Point'], default: 'Point' },
                coordinates: { type: 'array', items: { type: 'number' }, example: [79.8428, 6.9344], description: '[longitude, latitude]' }
              }
            }
          }
        },


        Vehicle: {
          type: 'object',
          properties: {
            _id:                { type: 'string' },
            registrationNumber: { type: 'string', example: 'CAA-1234' },
            ownerName:          { type: 'string', example: 'Sunil Perera' },
            ownerNic:           { type: 'string', example: '901234567V' },
            ownerPhone:         { type: 'string', example: '0771234567' },
            deviceId:           { type: 'string', example: 'DEV0001100' },
            status:             { type: 'string', enum: ['active', 'inactive', 'suspended'] },
            district:           { type: 'object' },
            policeStation:      { type: 'object' },
            lastLocation: {
              type: 'object',
              properties: {
                type:        { type: 'string', enum: ['Point'] },
                coordinates: { type: 'array', items: { type: 'number' } },
                timestamp:   { type: 'string', format: 'date-time' }
              }
            }
          }
        },
        VehicleInput: {
          type: 'object',
          required: ['registrationNumber', 'ownerName', 'ownerNic', 'deviceId', 'district'],
          properties: {
            registrationNumber: { type: 'string', example: 'CAA-5678' },
            ownerName:          { type: 'string', example: 'Nimal Silva' },
            ownerNic:           { type: 'string', example: '901234567V' },
            ownerPhone:         { type: 'string', example: '0771234567' },
            deviceId:           { type: 'string', example: 'DEV9999100' },
            status:             { type: 'string', enum: ['active', 'inactive', 'suspended'], default: 'active' },
            district:           { type: 'string', description: 'District ObjectId' },
            policeStation:      { type: 'string', description: 'PoliceStation ObjectId' }
          }
        },


        LocationPing: {
          type: 'object',
          properties: {
            _id:       { type: 'string' },
            vehicle:   { type: 'string' },
            location: {
              type: 'object',
              properties: {
                type:        { type: 'string', enum: ['Point'] },
                coordinates: { type: 'array', items: { type: 'number' }, description: '[longitude, latitude]' }
              }
            },
            speed:     { type: 'number' },
            heading:   { type: 'number' },
            accuracy:  { type: 'number' },
            timestamp: { type: 'string', format: 'date-time' }
          }
        },
        PingInput: {
          type: 'object',
          required: ['deviceId', 'latitude', 'longitude'],
          properties: {
            deviceId:  { type: 'string', example: 'DEV0001100' },
            latitude:  { type: 'number', example: 6.9271 },
            longitude: { type: 'number', example: 79.8612 },
            speed:     { type: 'number', example: 35 },
            heading:   { type: 'number', example: 180 },
            accuracy:  { type: 'number', example: 10 }
          }
        },


        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data:    { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' }
          }
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            total:   { type: 'number' },
            page:    { type: 'number' },
            limit:   { type: 'number' },
            pages:   { type: 'number' },
            data:    { type: 'array', items: { type: 'object' } }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }],


    paths: {
  
      '/api/auth/login': {
        post: {
          tags: ['Auth'],
          summary: 'Login user',
          description: 'Authenticate with email and password to receive a JWT token',
          security: [],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } }
          },
          responses: {
            200: { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
            401: { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
          }
        }
      },
      '/api/auth/me': {
        get: {
          tags: ['Auth'],
          summary: 'Get current user',
          description: 'Returns the authenticated user profile',
          responses: {
            200: { description: 'User profile', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
            401: { description: 'Not authenticated' }
          }
        }
      },


      '/api/admin/provinces': {
        get: {
          tags: ['Provinces'],
          summary: 'Get all provinces',
          responses: {
            200: { description: 'List of provinces', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } }
          }
        },
        post: {
          tags: ['Provinces'],
          summary: 'Create a province',
          description: 'Only central_admin can create provinces',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ProvinceInput' } } }
          },
          responses: {
            201: { description: 'Province created' },
            403: { description: 'Not authorized' }
          }
        }
      },
      '/api/admin/provinces/{id}': {
        get: {
          tags: ['Provinces'],
          summary: 'Get a province by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' }, description: 'Province ObjectId' }],
          responses: { 200: { description: 'Province details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Provinces'],
          summary: 'Update a province',
          description: 'Only central_admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ProvinceInput' } } } },
          responses: { 200: { description: 'Province updated' }, 404: { description: 'Not found' } }
        },
        delete: {
          tags: ['Provinces'],
          summary: 'Delete a province',
          description: 'Only central_admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } }
        }
      },

      '/api/admin/districts': {
        get: {
          tags: ['Districts'],
          summary: 'Get all districts',
          description: 'Filtered by geographic access. Supports pagination.',
          parameters: [
            { name: 'province', in: 'query', schema: { type: 'string' }, description: 'Filter by province ObjectId' },
            { name: 'page',     in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit',    in: 'query', schema: { type: 'integer', default: 30 } }
          ],
          responses: { 200: { description: 'Paginated list of districts' } }
        },
        post: {
          tags: ['Districts'],
          summary: 'Create a district',
          description: 'Only central_admin',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DistrictInput' } } } },
          responses: { 201: { description: 'District created' }, 403: { description: 'Not authorized' } }
        }
      },
      '/api/admin/districts/{id}': {
        get: {
          tags: ['Districts'],
          summary: 'Get a district by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'District details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Districts'],
          summary: 'Update a district',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/DistrictInput' } } } },
          responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
        },
        delete: {
          tags: ['Districts'],
          summary: 'Delete a district',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } }
        }
      },

    
      '/api/policestations': {
        get: {
          tags: ['Police Stations'],
          summary: 'Get all police stations',
          parameters: [
            { name: 'district', in: 'query', schema: { type: 'string' }, description: 'Filter by district ObjectId' },
            { name: 'page',     in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit',    in: 'query', schema: { type: 'integer', default: 50 } }
          ],
          responses: { 200: { description: 'List of police stations' } }
        },
        post: {
          tags: ['Police Stations'],
          summary: 'Create a police station',
          description: 'central_admin or provincial_admin',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PoliceStationInput' } } } },
          responses: { 201: { description: 'Police station created' }, 403: { description: 'Not authorized' } }
        }
      },
      '/api/policestations/{id}': {
        get: {
          tags: ['Police Stations'],
          summary: 'Get a police station by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Station details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Police Stations'],
          summary: 'Update a police station',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PoliceStationInput' } } } },
          responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
        },
        delete: {
          tags: ['Police Stations'],
          summary: 'Delete a police station',
          description: 'Only central_admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } }
        }
      },

   
      '/api/vehicles/ping': {
        post: {
          tags: ['Vehicles'],
          summary: 'Submit a location ping',
          description: 'Public endpoint — no auth needed. Devices send GPS data here.',
          security: [],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/PingInput' } } } },
          responses: {
            201: { description: 'Ping recorded' },
            404: { description: 'Device not registered' },
            403: { description: 'Vehicle is not active' }
          }
        }
      },
      '/api/vehicles': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get all vehicles',
          parameters: [
            { name: 'status',             in: 'query', schema: { type: 'string', enum: ['active', 'inactive', 'suspended'] } },
            { name: 'district',           in: 'query', schema: { type: 'string' }, description: 'District ObjectId' },
            { name: 'registrationNumber', in: 'query', schema: { type: 'string' }, description: 'Search by registration' },
            { name: 'page',               in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit',              in: 'query', schema: { type: 'integer', default: 20 } }
          ],
          responses: { 200: { description: 'Paginated vehicle list' } }
        },
        post: {
          tags: ['Vehicles'],
          summary: 'Register a new vehicle',
          description: 'central_admin or provincial_admin',
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VehicleInput' } } } },
          responses: { 201: { description: 'Vehicle created' }, 403: { description: 'Not authorized' } }
        }
      },
      '/api/vehicles/{id}': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get a vehicle by ID',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Vehicle details' }, 404: { description: 'Not found' } }
        },
        put: {
          tags: ['Vehicles'],
          summary: 'Update a vehicle',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/VehicleInput' } } } },
          responses: { 200: { description: 'Updated' }, 404: { description: 'Not found' } }
        },
        delete: {
          tags: ['Vehicles'],
          summary: 'Delete a vehicle',
          description: 'Only central_admin',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Deleted' }, 404: { description: 'Not found' } }
        }
      },
      '/api/vehicles/{id}/location': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get last known location',
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Last location data' }, 404: { description: 'Not found' } }
        }
      },
      '/api/vehicles/{id}/history': {
        get: {
          tags: ['Vehicles'],
          summary: 'Get vehicle location history',
          parameters: [
            { name: 'id',    in: 'path',  required: true, schema: { type: 'string' } },
            { name: 'from',  in: 'query', schema: { type: 'string', format: 'date-time' }, description: 'Start datetime' },
            { name: 'to',    in: 'query', schema: { type: 'string', format: 'date-time' }, description: 'End datetime' },
            { name: 'page',  in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit', in: 'query', schema: { type: 'integer', default: 100 } }
          ],
          responses: { 200: { description: 'Paginated location history' } }
        }
      },


      '/api/locations/live': {
        get: {
          tags: ['Locations'],
          summary: 'Get live locations of all active vehicles',
          parameters: [
            { name: 'district', in: 'query', schema: { type: 'string' }, description: 'Filter by district ObjectId' }
          ],
          responses: { 200: { description: 'Live vehicle locations with count' } }
        }
      },
      '/api/locations/history': {
        get: {
          tags: ['Locations'],
          summary: 'Get location history across vehicles',
          parameters: [
            { name: 'vehicleId', in: 'query', schema: { type: 'string' }, description: 'Filter by vehicle ObjectId' },
            { name: 'district',  in: 'query', schema: { type: 'string' }, description: 'Filter by district ObjectId' },
            { name: 'from',      in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'to',        in: 'query', schema: { type: 'string', format: 'date-time' } },
            { name: 'page',      in: 'query', schema: { type: 'integer', default: 1 } },
            { name: 'limit',     in: 'query', schema: { type: 'integer', default: 50 } }
          ],
          responses: { 200: { description: 'Paginated location history' } }
        }
      },
      '/api/locations/stats': {
        get: {
          tags: ['Locations'],
          summary: 'Get location and vehicle statistics',
          description: 'Returns vehicle counts by status and ping counts for last 24h, last week, and total',
          responses: { 200: { description: 'Statistics object' } }
        }
      }
    },

    tags: [
      { name: 'Auth',            description: 'Authentication endpoints' },
      { name: 'Provinces',       description: 'Province management (admin)' },
      { name: 'Districts',       description: 'District management (admin)' },
      { name: 'Police Stations', description: 'Police station management' },
      { name: 'Vehicles',        description: 'Vehicle registration, tracking & pings' },
      { name: 'Locations',       description: 'Live locations, history & stats' }
    ]
  },
  apis: [] 
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'TukTuk Tracker API Docs',
    swaggerOptions: {
      persistAuthorization: true
    }
  }));

  app.get('/apidocs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};