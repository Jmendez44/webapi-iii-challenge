


const nameChecker = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      errorHelper(404, 'Name must be included', res);
      next();
    } else {
      next();
    }
  };
  
  
  module.exports = {
    nameChecker
}