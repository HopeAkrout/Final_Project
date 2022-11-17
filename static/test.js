function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("./merged_data_violence_copy.json").then((data) => {
    var state = data.state;

    state.forEach((state) => {
      selector.append("option").text(state).property("value", state);
    });

    // Use the first sample from the list to build the initial plots
    var firstState = state[0];
    buildCharts(firstState);
    buildMetadata(firstState);
  });
}

// Initialize the dashboard
init();

function optionChanged(newState) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newState);
  buildCharts(newState);
  buildTable(newState);
}

// States Panel
function buildMetadata(state) {
  d3.json("./merged_data_violence_copy.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.state == state);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#state-data`
    var PANEL = d3.select("#state-data");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.    
    PANEL.append("h2").text(`${result.state}`);
    PANEL.append("h4").text(`${result.year}`);
    PANEL.append("hr");
    PANEL.append("h4").text(`Population: ${result.Pop}`);
    PANEL.append("h4").text(`Percent of Homes With Registered Firearms: ${result.HouseOwnGuns}%`);
    PANEL.append("h4").text(`Total Number of Gun laws: ${result.laws}`);
    PANEL.append("h4").text(`Police Officers*: ${result.NumOfPoliceOfficers}`);
    PANEL.append("h4").text(`Firearm Deaths*: ${result.n_killed}`);
    PANEL.append("h4").text(`Mass Shooter Incidents**: ${result.massShoot}`);
    PANEL.append("hr");
    PANEL.append("h5").text(`*Per 100,000 Total Population`);
    PANEL.append("h5").text(`**The definition of mass shootings used for this data is 4 or more individuals shot, not including the shooter.`);

  });
}
// Colored and Styled Bar Chart
// Create the buildCharts function.
function buildCharts(state) {
    d3.json("./merged_data_violence_copy.json").then((data) => {
        var metadata = data.metadata;
      
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter((sampleObj) => sampleObj.state == state);
        var result = resultArray[0];
        var deathTick = result.n_killed;
        var rankTick = result.GunRnkCATO;
        var chartstate = result.state;
      
        var trace1 = {
            x: [1, 2, 3, 4],
            y: rankTick,
            mode: 'markers',
            type: 'scatter'
          };

        var trace2 = {
            x: deathTick,
            y: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
            mode: 'markers',
            type: 'scatter'
          };
        var data1 = [trace1, trace2];
      
        var layout = {
          title: "Mass Shooting Violence 2016",
          barmode: "group",
          color: "#dbd5c3"
        };
        var config = {locale: 'fr'};
        Plotly.newPlot("myDiv", data1, layout);

    // Gauge
    var GunRnkCATO = result.GunRnkCATO;

    // Create the trace for the gauge chart.
    var gaugeData = [
      {
        value: GunRnkCATO,
        title: { text: "Gun Law Strength Rank (50 is strict)" },
        mode: "gauge+number",
        type: "indicator",
        gauge: {
          axis: { range: [null, 50], tickwidth: 5, tickcolor: "black" },
          bar: { color: "orange" },
          bgcolor: "#dbd5c3",
          borderwidth: 1,
          bordercolor: "black",
          steps: [
            { range: [0, 10], color: "white" },
            { range: [10, 20], color: "lightblue" },
            { range: [20, 30], color: "blue" },
            { range: [30, 40], color: "mediumblue" },
            { range: [40, 50], color: "darkblue" },
          ],
          threshold: {
            line: { color: "orange", width: 2 },
            thickness: 1,
            value: 490,
          },
        },
      },
    ];

    //  Create the layout for the gauge chart.
    var gaugeLayout = {
      height: 300,
      width: 425,
      margin: { t: 0, b: 0 },
    };
    // Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}

// Create function to build Laws table
function buildTable(state) {
    // Laws Panel
    d3.json("./merged_data_violence_copy.json").then((data) => {
        var metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        var resultArray = metadata.filter((sampleObj) => sampleObj.state == state);
        var result = resultArray[0];
  // First, clear out any existing data
    tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
    result.forEach((dataRow) => {
    // Append a row to the table body
        let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
    })
}




// Map 
    // Read in data
d3.json("./merged_data_violence_copy.json").then((data) => {
    // Create Variables
    console.log("data from merged data violence")
    var metadata = data.metadata;
    var stateName = data.metadata.map((d) =>
    d.state);
    var stateDeath = data.metadata.map((d) =>
    d.n_killed);
    var popUp = data.metadata.map((d) =>
    d.state + ": " + d.n_killed);
    var cityLat = data.metadata.map((d) =>
    d.lat);
    var cityLon = data.metadata.map((d) =>
    d.lon);
        citySize = stateDeath,
        hoverText = popUp
        // scale = 5000;


    //Create variable to hold map data
    var data1 = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,       
        marker: {
            size: stateDeath.map((d) => d*6),
            color: 'darkorange',
            line: {
                color: 'black',
                width: 2
            },
        }
    }];
    var accessToken = API_KEY
    // Create map layout
    var layout = {
        mapbox: {center: {lon: 60, lat: 30}, style: "outdoors", zoom: 2},
        height: 600,
        width: 1200,
        title: 'Firearm Deaths Per Capita in 2016',
        showlegend: false,
        // Make transparent
        paper_bgcolor:'rgba(0,0,0,0)',
        plot_bgcolor:'rgba(0,0,0,0)',
        geo: {
            scope: 'usa',
            projection: {
                type: 'albersusa'
            },
            showland: true,
            landcolor: 'white',
            subunitwidth: 2,
            countrywidth: 2,
            subunitcolor: 'rgb(41, 41, 41)',
            // countrycolor: 'rgb(217, 65, 65)',
        },
    };
    var config = {mapboxAccessToken: "API_KEY"};

    Plotly.newPlot("map", data1, layout, {showLink: false});

});

// Use d3 to select the panel with id of `#sample-metadata`
var PANEL = d3.select("#facts");
    // Create Facts panel
    PANEL.append("h3").text(`Gun Violence in the US`);
    PANEL.append("hr");
    PANEL.append("h4").text(`In 2016 the second leading cause of death for children in the US was firearms. 
    In 2022 it is the leading cause.`);
    PANEL.append("h4").text(`There were 38,658 firearm deaths in 2016.`);

// // Laws Panel
// function buildTable(state) {
//     d3.json("./merged_data_violence_copy.json").then((data) => {
//         var metadata = data.metadata;
//         // Filter the data for the object with the desired sample number
//         var resultArray = metadata.filter((sampleObj) => sampleObj.state == state);
//         var result = resultArray[0];
//           // Use d3 to select the panel with id of `#sample-metadata`
//         var PANEL = d3.select("#law-data");
//         // Use `.html("") to clear any existing metadata
//         PANEL.html("");
//         // Use `Object.entries` to add each key and value pair to the panel
//         // Hint: Inside the loop, you will need to use d3 to append new
//         // tags for each key-value in the metadata.
//         Object.entries(result).forEach(([key, value]) => {
//             PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
//       });
//     });
// }







// })