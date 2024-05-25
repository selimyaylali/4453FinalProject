const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

app.get('/hello', async (req, res) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    res.send(`Hello World! The current time is: ${result.rows[0].now}`);
  } catch (err) {
    res.status(500).send('Database connection error');
  } finally {
    await client.end();
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
