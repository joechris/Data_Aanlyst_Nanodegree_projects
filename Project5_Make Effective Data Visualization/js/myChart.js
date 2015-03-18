function draw(data) {
      
      /*
        D3.js setup code
      */

          "use strict";
          var margin = 75,
              width = 1400 - margin,
              height = 600 - margin;

          d3.select("#mychart")
            .append("h2")
               .attr("id", "title")
               .text("Global Trends for Startup Markets");

          var svg = d3.select("#mychart")
            .append("svg")
              .attr("width", width + margin)
              .attr("height", height + margin)
            .append("g")
              .attr("class","chart")
              
      /*
        Dimple.js Chart construction code
      */

          var myChart = new dimple.chart(svg, data);
          var x = myChart.addTimeAxis("x", "founded_year"); 
          var y = myChart.addMeasureAxis("y", "percentage");
          //var z = myChart.addMeasureAxis("z", "freq") // try bubble chart
          x.dateParseFormat = "%Y";
          x.tickFormat = "%Y";
          x.timeInterval = 1;
          x.title = "Year";
          y.dateParseFormat = ".1%";
          y.tickFormat = ".1%";
          y.title = "Percentage of Startup Market Share";
          //myChart.addSeries("market", dimple.plot.line); // try line chart
          //myChart.addSeries("market", dimple.plot.scatter); //try scatter chart
          myChart.addSeries("market", dimple.plot.area);
          myChart.addSeries("market", dimple.plot.bar);
          var legend = myChart.addLegend(width*0.7, 60, width*0.2, 60, 'right');
          myChart.draw();

        /* 
          Add mouseover event
        */

          d3.selectAll("path")
             .style("opacity", 0.1)
             .on("mouseover", function() {
               d3.select(this)
                 .style({"stroke-width": "3px"})
                 .style("opacity", 1);
               }).on("mouseout", function() {
                  d3.select(this)
                  .style('opacity', 0.1);
               });
  
        };

  /*
    Use D3 (not dimple.js) to load the CSV file
    and pass the contents of it to the draw function
  */

  d3.csv("data/data.csv", draw);
