
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const NOMBRE_BACKUP = 'rifast_backup.db';

export async function buscarBackupGoogleDrive() {
    const { accessToken } = await GoogleSignin.getTokens();

    
    const query = "name contains 'rifast-backup-' and trashed = false";


    const url =
        'https://www.googleapis.com/drive/v3/files' +
        `?q=${encodeURIComponent(query)}` +
        '&fields=files(id,name,mimeType,modifiedTime,size)' +
        '&pageSize=10'        
        '&orderBy=modifiedTime desc' +
        '&pageSize=10';

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('No se pudo buscar la copia en Google Drive.');
    }

    const data = await response.json();

    console.log('Backups encontrados en Drive:', data.files);

    return data.files ?? [];
}

export async function descargarBackupGoogleDrive(archivoId: string) {
    const { accessToken } = await GoogleSignin.getTokens();

    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${archivoId}?alt=media`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('No se pudo descargar la copia de seguridad.');
    }

    return await response.arrayBuffer();
}
