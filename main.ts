import chiedi from "prompts";
import { Command } from 'commander';
import system = require('system-commands')
import { ProceduraInizializzaProgettoTypescript } from "./procedura";
import { ProceduraTypeORM } from "./TypeORM/ProceduraTypeORM";

const program = new Command();
export interface IStruttura { }
export class Struttura implements IStruttura {

    nome: string = "struttura";
    listaDocumentazione: string[] = [];
    listaComandi: string[] = [];

    constructor() {

    }
}

export class Main {

    constructor() {

    }

    async Menu() {

        let esco: boolean = false;
        console.log("1: init");
        console.log("2: typeorm");
        const tmp = await chiedi({ name: "scelta", type: "number", message: "digita la scelta : " });
        switch (tmp.scelta) {
            case 0:
                console.log("Ciao, caio");
                esco = true;
                break;
            case 1:
                const proceduraTs: ProceduraInizializzaProgettoTypescript = new ProceduraInizializzaProgettoTypescript();
                proceduraTs.Inizializza();
                break;
            case 2:
                const proceduraTsORM: ProceduraTypeORM = new ProceduraTypeORM();
                proceduraTsORM.onComplete = async () => {
                    await this.Menu();
                    esco = true;
                }
                await proceduraTsORM.Menu();
                break;
            default:
                break;

        }
    }


    /* async Menu() {

        const t1 = await system('mkdir nuovoDocumentoMio').catch(errore =>{
            console.log("Errore rilacio : "+errore);
        });
        const t2 = await system('cd ./nuovoDocumentoMio/');
        const t3 = await system('chdir');

        console.log("1: Inizializza progetto digital.ocean");
        
        const tmp = await chiedi({ name: "sclta", type: "number", message:"digita la scelta : " });
        switch (tmp.sclta) {
            case 1:
                await system("npm init");
                await system("npm install eslint --save-dev");
                await system("./node_modules/.bin/eslint --init");
                await system("npm i ts-node");
                break;
        
            default:
                break;
        }
    } */
}