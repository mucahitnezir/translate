const AWS = require('aws-sdk');

module.exports = ({ key, secret, region }) => {
  // Update aws sdk configuration
  AWS.config.update({
    accessKeyId: key,
    secretAccessKey: secret,
    region: region,
  });

  // Create client instances
  const polly = new AWS.Polly();
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
    polly.synthesizeSpeech(params, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });

  return {
    speechText,
    translateText,
  };
};
