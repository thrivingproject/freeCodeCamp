const chartWidth = 900
const chartHeight = 500
const padding = 50
const svg = d3.select("#d3-container")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)

const tooltip = d3
    .select('#d3-container')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
    .then(res => {
        const data = res.data

        const barWidth = chartWidth / data.length
        const maxGDP = d3.max(data, d => d[1])
        const format = d3.timeFormat("%Y")
        const minYear = new Date(d3.min(data, d => d[0]))
        const maxYear = new Date(d3.max(data, d => d[0]))

        const xScale = d3.scaleTime()
            .domain([minYear, maxYear])
            .range([padding, chartWidth - padding])
        const yScale = d3.scaleLinear()
            .domain([0, maxGDP])
            .range([chartHeight - padding, padding])

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)

        // Bars
        d3.select('svg').selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => xScale(new Date(d[0])))
            .attr("y", (d) => yScale(d[1]))
            .attr("width", barWidth)
            .attr("height", (d) => chartHeight - padding - yScale(d[1]))
            .attr("data-date", d => d[0])
            .attr("data-gdp", d => d[1])
            .on('mouseover', function (event, d) {
                var dataDate = this.getAttribute('data-date')
                tooltip
                    .attr('data-date', dataDate)
                    .style('opacity', 1)
            })
            .on('mouseout', () => tooltip.style('opacity', 0))

        // X-axis
        svg.append("g")
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr("transform", `translate(0, ${chartHeight - padding})`)

        // Y-axis
        svg.append('g')
            .call(yAxis)
            .attr('id', 'y-axis')
            .attr('transform', `translate(${padding}, 0)`)

    })
