
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);
sample_values = [];
otu_ids = [];
otu_labels = [];
IDs = [];
ethnicity = [];
Gender = [];
//Age = [];
Location = [];
Bbtype = [];
//Wfreq = [];

//use loops to iterate through and store each row of data. Using loop will allow the dropdown menu to be more smooth. drop down menu is in the html script.
//have a variable hold the current row of data in loop. 
//store dataPromise.samples in a variable. dataPromise.samples.length for the number of times it loops through to print the bubble chart and the bar chart
//use function variable_name(){action to perform}; to store the loop or the bar chart/bubble chart


dataPromise.then(function(data) {
  console.log("Metadata: ", data);
  let First_OTU = data.samples[0];
  let ID = First_OTU.id
  let slicedSampleValues = First_OTU.sample_values;
  let slicedOtuIds = First_OTU.otu_ids;
  let sliced_Otu_labels = First_OTU.otu_labels;
  let First_meta = data.metadata[0];
  sample_values.push(...slicedSampleValues);
  otu_ids.push(...slicedOtuIds);
  otu_labels.push(...sliced_Otu_labels);
  IDs.push(ID);
  ethnicity.push(First_meta.ethnicity);
  Gender.push(...First_meta.gender);
  //Age.push(...parseInt(First_meta.age));
  Location.push(...First_meta.location);
  Bbtype.push(...First_meta.bbtype);
  //Wfreq.push(...First_meta.wfreq);

  const trace = {
    x: sample_values.slice(0, 10).reverse(),
    y: otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(), 
    text: otu_labels.slice(0, 10).reverse(),
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
  let table = d3.select(".grades table");
  table.attr("class","table table-striped");
  let tbody = d3.select("tbody")
  let row = tbody.append("tr");
  row.append("td").text(`ID: ${IDs}`)
  row.append("td").text(`ethnicity: ${ethnicity}`);
  row.append("td").text(`gender: ${Gender}`);
  //row.append("td").text(`age: ${Age}`);
  row.append("td").text(`location: ${Location}`);
  row.append("td").text(`bbtype: ${Bbtype}`);
  //row.append("td").text(`wfreq: ${Wfreq}`);
var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels, 
    mode: 'markers',
    marker: {
        color: otu_ids,
        size: sample_values,
      }
    
  };
  
  var dataBubble = [trace1];
  
  var layoutBubble  = {
    title: 'Top 10 OTUs - Bubble Chart',
    xaxis: { title: 'OTU IDs' },
    yaxis: { title: 'Sample Values' },
  };
  
  Plotly.newPlot('bubble', dataBubble, layoutBubble);
});
