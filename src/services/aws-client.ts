import { AWSAppSyncClient, AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../../aws-exports';

export const awsclient = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});

export default awsclient;
