import { db } from './db';

async function init() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tabla users creada o ya existía.');
    process.exit(0);
  } catch (err) {
    console.error('Error creando tabla users:', err);
    process.exit(1);
  }
}

init();