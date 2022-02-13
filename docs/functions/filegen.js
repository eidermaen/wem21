const {createReturnObject, parseRequestBody} = require('./utils');

exports.handler = async function (event, context) {
  const {httpMethod} = event;
  const body = parseRequestBody(event.body);

  if (httpMethod !== 'POST') {
    return createReturnObject(405);
  }

  try {
    const type = body.type;

    if (!['num', 'alpha'].includes(type)) {
      throw new Error('No correct data sent.');
    }

    const count = parseInt(body.count);

    let outputString = '';

    for (let i = 0; i < count; i++) {
      switch (type) {
        case 'num':
          outputString += `${i}.\n`;
          break;
        case 'alpha':
          outputString += `${getCharacter(i)}\n`;
          break;
        default:
          break;
      }
    }

    return createReturnObject(200, {
      data: outputString
    });
  } catch (e) {
    return createReturnObject(500, {error: e.message});
  }
}

function getCharacter (i) {
  const div = Math.floor(i / 26);
  if (div === 0) {
    return String.fromCharCode((i + 65)).toUpperCase();
  }

  const output = [];
  const rest = i % 26;
  let tmp = getCharacter(div - 1);
  tmp += getCharacter(rest);
  output.push(tmp);

  return output.join('');
}
