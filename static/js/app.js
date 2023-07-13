const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


d3.json(url).then(data => console.log(data));

function barChart(sample) {
    d3.json(url).then(data => {

        let sampleInfo = data.samples;

        let value = sampleInfo.filter(results => results.id == sample);

        let valueInfo = value[0];


        let trace = {
            y: (valueInfo.otu_ids).slice(0,10).map(id => `OTU ${id}`).reverse(),
            x: (valueInfo.sample_values).slice(0,10).reverse(),
            text: (valueInfo.otu_labels).slice(0,10).reverse(),
            type: "bar",
            orientation: "h"

        };
        
        let layout = {
            title: "Top 10 OTUs Present in Human Belly Buttons"
        };
        
        Plotly.newPlot("bar",[trace], layout)
    });
};

function bubbleChart(sample) {
    d3.json(url).then(data => {
        let bubbleInfo = data.samples;

        let response = bubbleInfo.filter(results => results.id == sample);

        let responseList = response[0];

        let bubbles = {
            x: responseList.otu_ids,
            y: responseList.otu_ids,
            text: responseList.otu_labels,
            mode: "markers",
            marker: {
                size: responseList.sample_values,
                color: responseList.otu_ids,
                colorscale:"bluered"
            }
        }
        let layout = {
            title:"Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis:{title:"OTU ID"}
        };
        Plotly.newPlot("bubble",[bubbles], layout)
    });
};

function metadata(sample) {
    d3.json(url).then(data => {
        let demInfo = data.metadata;
 
        let response = demInfo.filter(results => results.id == sample);

        let responseList = response[0];

        d3.select("#sample-metadata").html("");

        Object.entries(responseList).forEach(([key,value]) => {
    
            d3.select("#sample-metadata").append("h6").text(`${key}:${value}`); 
        });
    });
}



function init() {
    
    let dropdownMenu = d3.select("#selDataset")

    d3.json(url).then(data => {
        let names = data.names;
        names.forEach(id => {
            dropdownMenu.append("option").text(id).property("value",id);
        });
        let sample_one = names[0];

        console.log(sample_one);

        barChart(sample_one);
        bubbleChart(sample_one);
        metadata(sample_one);
        
    })
};

function optionChanged(sample){
    barChart(sample);
    bubbleChart(sample);
    metadata(sample);
}

init();