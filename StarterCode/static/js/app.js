const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);

dataPromise.then(function(data) {
  console.log("Metadata: ", data);
  const dropdown = d3.select("#selDataset"); // Get the dropdown element
  data.metadata.forEach((Metadata_row) => {
    dropdown.append("option").text(Metadata_row.id);
  });

  // Call each function to initially to populate the bar chart with the first value
  updatePlotly(data.samples[0]);
  console.log(data.metadata[0]);
  updateDemographicInfo(data.metadata[0]);
  updateBubbleChart(data.samples[0]);
  updateGaugeChart(data.metadata[0].wfreq);

  // Add an event listener to the dropdown element
  dropdown.on("change", function() {
    // Get the selected value from the dropdown
    let selectedID = parseInt(dropdown.property("value"));
    console.log("Selected ID: ", selectedID);

    // Find the corresponding row based on the selected ID
    let selectedSample = data.samples.find((Sample_row) => parseInt(Sample_row.id) === parseInt(selectedID));
    console.log("Selected Sample: ", selectedSample);
    let selectedMetadata = data.metadata.find((Metadata_row) => Metadata_row.id === parseInt(selectedID));
    console.log("Selected Metadata: ", selectedMetadata);


    // Update the charts with the selected sample/metadata
    updatePlotly(selectedSample);
    updateDemographicInfo(selectedMetadata);
    updateBubbleChart(selectedSample);
    updateGaugeChart(selectedMetadata.wfreq);


  });
});

function updatePlotly(Sample_row) {
  const trace = {
    x: Sample_row.sample_values.slice(0, 10).reverse(),
    y: Sample_row.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
    text: Sample_row.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };

  const dataChart = [trace];

  const layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" },
    hovermode: "closest"
  };

  Plotly.newPlot("bar", dataChart, layout);
}

function updateDemographicInfo(Metadata_row) {
  // Select the table body
  let tbody = d3.select("tbody");
  tbody.html(""); // Clear any existing rows in the table body

  // Append new rows for each demographic information
  let idRow = tbody.append("tr");
  idRow.append("td").text(`ID: ${Metadata_row.id}`);

  let ethnicityRow = tbody.append("tr");
  ethnicityRow.append("td").text(`Ethnicity: ${Metadata_row.ethnicity}`);

  let genderRow = tbody.append("tr");
  genderRow.append("td").text(`Gender: ${Metadata_row.gender}`);

  let ageRow = tbody.append("tr");
  ageRow.append("td").text(`Age: ${Metadata_row.age}`);

  let locationRow = tbody.append("tr");
  locationRow.append("td").text(`Location: ${Metadata_row.location}`);

  let bbtypeRow = tbody.append("tr");
  bbtypeRow.append("td").text(`BBType: ${Metadata_row.bbtype}`);

  let wfreqRow = tbody.append("tr");
  wfreqRow.append("td").text(`Wfreq: ${Metadata_row.wfreq}`);
}
function updateBubbleChart(Sample_row) {
  const trace = {
    x: Sample_row.otu_ids,
    y: Sample_row.sample_values,
    text: Sample_row.otu_labels,
    mode: 'markers',
    marker: {
      size: Sample_row.sample_values,
      color: Sample_row.otu_ids,
      colorscale: 'Viridis'
    }
  };

  const dataChart = [trace];

  const layout = {
    title: 'Bubble Chart of OTUs',
    xaxis: { title: 'OTU IDs' },
    yaxis: { title: 'Sample Values' },
    showlegend: false,
    hovermode: 'closest'
  };

  Plotly.newPlot('bubble', dataChart, layout);
}
function updateGaugeChart(wfreq) {
  const dataChart = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "Weekly Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
          { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
          { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
          { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
          { range: [4, 5], color: "rgba(170, 202, 42, .5)" },
          { range: [5, 6], color: "rgba(110, 154, 22, .5)" },
          { range: [6, 7], color: "rgba(14, 127, 0, .5)" },
          { range: [7, 8], color: "rgba(10, 120, 22, .5)" },
          { range: [8, 9], color: "rgba(0, 105, 11, .5)" }
        ],
      },
    }
  ];

  const layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };

  Plotly.newPlot("gauge", dataChart, layout);
}
