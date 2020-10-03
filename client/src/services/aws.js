import Polly from 'aws-sdk/clients/polly';
import Translate from 'aws-sdk/clients/translate';

const baseOptions = {
  accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VUE_APP_AWS_REGION,
};

export const translate = new Translate({ apiVersion: '2017-07-01', ...baseOptions });

export const polly = new Polly(baseOptions);
