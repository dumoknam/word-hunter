const util = {
  success(message, data) {
    return {
      success: true,
      message,
      data
    };
  },
  fail(message) {
    return {
      success: false,
      message,
      data: null
    }
  },
  errorName: "LoginalError",
  LogicalError(message) {
    const resData = this.fail(message);
    const error = new Error(JSON.stringify(resData));
    error.name = this.errorName;
    return error;
  }
};

module.exports = util;