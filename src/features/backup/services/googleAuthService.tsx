
import {
    GoogleSignin,
    statusCodes,
    isSuccessResponse,
} from '@react-native-google-signin/google-signin';

export async function conectarGoogleDrive(): Promise<string | null> {
    try {
        await GoogleSignin.hasPlayServices();

        const response = await GoogleSignin.signIn();

        if (!isSuccessResponse(response)) {
            return null;
        }

        await GoogleSignin.addScopes({
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const { accessToken } = await GoogleSignin.getTokens();

        if (!accessToken) {
            throw new Error('Google no devolvió un token de acceso.');
        }

        return accessToken;
    } catch (error: any) {
        if (error.code === statusCodes.IN_PROGRESS) {
            throw new Error('Ya hay un inicio de sesión en curso.');
        }

        if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            throw new Error('Google Play Services no está disponible.');
        }

        throw error;
    }
}

export async function cambiarCuentaGoogle(): Promise<string | null> {
    await GoogleSignin.signOut();

    return conectarGoogleDrive();
}

export function obtenerUsuarioGoogle() {
    return GoogleSignin.getCurrentUser();
}
