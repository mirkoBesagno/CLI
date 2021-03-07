
import system = require('system-commands')
import { Cartella } from "./tools/Cartella";

export class Procedura {
    strutturaProgetto :Cartella=new Cartella("","");

    listaComandi: string[] = [];

    Print(){
        return this.strutturaProgetto.Print();
    }

    constructor() {

    }

}

export class ProceduraInizializzaProgettoTypescript extends Procedura {


    Inizializza() {
        console.log("Esegui i seguenti comandi in console: ");
        for (let index = 0; index < this.listaComandi.length; index++) {
            const element = this.listaComandi[index];
            console.log(element);
        }
    }

    constructor() {
        super();
        this.listaComandi = [
            "npm init",
            "npm install eslint --save-dev",
            "./node_modules/.bin/eslint --init",
            "npm i ts-node",
            "npx tsc --init"
        ];
    }
}




export class ProceduraExpress extends Procedura {



    constructor() {
        super();

    }
}