import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('rifast.db');

db.execSync(`
  CREATE TABLE IF NOT EXISTS talonarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      precio INTEGER NOT NULL,
      cantidad_numeros INTEGER NOT NULL,
      cantidad_ganadores INTEGER NOT NULL,
      fecha TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS estados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS ventas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    talonario_id INTEGER NOT NULL,
    comprador TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado_id INTEGER NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (talonario_id) REFERENCES talonarios(id),
    FOREIGN KEY (estado_id) REFERENCES estados(id)
  );

  CREATE TABLE IF NOT EXISTS numeros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    talonario_id INTEGER NOT NULL,
    numero INTEGER NOT NULL,
    venta_id INTEGER,
    FOREIGN KEY (talonario_id) REFERENCES talonarios(id),
    FOREIGN KEY (venta_id) REFERENCES ventas(id),
    UNIQUE (talonario_id, numero)
  );

  CREATE TABLE IF NOT EXISTS sorteos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      talonario_id INTEGER NOT NULL,
      numero INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      UNIQUE (talonario_id, numero),
      FOREIGN KEY (talonario_id) REFERENCES talonarios(id)
  );
  
`);

db.execSync(`
  INSERT OR IGNORE INTO estados (nombre)
  VALUES
    ('Apartado'),
    ('Revisando'),
    ('Validado');
`);
