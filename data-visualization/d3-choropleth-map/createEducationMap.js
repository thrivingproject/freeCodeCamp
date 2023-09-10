export function createEducationMap([map, education]) {
    // Convert the education array into a lookup table
    const educationLookup = createHashTable(education);
    console.log('\neducationLookup:\n', education);
    // Find the domain of the education data
    const minEdu = d3.min(education, d => d.bachelorsOrHigher);
    const maxEdu = d3.max(education, d => d.bachelorsOrHigher);

    // Create a color scale
    const colorScale = d3.scaleSequential()
        .domain([minEdu, maxEdu])
        .interpolator(d3.interpolateBlues);

    // Create a tooltip
    const tooltip = d3.select("#tooltip")
        .attr('class', 'tooltip')
        .attr('id', 'tooltip')

    // Convert TopoJSON to GeoJSON
    const counties = topojson.feature(map, map.objects.counties).features;
    // Set the dimensions and margins of the map
    const margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // Create the map
    d3.select("#map")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("path")
        .data(counties)
        .enter()
        .append("path")
        .attr('class', 'county')
        .attr("data-fips", d => d.id)
        .attr("data-education", d => educationLookup.get(d.id))
        .attr("d", d3.geoPath())
        .attr("stroke", "white")
        .attr("fill", d => colorScale(educationLookup.get(d.id)))
        .on("mouseover", (event, d) => {
            tooltip.transition()
                .duration(100)
                .style('opacity', 0.9)
                .style('display', 'block')
            tooltip.html(() => {
                const highlighted = education.filter(o => o.fips === d.id)
                return `${highlighted[0].area_name}, ${highlighted[0].state}: ${highlighted[0].bachelorsOrHigher}%`;
            })
                .attr("data-education", () => educationLookup.get(d.id))
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px")
        })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(200)
                .style('display', 'none')
                .style('opacity', 0)
        });


    // Create a legend
    const legendWidth = 300;
    const legendHeight = 20;
    const numSegments = 5; // Number of segments in the legend

    // Create a separate SVG for the legend
    const legendSvg = d3.select("#legend")
        .attr("width", legendWidth)
        .attr("height", legendHeight + 30)
        .append("g")
        .attr("id", "legend");

    // Create the rectangles
    const segmentWidth = legendWidth / numSegments;

    legendSvg.selectAll("rect")
        .data(d3.range(numSegments))
        .enter()
        .append("rect")
        .attr("x", d => d * segmentWidth)
        .attr("width", segmentWidth)
        .attr("height", legendHeight)
        .attr("fill", d => {
            const value = minEdu + (d / (numSegments - 1)) * (maxEdu - minEdu);
            return colorScale(value);
        });

    // Add the labels
    const legendScale = d3.scaleLinear()
        .domain([minEdu, maxEdu])
        .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
        .ticks(5);

    legendSvg.append("g")
        .attr("transform", `translate(0, ${legendHeight})`)
        .call(legendAxis);


}

function createHashTable(education) {
    const educationLookup = new Map();
    education.forEach(d => {
        educationLookup.set(d.fips, d.bachelorsOrHigher);
    });
    return educationLookup;
}