// Fetch real-time air quality and pollution data from OpenWeatherMap API based on location
async function searchLocation() {
    const location = document.getElementById("search-location").value;

    if (location) {
        const apiKey = '32bf6b1cc34f48418a1d1b0fd3b189bc';  // Replace with your OpenWeather API key
        const geocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        try {
            // Fetch coordinates (latitude and longitude) for the given location
            const response = await fetch(geocodeUrl);
            const data = await response.json();

            if (data.cod === 200) {
                const lat = data.coord.lat;
                const lon = data.coord.lon;

                // Now fetch the air quality and pollution data using latitude and longitude
                const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
                const airQualityResponse = await fetch(airQualityUrl);
                const airQualityData = await airQualityResponse.json();

                if (airQualityData.list && airQualityData.list.length > 0) {
                    const airData = airQualityData.list[0].components;

                    // Fetching specific pollutants
                    const pm25 = airData['pm2_5'] || 0;
                    const pm10 = airData['pm10'] || 0;
                    const co = airData['co'] || 0;
                    const no2 = airData['no2'] || 0;
                    const so2 = airData['so2'] || 0;
                    const o3 = airData['o3'] || 0;
                    const nh3 = airData['nh3'] || 0;
                    const temperature = data.main.temp - 273.15; // Convert from Kelvin to Celsius
                    const humidity = data.main.humidity;

                    // Update the UI with the fetched data
                    document.getElementById("location-output").querySelector("span").textContent = location;
                    document.getElementById("pm25-output").querySelector("span").textContent = pm25.toFixed(2);
                    document.getElementById("pm10-output").querySelector("span").textContent = pm10.toFixed(2);
                    document.getElementById("co-output").querySelector("span").textContent = co.toFixed(2);
                    document.getElementById("no2-output").querySelector("span").textContent = no2.toFixed(2);
                    document.getElementById("so2-output").querySelector("span").textContent = so2.toFixed(2);
                    document.getElementById("o3-output").querySelector("span").textContent = o3.toFixed(2);
                    document.getElementById("nh3-output").querySelector("span").textContent = nh3.toFixed(2);
                    document.getElementById("temperature-output").querySelector("span").textContent = temperature.toFixed(2);
                    document.getElementById("humidity-output").querySelector("span").textContent = humidity.toFixed(2);
                } else {
                    alert("Could not fetch air quality data. Please try again.");
                }
            } else {
                alert("Location not found. Please check the input and try again.");
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            alert("There was an error fetching the air quality data. Please try again.");
        }
    } else {
        alert("Please enter a location.");
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userTableBody = document.getElementById("userTableBody");

    let userId = 4; // Starting user ID

    userForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const location = document.getElementById("location").value;
        const notifications = document.getElementById("notifications").value;

        // Create a new table row
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${userId++}</td>
            <td>${email}</td>
            <td>${location}</td>
            <td>${notifications}</td>
        `;

        // Append to the table
        userTableBody.appendChild(newRow);

        // Clear the form
        userForm.reset();
    });
});
