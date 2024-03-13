import fs from "fs";

import chalk from 'chalk';

// console.log(chalk.blue('Olá, mundo!'));

// console.log(chalk.blue.bgWhite.bold("SENAI"));

// console.log(chalk.blue('Curso', 'de', 'Node.JS'));

// console.log(chalk.red('vermelho', chalk.underline.bgBlue('azul')));

// console.log(`
// CPU: ${chalk.red('90%')}
// RAM: ${chalk.green('40%')}
// DISK: ${chalk.yellow('70%')}
// `);

//2) tratamento de erros, função para tratar dos erros
function trataErro(erro){
    console.log(erro);
    throw new Error(chalk.red(erro.code,"Não há arquivo no diretório"));
}

//1) escrever uma function que traga arquivos .md
// function pegaArquivo(caminhoDoArquivo){
//     const encoding="utf-8";
//     fs.readFile(caminhoDoArquivo, encoding, (erro,texto)=>{
//         if(erro){
//             trataErro(erro)
//         }
//         console.log(chalk.green(texto));
//     })
// }

// pegaArquivo('./arquivos/');
//callback(erro, texto)

//------------------------------ Aula sobre Promessas -----inserir método assincrono no código
//1) reescrevendo (refatorando)
// function pegaArquivo(caminhoDoArquivo){
//     const encoding='utf-8';
//     fs.promises.readFile(caminhoDoArquivo,encoding)
//     .then((texto)=>console.log(chalk
//         .yellow(texto)))
//         .catch((erro)=>trataErro(erro));
// }
// pegaArquivo('./arquivos/texto.md');

//------------------------------ Usando outra forma de solucionar as promessas (async/await)

async function pegaArquivo(caminhoDoArquivo){

    try{
        const encoding = "utf-8";
        const texto=await fs.promises.readFile(caminhoDoArquivo,encoding);
        console.log(chalk.cyan(texto));
    } catch(erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.magenta("Operação concluída"));
    }
    
}

pegaArquivo('./arquivos/');
pegaArquivo('./arquivos/texto.md');