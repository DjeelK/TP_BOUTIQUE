
import { writeFileSync , readFileSync } from "fs"
import { Client } from "./clients.js"

export class appClient {
    constructor(){
        this.clients = []
        this.compteur = 0
        this.file = "dataClients.json"
    }

    lire(){
        const contenuClients = readFileSync(this.file).toString()
        this.clients = JSON.parse(contenuClients)
        this.compteur = (this.clients[this.clients.length-1]!=undefined ? this.clients[this.clients.length-1].id : 0)
    }

    ecrire(){
        writeFileSync(this.file,JSON.stringify(this.clients))
    }

    creationClient(nom,prenom,telephone){
        const client = new Client (++this.compteur,nom,prenom,telephone)
        this.clients.push(client)
        this.ecrire()
}

    afficherClientParId(id){
        return this.clients.find(c => c.id ==id)
    }

}