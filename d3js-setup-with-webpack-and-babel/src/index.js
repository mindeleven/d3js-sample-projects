import * as d3 from 'd3';

d3.csv('../src/data/tour_de_france.csv')
  .then(dataIsReady);

function dataIsReady(data) {
  updateChart(data);
}

function updateChart(eventData) {
  d3.select('svg g.chart')
    .selectAll('circle')
    .data(eventData)
    .join('circle')
    .attr('cx', function(d, i) {
      return i * 5;
    })
    .attr('cy', 50)
    .attr('r', function(d) {
      return +d.Entrants;
    })
}
