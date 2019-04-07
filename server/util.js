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
  }
};

module.exports = util;