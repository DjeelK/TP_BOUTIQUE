import express from "express"
import { appClient } from "./classes/clients/appClient.js";
import { appProduit } from "./classes/produits/appProduit.js";
import { appCommande } from "./classes/commande/appCommande.js";


//Objet pour gérer les clients 
const gestionClients = new appClient()
//Objet pour gérer les produits
const gestionProduits = new appProduit()
//Objet pour gérer les commandes 
const gestionCommandes = new appCommande()

//Création de l'application express
const api = express()
api.use(express.json())

//----------------------Partie client----------------------// 

// Endpoint pour créer un client
api.post('/clients', (req, res) => {
    const { nom, prenom, telephone } = req.body;
    if (nom !=undefined && prenom !=undefined && telephone !=undefined) {
    gestionClients.creationClient(nom, prenom, telephone);
    res.json({ message: 'Client ajouté' });
    } else {
    res.json({ message: 'Merci de transmettre un nom, un prénom et un numéro de téléphone' });
    }
});

//Endpoint pour récupérer la liste des clients
api.get('/clients', (req, res) => {
    res.json(gestionClients.clients);
});

//Endpoint pour récupérer un seul client grâce à son id
api.get('/clients/:id', (req, res) => {
    const client = gestionClients.afficherClientParId(req.params.id)
    if (client =!undefined) {
    res.json(client);
    } else {
    res.json({ message: `Client non trouvé !` });
    }
});

//----------------------Partie produit----------------------// 

// Endpoint pour créer un produit
api.post('/produits', (req, res) => {
    const { titre, prix, stock } = req.body;
    if (titre != undefined && prix != undefined && stock != undefined) {
        gestionProduits.creationProduit(titre, prix, stock);
        res.json({ message: 'Produit ajouté' });
    } else {
        res.json({ message: 'Merci de transmettre un titre, un prix et un stock' });
    }
});

//Endpoint pour récupérer la liste des produits
api.get('/produits', (req, res) => {
    res.json(gestionProduits.produits);
});


//Endpoint pour récupérer un seul produit grâce à son id
api.get('/produits/:id', (req, res) => {
    const produit = gestionProduits.afficherProduitParId(req.params.id)
    if (produit != undefined) {
        res.json(produit);
    } else {
        res.json({ message: `Produit non trouvé !` });
    }
});

//----------------------Partie commande----------------------// 

// Endpoint pour créer une commande pour un client
api.post('/commandes/:clientId', (req, res) => {
    const { produitsIds } = req.body;
    const { clientId } = req.params;
    const client = gestionClients.afficherClientParId(clientId);
    const produits = gestionProduits.afficherProduitsParIds(produitsIds);
    if (client != undefined && produits.length > 0) {
        const commande = gestionCommandes.creationCommande(client, produits);
        res.json({ message: 'Commande ajoutée', commande });
    } else if (client == undefined) {
        res.json({ message: `Client non trouvé` });
    } else {
        res.json({ message: `Produits avec l'id de ce client non trouvés` });
    }
});

// Endpoint pour récupérer la liste des commandes
api.get('/commandes', (req, res) => {
    res.json(gestionCommandes.commandes);
});

// Endpoint pour récupérer les détails d'une commande grâce à son id
api.get('/commandes/:id', (req, res) => {
    const commande = gestionCommandes.afficherCommandeParId(req.params.id);
    if (commande != undefined) {
        res.json(commande);
    } else {
        res.json({ message: `Commande non trouvée` });
    }
});


//----------------------Partie serveur----------------------// 
api.listen(3000, () => {
    console.log("Notre API est disponible sur http://localhost:3000");
});