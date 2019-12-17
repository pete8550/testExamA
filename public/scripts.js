const myTable = document.getElementById('myTable');

fetch('http://localhost:3000/api/ships')
	.then(res => {
		// Check if we can connect
		if (res.status !== 200) {
			return console.log('Could not GET url');
		}
		return res.json();
	})
	.then(response => {
		let ships = response;

		return ships.map(ships => {
			
			let tr = document.createElement('tr');
			let td = document.createElement('td');
			let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let td4 = document.createElement('td');
            let td5 = document.createElement('td');
            let td6 = document.createElement('td');
            let td7 = document.createElement('td');
            let td8 = document.createElement('td');

			// Write text between the tags
			td.innerHTML = ships.ship_name;
			td2.innerHTML = ships.ship_home_port;
            td3.innerHTML = ships.ship_callsignal;
            td4.innerHTML = ships.ship_MMSI;
            td5.innerHTML = ships.ship_BRT;
            td6.innerHTML = ships.ship_length;
            td7.innerHTML = ships.ship_max_on_board;
            td8.innerHTML = ships.ship_purpose;

			// Append the data to the row
			tr.appendChild(td);
			tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);
			myTable.appendChild(tr);
		});
	})
	.catch(err => {
		console.log(err);
	});