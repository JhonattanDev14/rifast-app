
import { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
    crearBackup,
    subirBackupDrive,
    descargarBackupDrive,
    restaurarBackupDesdeRuta,
} from '@/services/backupService';

import {
    buscarBackupGoogleDrive,
} from '@/features/backup/services/googleDriveService';

export function useBackup() {
    const [subiendo, setSubiendo] = useState(false);
    const [restaurando, setRestaurando] = useState(false);

    async function obtenerTokenGoogle() {
        const { accessToken } = await GoogleSignin.getTokens();

        if (!accessToken) {
            throw new Error('No se pudo obtener el acceso a Google.');
        }

        return accessToken;
    }

    async function buscarCopias() {
        return buscarBackupGoogleDrive();
    }

    async function subirCopia() {
        try {
            setSubiendo(true);

            const accessToken = await obtenerTokenGoogle();
            const backup = await crearBackup();

            await subirBackupDrive(
                backup.nombre,
                backup.ruta,
                accessToken
            );

            return true;
        } finally {
            setSubiendo(false);
        }
    }

    async function restaurarCopia(archivoId: string) {
        try {
            setRestaurando(true);

            const accessToken = await obtenerTokenGoogle();
            const ruta = await descargarBackupDrive(
                archivoId,
                accessToken
            );

            await restaurarBackupDesdeRuta(ruta);

            return true;
        } finally {
            setRestaurando(false);
        }
    }

    return {
        subiendo,
        restaurando,
        buscarCopias,
        subirCopia,
        restaurarCopia,
    };
}
