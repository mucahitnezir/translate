import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAVE7SOPOQNH5D62XC',
  secretAccessKey: '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',
  region: 'eu-central-1',
});

export const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

export const polly = new AWS.Polly();
