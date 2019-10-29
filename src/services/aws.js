import * as AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIAVE7SOPOQPIACGBGC',
  secretAccessKey: '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',
  region: 'eu-central-1',
});

export const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

export const polly = new AWS.Polly();
