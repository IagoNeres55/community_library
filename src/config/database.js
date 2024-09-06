import sqlite3 from "sqlite3"

const db = new sqlite3.Database('libary_db.sqlite', (err) => {
  if(err){
    consol.log("erro ao conectar ao banco", err.message)
  } else {
    console.log("Conectado ao banco com sucesso!")
  }

})

export default db;