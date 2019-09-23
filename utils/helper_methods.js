
// Method to parse errors under the format of "errorName: errorMessage"
const errorsParser = errors => {
  const parsedErrors = [];
  errors.forEach(error => {
    for (let i = 0; i < error.message.length; i++) {
      if (error.message[i] === ':' && i !== (error.message.length - 1)) {
        const key = error.message.slice(0, i + 1);
        const value = error.message.slice(i + 1).trim();
        parsedErrors.push({ [key]: value })
        break;
      }
    }
  });

  return parsedErrors;
}

module.exports = {
  errorsParser,
}