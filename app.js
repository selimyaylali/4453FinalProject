if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
  const express = require('express');
  const { Client } = require('pg');
  const app = express();
  const port = process.env.PORT || 3000;
  
  app.get('/hello', async (req, res) => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
  
    try {
      console.log('Connecting to the database...');
      await client.connect();
      console.log('Successfully connected to the database');
      const result = await client.query('SELECT NOW()');
      res.send(`Hello! The current time is: ${result.rows[0].now}`);
    } catch (err) {
      console.error('Database connection error:', err.stack);
      res.status(500).send('Database connection error');
    } finally {
      await client.end();
      console.log('Database connection closed');
    }
  });
  
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
  