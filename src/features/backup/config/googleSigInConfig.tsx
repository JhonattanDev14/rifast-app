import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId:
        '6175263277-1nltn4lvtif9835m1nie8ebp70c39tr5.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive.file'],
});