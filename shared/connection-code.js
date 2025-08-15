let connectionCode = null;

function setCode(code) {
  connectionCode = code;
}

function getCode() {
  return connectionCode;
}

module.exports = { setCode, getCode };
