// INITIALISATION - Au chargement de la page
// On récupère par défaut les données de l'API au chargement de la page
// On créé un bouton pour chaque parking qui permet de lancer une requête sur la base

// Paramètres
const url = 'https://portail-api-data.montpellier3m.fr/offstreetparking';
const divParkingList = document.getElementById('parkingList');
const divParkingName = document.getElementById('divParkingName');
const divParkingFreeSpots = document.getElementById('divParkingFreeSpots');
const divLocalisationParking = document.getElementById('divLocalisationParking');

// Requête sur les parkings existants et construction des boutons
fetch(url)
  .then(response => response.json())
  .then(data => {

    // On boucle sur les parkings récupérés
    for (let i = 0; i < data.length; i++) {

      // Création du bouton avec nom et ID (éventuellement pour plus tard)
      const buttonParking = document.createElement('button');
      buttonParking.innerHTML = data[i]['name']['value']; 
      buttonParking.setAttribute("id", data[i]['id'])

      // Ajout d'un event listener quand on clique dessus...
      buttonParking.addEventListener('click', () => {
        
        // ... on prépare une requête avec l'ID comme paramètre ... 
        let params = new URLSearchParams({id:data[i]['id']}).toString();

        // ... et qui interroge la base pour récupérer le nombre de places dispos du parking
        fetch(url + '?' + params)
          .then(response => response.json())
          .then(data => {
            divParkingName.innerHTML = data[0]['name']['value'];
            divParkingFreeSpots.innerHTML = data[0]['availableSpotNumber']['value'] + "/" + data[0]['totalSpotNumber']['value'];

            const coordX = data[0]['location']['value']['coordinates'][1];
            const coordY = data[0]['location']['value']['coordinates'][0];
            const urlParking = 'https://www.google.fr/maps?q=' + coordX + ',' + coordY;
            divLocalisationParking.innerHTML = '<a href="' + urlParking + '" target="_blank">GO</a>';
          })
          .catch(error => console.log(error));
      });

      // Enfin, on ajoute le bouton au DOM pour l'afficher dans l'interface
      divParkingList.appendChild(buttonParking);
    }

  });

