import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VUE_APP_AWS_REGION,
});

export const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

export const polly = new AWS.Polly();
