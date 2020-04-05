const axios = require('axios');

require('dotenv').config()
const {
  SQUARE_API_BASE_URL,
  SQUARE_API_ACCESS_TOKEN,

  URL,
  DEPLOY_URL,
  DEPLOY_PRIME_URL,

} = process.env

const checkOrigin = (origin) => {
  if (origin == URL) return true;
  if (origin == DEPLOY_URL) return true;
  if (origin == DEPLOY_PRIME_URL) return true;

  return false;
}

const api_locations = async() => {
  let result = await axios.get(
    '/v2/locations',
    {
      baseURL: SQUARE_API_BASE_URL,
      headers: {
        // 'Square-Version': '2020-03-25',
        'Authorization': `Bearer ${SQUARE_API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
    }
  );
  return result.data;
}
// test().then(function (result) { console.log(result); });

exports.handler = async (event, context) => {
  let response = {};
  const origin = event.headers.origin;
  if (origin && checkOrigin(origin)) {
    response.headers = {
      'Access-Control-Allow-Origin': origin
    };
  }
  
  let result = await api_locations();
  response.statusCode = 200;
  response.body = JSON.stringify(result);

  return response;
};