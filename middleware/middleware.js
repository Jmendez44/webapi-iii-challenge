module.exports = {
    bouncer,
    moodyGateKeeper,
    restricted,
    only,
    cohortNamer
}


// custom  global middleware
function bouncer(req, res, next) {
    res.status(404).json({message: 'These are not the hubs you are looking for.'})
  }
  
  function cohortNamer(req, res, next) {
    req.cohort = 'WEB17'
    next()
  }
  
  function moodyGateKeeper(req, res, next) {
   const seconds = new Date().getSeconds()
  
   if (seconds % 3 === 0) {
     res.status(403).json({message: 'You shall not pass, evil Balrog!'})
   } else {
     next()
   }
  }
  
  // custom local middleware
  function restricted(req, res, next) {
    const password = req.headers.password
  
    if (password === 'Fastwerd') {
      next()
    } else {
      res.status(401).json({message: 'invalid credentials'})
    }
  }
  
  //Ask students to write a function called `only`. 
  //It should accept a `name` as it's only argument and return `middleware` that 
  //return a `403` status code if `req.headers.name` is different from the `name` specified.
  function only(name) {
    return function(req, res, next) {
      const personName = req.headers.name || "" // just in case there is no name header provided
  
      if (personName.toLowerCase() === name.toLowerCase()) {
        next()
      } else {
        res.status(401).json({message: 'You have no access to this resource.'})
      }
    }
  }