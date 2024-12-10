const sqlite3 = require('sqlite3').verbose();

// Open your existing database file
const db = new sqlite3.Database('./tasks.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

// SQL to create a new table with the "created_at" column
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS tasks_new (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    unity TEXT NOT NULL,
    person TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// SQL to copy data from the old table to the new table
const copyDataSQL = `
  INSERT INTO tasks_new (id, unity, person, description, priority)
  SELECT id, unity, person, description, priority FROM tasks;
`;

// SQL to drop the old table
const dropTableSQL = `DROP TABLE IF EXISTS tasks;`;

// SQL to rename the new table to the old table's name
const renameTableSQL = `ALTER TABLE tasks_new RENAME TO tasks;`;

db.serialize(() => {
  // Create the new table
  db.run(createTableSQL, function(err) {
    if (err) {
      console.error('Error creating new table:', err.message);
      return;
    }
    console.log('New table created successfully');
  });

  // Copy the data from the old table to the new table
  db.run(copyDataSQL, function(err) {
    if (err) {
      console.error('Error copying data to new table:', err.message);
      return;
    }
    console.log('Data copied to new table');
  });

  // Drop the old table
  db.run(dropTableSQL, function(err) {
    if (err) {
      console.error('Error dropping old table:', err.message);
      return;
    }
    console.log('Old table dropped');
  });

  // Rename the new table to the old table's name
  db.run(renameTableSQL, function(err) {
    if (err) {
      console.error('Error renaming new table:', err.message);
      return;
    }
    console.log('New table renamed to tasks');
  });

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database connection closed');
    }
  });
});


