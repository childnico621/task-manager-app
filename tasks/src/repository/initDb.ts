import { db } from './db';

async function init() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log('Tabla tasks creada o ya existía.');
    process.exit(0);
  } catch (err) {
    console.error('Error creando tabla tasks:', err);
    process.exit(1);
  }
}

init();