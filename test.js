function listarDir(caminho){
    const fs = require('fs')
    fs.readdir(caminho, (err, paths) => {
        console.log(paths)
    })
}
  
listarDir('C:/Users/pereira.matumona/Music')
