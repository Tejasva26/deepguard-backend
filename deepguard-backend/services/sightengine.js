const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

exports.analyze = async (filePath) => {
  const form = new FormData();
  form.append('media', fs.createReadStream(filePath));
  form.append('models', 'deepfake');
  form.append('api_user', process.env.SIGHTENGINE_USER);
  form.append('api_secret', process.env.SIGHTENGINE_SECRET);

  const response = await axios.post(
    'https://api.sightengine.com/1.0/check.json',
    form,
    { headers: form.getHeaders() }
  );

  const score = response.data.deepfake?.score || 0;
  return {
    detected: score > 0.5,
    confidence: score,
    message: score > 0.5 ? 'Deepfake detected' : 'No manipulation detected'
  };
};
