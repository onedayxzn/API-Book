const response = (statusCode, data, message, res) => {
  res.json(statusCode, [
    {
      statusCode,
      data: data,
      message,
    },
  ]);
};

module.exports = response;
