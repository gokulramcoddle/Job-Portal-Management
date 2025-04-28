 
const methodLog = (req,res,next)=>{
    console.log(`Running: ${req.method} ${req.url}`)
    next()
}

module.exports = methodLog