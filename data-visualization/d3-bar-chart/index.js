const container = document.getElementById('d3-container')

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => {
        const data = res.data

        const chartWidth = 900
        const chartHeight = 500
        const padding = 30
        const barWidth = chartWidth / data.length

        const xScale = d3.scaleLinear()
            .domain([0, data.length])
            .range([padding, chartWidth - padding])
        const xAxis = d3.axisBottom(xScale)

        const minGDP = d3.min(data, d => d[1])
        const maxGDP = d3.max(data, d => d[1])

        const yScale = d3.scaleLinear()
            .domain([minGDP, maxGDP])
            .range([padding, chartHeight - padding])

        // Chart area
        const svg = d3.select("#d3-container")
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight)

        // Bars
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xScale(i))
            .attr("y", (d) => chartHeight - padding - yScale(d[1]))
            .attr("width", barWidth)
            .attr("height", (d) => yScale(d[1]))

        // Tooltip
        svg.selectAll("rect")
            .append("title")
            .text(d => "GDP: " + d[1])

        // X-axis
        svg.append("g")
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr("transform", `translate(0, ${chartHeight - padding})`)

    })
