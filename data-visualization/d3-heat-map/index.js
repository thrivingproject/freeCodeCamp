const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

const paddingLeft = 100
const paddingBottom = 100
const padding = 70;
const height = 400;
const width = 900;

const svg = d3
    .select('#d3')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('id', 'svg')

// Legend
const legendData = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7]
const legendXScale = d3.scaleBand()
    .domain(legendData)
    .range([0, 200])
const legendYScale = d3.scaleLinear().range([0, 30])
const legendXAxis = d3.axisBottom(legendXScale)
const legendYAxis = d3.axisLeft(legendYScale)

const legend = svg
    .append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${100}, ${height - padding})`)
    .selectAll('rect')
    .data(legendData)
    .enter()
    .append('rect')
    .attr('x', d => legendXScale(d))
    .attr('width', 200 / legendData.length)
    .attr('height', 20)
    .attr('fill', d => {
        if (d <= 2.8) {return '#4575B4'}
        else if (d < 3.9) {return '#74ADD1'}
        else if (d < 5.0) {return '#74ADD1'}
        else if (d < 6.1) {return '#ABD9E9'}
        else if (d < 7.2) {return '#E0F3F8'}
        else if (d < 8.3) {return '#FFFFBF'}
        else if (d < 9.5) {return '#FEE090'}
        else if (d < 10.6) {return '#FDAE61'}
        else if (d < 11.7) {return '#F46D43'}
        else {return '#D73027'}
    })

d3.select('#legend')
    .append('g')
    .call(legendXAxis)
    .attr('transform', `translate(0, 20)`)

// Main
d3.json(url)
    .then(data => {
        // X-scale and x-axis
        const xScale = d3
            .scaleBand()
            .domain(data.monthlyVariance.map(d => d.year))
            .range([paddingLeft, width - padding])
        const xAxis = d3
            .axisBottom(xScale)
            .tickValues(xScale.domain().filter(year => year % 10 === 0))
        svg.append('g')
            .attr('id', 'x-axis')
            .call(xAxis)
            .attr('transform', `translate(0, ${height - paddingBottom})`)

        // Y-scale and y-axis
        const yScale = d3
            .scaleBand()
            .domain(data.monthlyVariance.map(d => d.month))
            .rangeRound([0, height - paddingBottom])
        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat(month => {
                let date = new Date(0)
                date.setUTCMonth(month)
                return d3.timeFormat('%B')(date)
            })
        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${paddingLeft}, 0)`)
            .call(yAxis)

        // Graph
        svg.selectAll('rect')
            .data(data.monthlyVariance)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('data-month', d => d.month - 1)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => data.baseTemperature + d.variance)
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month))
            .attr('width', d => xScale.bandwidth(d.year))
            .attr('height', d => yScale.bandwidth(d.month))
            .attr('fill', d => {
                if (d.variance < -4.76) {return '#4575B4'}
                else if (d.variance < -3.66) {return '#74ADD1'}
                else if (d.variance < -2.56) {return '#ABD9E9'}
                else if (d.variance < -1.46) {return '#E0F3F8'}
                else if (d.variance < -.36) {return '#FFFFBF'}
                else if (d.variance < .84) {return '#FEE090'}
                else if (d.variance < 1.94) {return '#FDAE61'}
                else if (d.variance < 3.04) {return '#F46D43'}
                else {return '#D73027'}
            })
    })

