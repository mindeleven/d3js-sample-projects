import * as d3 from 'd3';

d3.csv('../src/data/tour_de_france.csv')
  .then(dataIsReady);

let maxRadius = 20;
let rScale = d3.scaleSqrt().domain([0, 210]).range([0, maxRadius]);

function dataIsReady(data) {
  updateChart(data);
}

function updateChart(eventData) {
  layout(eventData);

  d3.select('svg g.chart')
    .selectAll('circle')
    .data(eventData)
    .join('circle')
    .attr('cx', function(d, i) {
      // return i * 5;
      return d.layout.x;
    })
    // .attr('cy', 50)
    .attr('cy', function(d) {
      return d.layout.y;
    })
    .attr('r', function(d) {
      //return rScale(+d.Entrants);
      return d.layout.entrantsRadius;
    })
    // .style('opacity', 0.1);
    .style('fill', '#aaa');
}

function layout(data) {
  let cellSize = 80, numCols = 10;

  data.forEach(function(d) {
    d.layout = {};

    let i = d.Year - 1900;

    let col = i % numCols;
    d.layout.x = col * cellSize + 0.5 * cellSize;

    let row = Math.floor(i / numCols);
    d.layout.y = row * cellSize + 0.5 * cellSize;

    d.layout.entrantsRadius = rScale(d.Entrants);
  });
}
