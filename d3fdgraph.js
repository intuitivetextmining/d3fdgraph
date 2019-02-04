// require is how jupyter manages javascript libraries
require.config({
    paths: {
        d3: 'https://d3js.org/d3.v5.min'
    }
});

require(["d3"], function(d3) {
    //console.log(d3.version);

    // size of plot
    const width = 800;
    const height = 600;

    // data
    const data = {
        "nodes" : [
        {"id": "apple"},
        {"id": "banana"},
        {"id": "orange"},
        {"id": "mango"}
        ],
        "links" : [
        {"source": "apple", "target": "banana", "weight": 1},
        {"source": "apple", "target": "orange", "weight": 2},
        {"source": "banana", "target": "orange", "weight":3},
        {"source": "orange", "target": "mango", "weight":3}
        ]
    };

    // extract links and nodes from data
    const links = data.links;
    const nodes = data.nodes;


    // create simulation
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => 50 / d.weight))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

    /// dragging nodes
    const drag = simulation => {

        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
    }

    // select HTML element and attach SVG to it
    const svg = d3.select('#p314159')
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // add links to svg element
    const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line")
            .attr("stroke-width", d => Math.sqrt(d.weight));

    const node = svg.append("g")
            .attr("stroke", "#aaa")
            .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
            .attr("r", 5)
            .attr("fill", "#f00")
            .call(drag(simulation));

    // add names to nodes
    node.append("title")
            .text(d => d.id);


    // update svg on simulation ticks
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });


    //return svg.node();

});

