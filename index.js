
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err,res) => {
  if (err){
    return console.log('Error al conectar db ' + err)
  }
  console.log('Conexion a base de datos establecida...')

  app.listen(config.port, () => {
    console.log(`api rest http://localhost:${config.port}`)
  })

})
