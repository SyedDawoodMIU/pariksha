// Import the MongoDB driver
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection URL from environment variable
const uri = process.env.MONGO_URI;

// Create a new MongoClient instance
const client = new MongoClient(uri);

async function createCollections() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database
    const db = client.db('Pariksha');

    // Check if Admin collection exists
    const adminCollections = await db.listCollections({ name: 'admins' }).toArray();
    if (adminCollections.length === 0) {
      // Create Admin collection
      await db.createCollection('admins', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              password: {
                bsonType: 'string',
                description: 'must be a string and is required'
              }
            }
          }
        }
      });
      console.log('Admin collection created');
    } else {
      console.log('Admin collection already exists');
    }

    // Check if Scholarship collection exists
    const scholarshipCollections = await db.listCollections({ name: 'scholarships' }).toArray();
    if (scholarshipCollections.length === 0) {
      // Create Scholarship collection
      await db.createCollection('scholarships', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['universityName', 'title', 'description', 'deadline', 'minimumRequirements'],
            properties: {
              universityName: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              title: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              description: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              deadline: {
                bsonType: 'date',
                description: 'must be a date and is required'
              },
              minimumRequirements: {
                bsonType: 'array',
                items: {
                  bsonType: 'string'
                },
                description: 'must be an array of strings and is required'
              }
            }
          }
        }
      });
      console.log('Scholarship collection created');
    } else {
      console.log('Scholarship collection already exists');
    }

    // Check if Application collection exists
    const applicationCollections = await db.listCollections({ name: 'applications' }).toArray();
    if (applicationCollections.length === 0) {
      // Create Application collection
      await db.createCollection('applications', {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['studentName', 'email', 'scholarshipId'],
            properties: {
              studentName: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              email: {
                bsonType: 'string',
                pattern: '^.+@.+\..+$',
                description: 'must be a valid email address and is required'
              },
              scholarshipId: {
                bsonType: 'objectId',
                description: 'must be an ObjectId and is required'
              }
            }
          }
        }
      });
      console.log('Application collection created');
    } else {
      console.log('Application collection already exists');
    }
  } catch (error) {
    console.error('Error creating collections:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function to create collections
createCollections();