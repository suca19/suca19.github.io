if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", populateTableRows);
} else {
    // DOMContentLoaded has already fired
    populateTableRows();
}

capitalize = s => s && s[0].toUpperCase() + s.slice(1);

async function populateTableRows() { 
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=dublin,ie&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0');
        
        if (!response.ok) {
            console.log('Error Status Code: ' + response.status);
            return;
        }

        const data = await response.json();
        console.log(data);

        let strTableRows = `
            <tr>
                <td><span>Summary</span></td>
                <td>${capitalize(data["weather"][0]["description"])}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${capitalize(data["main"]["temp"] + "°C")}</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${capitalize(data["main"]["humidity"] + " %")}</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${capitalize(data["main"]["pressure"] + " hPa")}</td>
            </tr>
        `;

        document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function change_background() {
    let d = new Date();
    let n = d.getHours();
    if (n > 23 || n <= 6) {
        document.querySelector(".theme-js").style.backgroundImage  ="url('assets/img/dublin-night.jpg')";
    } else {
        document.querySelector(".theme-js").style.backgroundImage  ="url('assets/img/dublin-day.jpg')";
    }
}
change_background();
