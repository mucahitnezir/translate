const AWS = require('aws-sdk');

module.exports = ({ key, secret, region }) => {
  // Update aws sdk configuration
  AWS.config.update({
    accessKeyId: key,
    secretAccessKey: secret,
    region: region,
  });

  // Create client instances
  const polly = new AWS.Polly({ apiVersion: '2016-06-10' });
  const translate = new AWS.Translate({ apiVersion: '2017-07-01' });

  // Translate function
  const translateText = params => new Promise((resolve, reject) => {
    translate.translateText(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });

  // Speech Text function
  const speechText = params => new Promise((resolve, reject) => {
    const signer = new AWS.Polly.Presigner({ params, service: polly });

    signer.getSynthesizeSpeechUrl(params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve({ url });
      }
    });
  });

  return {
    speechText,
    translateText,
  };
};
