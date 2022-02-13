module.exports = {
  createReturnObject(status, body = {}) {
    return {
      statusCode: status,
      body: JSON.stringify(body)
    }
  },

  parseRequestBody(body) {
    try {
      return JSON.parse(body);
    } catch (_) {
      return {}
    }
  }
}
