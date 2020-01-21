
console.log("Mon premier script JS.")

// API Fetch
fetch("https://eni-js-backend.azurewebsites.net/bonjour",{
    mode: "no-cors"
})
    .then( res => res.text() )
    .then( message => {
        console.log(message);
    } )
;

const elemClients = document.querySelector("#listeClients");
elemClients.innerHTML = ""

// let clients = [];

fetch("https://eni-js-backend.azurewebsites.net/clients") // ,{mode: "no-cors"}
.then( res => res.json() )
.then( clients => {
        // pour chaque client ajouter un élément <li>
        clients.forEach( client => {
            elemClients.innerHTML += 
                `<li>${client.prenom} ${client.nom} (${client.id})</li>`;
        } )
    } )
    ;
    
// Créer un nouveau client
const formClient = document.querySelector("#formClient");
formClient.addEventListener("submit", event => {
    event.preventDefault(); // Annuler l'envoi par défaut des données au serveur

    const client = {
        nom: formClient.nom.value,
        prenom: formClient.prenom.value
    };

    fetch("https://eni-js-backend.azurewebsites.net/clients",{
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        }
    }).then( () => {
    
        elemClients.innerHTML = "";
        fetch("https://eni-js-backend.azurewebsites.net/clients") // ,{mode: "no-cors"}
            .then( res => res.json() )
            .then( clients => {
                // pour chaque client ajouter un élément <li>
                clients.forEach( client => {
                    elemClients.innerHTML += 
                        `<li>${client.prenom} ${client.nom} (${client.id})</li>`;
                } )
            })
        ;


    });

} );






