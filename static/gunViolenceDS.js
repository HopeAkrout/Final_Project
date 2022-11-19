function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("./new_merged_gun_data.json").then((data) => {
    var year = data.year;

    year.forEach((year) => {
      selector.append("option").text(year).property("value", year);
    });

    // Use the first sample from the list to build the initial plots
    var firstYear = year[0];
    buildCharts(firstYear);
    buildMetadata(firstYear);
    buildMap(firstYear);
  });
}

// Initialize the dashboard
init();

function optionChanged(newYear) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newYear);
  buildCharts(newYear);
  buildMap(newYear);
}

// States Panel
function buildMetadata(year) {
  d3.json("./new_merged_gun_data.json").then((data) => {
    var yearMetadata = data.yearMetadata;

    // Filter the data for the object with the desired sample number
    var resultArray = yearMetadata.filter(
      (sampleObj) => sampleObj.year == year
    );
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#state-data`
    var PANEL = d3.select("#state-data");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // tags for each key-value in the metadata.
    PANEL.append("h2").text(`${result.year}`);
    PANEL.append("h2").text(`National data`);
    PANEL.append("hr");
    PANEL.append("h3").text(`Total Firearm Deaths: ${result.totalDeaths}`);
    PANEL.append("h3").text(`Total Firearm Injuries: ${result.totalInjuries}`);
    PANEL.append("h3").text(`Mass Shootings: ${result.totalMassShootings}`);
    PANEL.append("hr");
    PANEL.append("h5").text(``);
    PANEL.append("h4").text(
      `The definition of mass shootings used for this data is 4 or more individuals shot, not including the shooter.`
    );
    PANEL.append("h4").text("The death rate was calculated by 100,000.")
  });
}
// Colored and Styled Bar Chart
// Create the buildCharts function.
function buildCharts(year) {
  d3.json("./new_merged_gun_data.json").then((data) => {
    var metadata = data.metadata;

    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter((sampleObj) => sampleObj.year == year);
    var deaths = resultArray.map(({ death_rate }) => death_rate);
    var rank = resultArray.map(({ law_rank }) => law_rank);
    var popUp = resultArray.map((d) =>
    d.state + " Rank: " + d.law_rank);

    var trace1 = {
      x: rank,
      y: deaths,
      mode: "markers",
      type: "scatter",
      marker: {
        color: 'rgb(46, 88, 148)',
        size: 12,
        line: {
          color: 'rgb(0, 0, 0)',
          width: 2
        }},
      text: popUp,
    };

    var scatterData = [trace1];
    var layout = {
      title: "Rate of Deaths VS Gun Law Safety",
      barmode: "group",
      color: "#dbd5c3",
      height: 600,
      width: 1100,
      font: {
        family: 'sans-serif',
        size: 20,
      }
      
    };
    var config = { locale: "fr" };
    Plotly.newPlot("myDiv", scatterData, layout);
  });
}

//Build map function
function buildMap(year) {
  // Read in data
  d3.json("./new_merged_gun_data.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter((sampleObj) => sampleObj.year == year);

    // Create Variables
    console.log("data from merged data violence");
    // var metadata = data.metadata;
    var massDeath = resultArray.map((d) => d.mass_death_percapita);
    var state = resultArray.map((d) => d.state);
    var stateAbv = state.map((s) => code[s]);
    console.log(stateAbv);
    
    console.log(state)
    var popUp = resultArray.map(
      (d) => d.state);
    console.log(massDeath);
    (citySize = massDeath), (hoverText = popUp);

    var data1 = [
      {
        type: "choropleth",
        locationmode: "USA-states", 
        locations: stateAbv,
        z: massDeath,
        text: popUp,
        zmin: 0,
        zmax: 2.5,
        colorscale: [
          [0, "rgb(242,240,247)"],
          [0.2, "rgb(218,218,235)"],
          [0.6, "rgb(188,189,220)"],
          [1, "rgb(158,154,200)"],
          [2, "rgb(117,107,177)"],
          [2.5, "rgb(84,39,143)"],
        ],
        colorbar: {
          title: "Deaths Per Capita",
          thickness: 15,
        },
        marker: {
          line: {
            color: "rgb(255,255,255)",
            width: 2,
          },
        },
      },
    ];

    var layout = {
      title: {
        text: "Mass Shooting Deaths Across The US",
        font: {
          family: 'sans-serif',
          size:   30
        }
      },
      mapbox: {center: {lon: 60, lat: 30}, style: "outdoors", zoom: 2},
      paper_bgcolor:'rgba(0,0,0,0)',
      plot_bgcolor:'rgba(0,0,0,0)',
      height: 600,
      width: 1100,
      geo: {
        scope: "usa",
        showlakes: true,
        lakecolor: "rgb(255,255,255)",
      },
    };
    Plotly.newPlot("map", data1, layout, { showLink: false });
  });
}

// Use d3 to select the panel with id of `#sample-metadata`
var PANEL = d3.select("#facts");

