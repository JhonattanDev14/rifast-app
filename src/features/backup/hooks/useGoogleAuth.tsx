
import { useState } from 'react';
import {
    conectarGoogleDrive,
    obtenerUsuarioGoogle,
} from '@/features/backup/services/googleAuthService';

export function useGoogleAuth() {
    const [usuarioGoogle, setUsuarioGoogle] = useState(
        obtenerUsuarioGoogle()
    );
    const [cargando, setCargando] = useState(false);

    async function conectar() {
        try {
            setCargando(true);

            const token = await conectarGoogleDrive();

            if (token) {
                const usuario = obtenerUsuarioGoogle();
                setUsuarioGoogle(usuario);

                return usuario;
            }

            return null;
        } finally {
            setCargando(false);
        }
    }

    return {
        usuarioGoogle,
        cargando,
        conectar,
    };
}
