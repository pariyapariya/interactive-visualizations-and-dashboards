// initial plot function
function init() {

    var selDropdown = d3.select("#selDataset");
    console.log(selDropdown);

    d3.json("samples.json").then((data)=> {
        // get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            selDropdown.append("option").text(name).property("value");
        });

        // call functions to initialize charts
        selSample(data.names[0]);
        buildChart(data.names[0]);
    });
}
init;

// create function to fetch passed in data
function selSample(otuid) {

    d3.json("samples.json").then((data)=> {
      // get the metadata for demographic panel
      var metadata = data.metadata;
    //   console.log(metadata);
      // filter the data input
      var filteredData = metadata.filter(d => d.id === id)[0];
      // select demographic panel
      var demoInfo = d3.select("#sample-metadata");
      console.log(demoInfo);
     // clear the demo. panel after successfully displayed info on dashboard
        demoInfo.html("");

      Object.entries(filteredData).forEach((key, value) => {
          demoInfo.append("h5").text(key.toUpperCase() + ": " + value);
        });
    });
}

// create function to build bar and bubble charts
function buildChart(otuid) {

    d3.json("samples.json").then (data => {

        var otuIds = sampledata.data[0].otu_ids;
        var values = sampledata.data[0].sample_values;
        var labels = sampledata.data[0].otu_labels;
  
        var top10_otuIds = otuIds.slice(0,10).reverse();
        var top10_values = values.slice(0,10).reverse();
        var top10_labels = labels.slice(0,10).reverse();
        var otu_ID = top10_otuId.map(d => "OTU " + d);


        // ----- Bar Chart -----
        var trace1 = {
            x: top10_values,
            y: otu_ID,
            text: top10_labels,
            type:"bar",
            orientation: "h",
        };

        var data1 = [trace1];

        var layout1 = {
            title: "Top 10 OTU found on Individual",
            margin: {t:30, l:100}
        };

        Plotly.newPlot("bar", data1, layout1);


        // ----- Bubble Chart -----
        var trace2 = {
            x: otuIds,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values,
                color: otuIds
            },
        };

        var data2 = [trace2];

        var layout2 = {
            title: "OTU Samples",
            xaxis: {title: "OTU ID"},
            hovermode: "closet"
        };

        Plotly.newPlot("bubble", data2, layout2);
    });
}

// function to refresh data for next time selecting
function optionChanged(otuid) {
  selSample(otuid);
  buildChart(otuid);
}