document.getElementById('testBtn').addEventListener('click', getFreeParkingSpots);

function getFreeParkingSpots() {
  const url = 'https://portail-api-data.montpellier3m.fr/offstreetparking?limit=1000';
  const parkName = document.getElementById('parkingLot').value;
  var freeParkingSpots = -1;

  fetch(url)
    .then( response => response.json())
    .then( (data) => {
      for (let i = 0; i < data.length; i++) {
        if (parkName == data[i]['name']['value']) {
          freeParkingSpots = data[i]['availableSpotNumber']['value'];
        }
      }
    })
    .then( () => {
      const divResponse = document.getElementById('response');
      const response = document.createElement('div');
      response.innerHTML = parkName + ' a ' + freeParkingSpots + ' places dispos.'
      divResponse.appendChild(response);
    });


    


}