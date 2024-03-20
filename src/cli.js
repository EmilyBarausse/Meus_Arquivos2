//Comand Line Interface (cli)

import pegaArquivo from "./index.js";

import fs from "fs";

import chalk from "chalk";

//1) criar uma variavel para recepcionar o caminho via terminal

const caminho = process.argv;
//console.log(caminho);

// pegaArquivo(caminho[2]);

function imprimeLista(resultado, identificador=""){
    console.log(chalk.yellow('Lista de Links'),
    chalk.black.bgGreen(identificador),
    resultado);
}

async function processaTexto(argumentos){
    const caminho=argumentos[2];
    try{
        fs.statSync(caminho)
    }
    catch(erro){
        if(erro.code==="ENOENT"){
            console.log("Arquivo ou diretório não encontrado.");
            return;
        }
    }

    if(fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(caminho);
        // console.log(chalk.yellow('Lista de Links'), resultado);
        imprimeLista(resultado);
    }else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos=await fs.promises.readdir(caminho);
        arquivos.forEach(async(nomeDoArquivo)=>{
            const lista=await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            //console.log(`${caminho}/${nomeDoArquivo}`);
            //console.log(lista);
            imprimeLista(lista,nomeDoArquivo);
        })
    }
    

}

processaTexto(caminho);

