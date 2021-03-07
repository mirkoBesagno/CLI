import { Procedura } from "../procedura";
import { Cartella } from "../tools/Cartella";
import chiedi from "prompts";


import system = require('system-commands')
import { FileTesto } from "../tools/FileTesto";

export class ProceduraTypeORM extends Procedura {
    struttura = {

        "tools": {},
        "database": {
            "import": ` 
    import { LoggerModes } from "@overnightjs/logger";
    import { join } from "path";
    import { createConnection } from "typeorm";
    import { ConfigDatabase } from "./configuration/db.config";
    import { ErroreMio } from "./error/errore-mio.error";  
    ` ,
            "costrutto": `   

    export class Database {

        configurazione: ConfigDatabase = new ConfigDatabase("development");

        constructor(configurazione: string) {
            this.configurazione.configurazione = configurazione;
        }

        async CreaConnessione() {
            try {
                const database = await createConnection(this.configurazione.GetConnectionOption())
                    .catch(error => {
                        if (error.name === "ErroreMio" || error.name === "ErroreGenerico") {
                            //throw new ErroreMio("Errore : " + error, 500, "CalcolaPasswordCriptata");
                            throw error;
                        }
                        else {
                            console.log(error);
                            const testo = "createConnection"
                            throw new ErroreMio(testo, 400, "ErroreMio", "ErroreMio" + testo);
                        }
                    });

                const logFilePath = join(__dirname, '/project.log');
                process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.File; // Can also be Console, Custom, or Off
                process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
                process.env.OVERNIGHT_LOGGER_RM_TIMESTAMP = 'TRUE';

            } catch (error) {

            }
        }

        ImpostaConfigurazione(){
            
        }
    }
    `
        },
        "index": {
            "import": `import { Database } from './database';`,
            "costrutto": ` 
            const db: Database = new Database(modalita);
            db.CreaConnessione().then().catch();
            `
        }
    };
    app: Cartella = new Cartella("cartella/app", "app");
    src = new Cartella("cartella/src", "src");
    database = new FileTesto("cartella/database", "database.ts",
        `   

    export class Database {

        configurazione: ConfigDatabase = new ConfigDatabase("development");

        constructor(configurazione: string) {
            this.configurazione.configurazione = configurazione;
        }

        async CreaConnessione() {
            try {
                const database = await createConnection(this.configurazione.GetConnectionOption())
                    .catch(error => {
                        if (error.name === "ErroreMio" || error.name === "ErroreGenerico") {
                            //throw new ErroreMio("Errore : " + error, 500, "CalcolaPasswordCriptata");
                            throw error;
                        }
                        else {
                            console.log(error);
                            const testo = "createConnection"
                            throw new ErroreMio(testo, 400, "ErroreMio", "ErroreMio" + testo);
                        }
                    });

                const logFilePath = join(__dirname, '/project.log');
                process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.File; // Can also be Console, Custom, or Off
                process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
                process.env.OVERNIGHT_LOGGER_RM_TIMESTAMP = 'TRUE';

            } catch (error) {

            }
        }

        ImpostaConfigurazione(){
            
        }
    }
    `,
        ` 
    import { LoggerModes } from "@overnightjs/logger";
    import { join } from "path";
    import { createConnection } from "typeorm";
    import { ConfigDatabase } from "./configuration/db.config";
    import { ErroreMio } from "./error/errore-mio.error";  
    `
    );
    constructor() {
        super();
        this.listaComandi = [
            "npm install typeorm --save",
            "npm install typeorm -g",
            "npm install reflect-metadata --save",
            "npm install @types/node --save-dev",
            "npm install pg --save"
        ];
        this.strutturaProgetto.nome = "progettoProva";
        this.strutturaProgetto.percorso ="progetto/text/";
        const path = this.strutturaProgetto.percorso;
        this.src = new Cartella(path+"src/", "src");
        const app = new Cartella(this.src.percorso, "app");
        app.listaCartella.push(new Cartella(app.percorso+'entita', "entita"));
        app.listaCartella.push(new Cartella(app.percorso+'dipendenze', "dipendenze"));
        app.listaCartella.push(new Cartella(app.percorso+'attori', "attori"));
        app.listaCartella.push(new Cartella(app.percorso+'viste', "viste"));
        // app contiene la struttura del progetto
        this.src.listaCartella.push(app);
        this.src.listaCartella.push(new Cartella(this.src.percorso+'migration', "migration"));
        this.src.listaCartella.push(new Cartella(this.src.percorso+'subscriber', "subscriber"));
        this.strutturaProgetto.listaCartella.push(this.src);
        //ora arrivano i file.
    }
    Print() {
        return this.strutturaProgetto.Print();
    }

    AggiungiElemento() {


    }


    public onComplete?: () => void
    async Menu() {
        let esco: boolean = false;
        console.log("1: Print struttura");
        console.log("2: Aggiungi elemento");
        const tmp = await chiedi({ name: "scelta", type: "number", message: "digita la scelta : " });
        switch (tmp.scelta) {
            case 0:
                console.log("Ciao, caio");
                esco = true;
                break;
            case 1:
                console.log("1..");
                console.log(this.Print());
                break;
            case 2:
                console.log('2..');
                
                break;
            default:
                break;
        }
        if (esco) {
            if (!this.onComplete) return
            this.onComplete()
        }
        else {
            await this.Menu();
        }
    }
    Inizializza() {

        console.log("Esegui i seguenti comandi in console: ");
        for (let index = 0; index < this.listaComandi.length; index++) {
            const element = this.listaComandi[index];
            console.log(element);
        }
    }
    async CreaStruttura() {
        const t1 = await system('mkdir src').catch(errore => {
            console.log("Errore rilacio : " + errore);
        });
        const t2 = await system('mkdir tools').catch(errore => {
            console.log("Errore rilacio : " + errore);
        });


        const t3 = await system('mkdir src/app').catch(errore => {
            console.log("Errore rilacio : " + errore);
        });
        const t4 = await system('mkdir src/migration').catch(errore => {
            console.log("Errore rilacio : " + errore);
        });
        const t5 = await system('mkdir src/subscriber').catch(errore => {
            console.log("Errore rilacio : " + errore);
        });
    }
    AggiungiEntita() {

    }

}