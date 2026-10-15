
import * as SQLite from 'expo-sqlite';
import { db } from '../database/database';
import * as FileSystem from 'expo-file-system/legacy';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export async function crearBackup() {
  const fecha = new Date().toISOString().replace(/[:.]/g, '-');
  const nombre = `rifast-backup-${fecha}.db`;

  const backupDb = await SQLite.openDatabaseAsync(nombre);

  console.log('Ruta del backup:', backupDb.databasePath);

  try {
    await SQLite.backupDatabaseAsync({
      sourceDatabase: db,
      sourceDatabaseName: 'main',
      destDatabase: backupDb,
      destDatabaseName: 'main',
    });
  } finally {
    await backupDb.closeAsync();
  }

  return {
    nombre,
    ruta: backupDb.databasePath,
  };
}



export async function subirBackupDrive(
  nombre: string,
  ruta: string,
  token: string
) {
  const uri = ruta.startsWith('file://') ? ruta : `file://${ruta}`;

  const respuesta = await FileSystem.uploadAsync(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=media&fields=id',
    uri,
    {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/octet-stream',
      },
    }
  );

    if (respuesta.status < 200 || respuesta.status >= 300) {
        throw new Error(
            `Error ${respuesta.status}: ${respuesta.body}`
        );
    }

  const archivo = JSON.parse(respuesta.body);

  const actualizacion = await fetch(
    `https://www.googleapis.com/drive/v3/files/${archivo.id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: nombre }),
    }
  );

  if (!actualizacion.ok) {
    throw new Error(`Error al asignar el nombre: ${actualizacion.status}`);
  }

  return archivo.id;
}



export async function descargarBackupDrive(
  archivoId: string,
  token: string
) {
  if (!FileSystem.documentDirectory) {
    throw new Error('No está disponible el directorio local.');
  }

  const respuesta = await fetch(
    `https://www.googleapis.com/drive/v3/files/${archivoId}?alt=media`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      `No se pudo descargar la copia. Error ${respuesta.status}.`
    );
  }

  const contenido = await respuesta.arrayBuffer();

  if (contenido.byteLength === 0) {
    throw new Error('La copia descargada está vacía.');
  }

  const nombreTemporal = `restauracion-${Date.now()}.db`;
  const ruta = `${FileSystem.documentDirectory}${nombreTemporal}`;

  const bytes = new Uint8Array(contenido);
  let binario = '';

  for (let i = 0; i < bytes.length; i++) {
    binario += String.fromCharCode(bytes[i]);
  }

  await FileSystem.writeAsStringAsync(
    ruta,
    btoa(binario),
    { encoding: FileSystem.EncodingType.Base64 }
  );

  return ruta;
}



export async function restaurarBackupDesdeRuta(ruta: string) {
    const nombreTemporal = ruta.split('/').pop();

    if (!nombreTemporal || !FileSystem.documentDirectory) {
        throw new Error('La ruta de la copia no es válida.');
    }

    let backupDb: SQLite.SQLiteDatabase | null = null;

    try {
        backupDb = await SQLite.openDatabaseAsync(
            nombreTemporal,
            {},
            FileSystem.documentDirectory
        );

        const integridad = await backupDb.getFirstAsync<{
            integrity_check: string;
        }>('PRAGMA integrity_check');

        if (integridad?.integrity_check !== 'ok') {
            throw new Error('La copia de seguridad está dañada.');
        }

        const tablas = await backupDb.getAllAsync<{ name: string }>(
            `SELECT name FROM sqlite_master WHERE type = 'table'`
        );

        const nombresTablas = new Set(tablas.map((tabla) => tabla.name));
        
        console.log('Base descargada abierta:', backupDb.databasePath);

        const requeridas = [
            'talonarios',
            'estados',
            'ventas',
            'numeros',
            'sorteos',
        ];

        if (!requeridas.every((tabla) => nombresTablas.has(tabla))) {
            throw new Error('La copia no contiene las tablas necesarias.');
        }

        // Protege la base de datos actual antes de reemplazarla.
        await crearBackup();

        await SQLite.backupDatabaseAsync({
            sourceDatabase: backupDb,
            sourceDatabaseName: 'main',
            destDatabase: db,
            destDatabaseName: 'main',
        });

        return true;
    } finally {
        if (backupDb) {
            await backupDb.closeAsync();
        }

        await FileSystem.deleteAsync(ruta, { idempotent: true });
    }
}
