import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from '../../src/aws-exports';

export default new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: awsconfig.aws_appsync_apiKey,
  },
});
