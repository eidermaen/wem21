const {createReturnObject, parseRequestBody} = require('./utils');

exports.handler = async function (event) {
  const {httpMethod} = event;
  const {one, two} = parseRequestBody(event.body);

  if (httpMethod !== 'POST') {
    return createReturnObject(405);
  }

  try {
    let output = [[],[]];

    output[0].push(...one.split('\n'));
    output[1].push(...two.split('\n'));

    let outputString = '';
    const lengthA = output[0].length;
    const lengthB = output[1].length;
    const max = lengthA > lengthB ? lengthA : lengthB;

    for (let i = 0; i < max; i++) {
      let first = output[0][i] || '';
      let second = output[1][i] || '';

      outputString += `${first} ${second} \n`;
    }

    return createReturnObject(200, {
      data: outputString
    });

  } catch (e) {
    return createReturnObject(500, {error: e.message});
  }
}
