exports.isValidUrl = (url) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  };
  

  exports.generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };
  