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

    // node radius
    const node_radius = %%noderadius%%;
    // link distance before weight is applied
    const link_distance = %%linkdistance%%;
    // collision exclusion sclae
    const collision_scale = %%collisionscale%%;
    // link with scale
    const link_width_scale = %%linkwidthscale%%;

    // links and nodes data
    const links = %%links%%;
    const nodes = %%nodes%%;


    // create simulation
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(d => link_distance / d.%%edge_attribute%%))
    .force("charge", d3.forceManyBody().strength(-20))
    .force('collision', d3.forceCollide().radius(collision_scale * node_radius))
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
    const svg = d3.select("#d3-container-%%unique-id%%")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // add links to svg element
    const link = svg.append("g")
            .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
            .style("stroke-width", d => Math.sqrt(link_width_scale*d.%%edge_attribute%%));

    const node = svg.append("g")
            .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g");


    const circle = node.append("circle")
            .attr("r", node_radius)
            .on("dblclick", d => {d.x = width/2; d.y = height/2;})
            .call(drag(simulation));

    // svg text labels for eachnode
    const label = node.append("text")
            .attr("dx", 10)
            .attr("dy", ".35em")
            .text(d => d.id);


    // update svg on simulation ticks
    simulation.on("tick", () => {
        circle
        // keep within edge of canvas, larger margin on right for text labels
            .attr("cx", d => (d.x = Math.max(2*node_radius, Math.min(width - 2*node_radius - 10*d.id.length, d.x)) ))
            .attr("cy", d => (d.y = Math.max(2*node_radius, Math.min(height - 2*node_radius, d.y)) ));

        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);


        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });


    //return svg.node();

});

