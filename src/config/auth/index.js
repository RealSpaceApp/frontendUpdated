//config/auth/index.js:
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '613996156544-2e5oc8vqug12s0ti92o4majdtl722331.apps.googleusercontent.com',
  offlineAccess: true, // This allows you to get the refresh token as well
  scopes: ['profile', 'email', 'https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
});

export const _signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    const { idToken } = userInfo;
    const tokens = await GoogleSignin.getTokens();
    const { accessToken } = tokens;

    const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredentials);
    return { idToken, accessToken, userInfo };
  } catch (error) {
    console.log('=> Google Sign In', error);
    return null;
  }
};
