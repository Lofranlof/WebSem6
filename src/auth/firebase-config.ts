import * as process from 'process';

const firebaseConfig = {
  type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  privateKeyId: process.env.PRIVATE_KEY_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  clientId: process.env.CLIENT_ID,
  authUri: process.env.AUTH_URI,
  tokenUri: process.env.TOKEN_URI,
  authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
};

export default firebaseConfig;