const container = document.getElementById('d3-container')

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => {
        const data = res.data
        
        const chartWidth = 800
        const chartHeight = 500
        const minGDP = d3.min(data, d => d[1])
        const maxGDP = d3.max(data, d => d[1])
        const yScale = d3.scaleLinear().domain([minGDP, maxGDP]).range([10, chartHeight])
        console.log(minGDP, maxGDP);

        const barWidth = chartWidth / data.length

        const svg = d3.select("#d3-container")
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight)

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => i * barWidth)
            .attr("width", barWidth)
            .attr("height", (d) => yScale(d[1]))
            .attr("y", (d) => chartHeight - yScale(d[1]))
    })
