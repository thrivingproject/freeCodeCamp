const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

const paddingLeft = 100
const padding = 30;
const height = 400;
const width = 900;

const svg = d3.select('#d3')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

fetch(url)
    .then(response => response.json())
    .then(data => {
        const base = data.baseTemperature
        const variance = data.monthlyVariance

        const xScale = d3.scaleLinear()
            .range([paddingLeft, width - padding])
            .domain([1753, 2015])
        const xAxis = d3.axisBottom(xScale)
        svg.append('g')
            .attr('id', 'x-axis')
            .call(xAxis)
            .attr('transform', `translate(0,${height - padding})`)

        const yScale = d3.scaleLinear()
            .range([height - padding, padding])
            .domain([13, 1])
        const yAxis = d3.axisLeft(yScale)
        svg.append('g')
            .attr('id', 'y-axis')
            .call(yAxis)
            .attr('transform', `translate(${paddingLeft}, 0)`)

        svg.selectAll('rect')
            .data(variance)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('data-month', d => yScale(d.month))
            .attr('data-year', d => xScale(d.year))
            .attr('data-temp', d => base + d.variance)
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month))
            .attr('width', width / (2015 - 1753))
            .attr('height', (height - padding) / 13)
            .attr('fill', d => {
                if (d.variance < -3) {return '#001d38'}
                else if (d.variance < -2) {return '#00498d'}
                else if (d.variance < -1) {return '#0084ff'}
                else if (d.variance < 0) {return '#0fffff'}
                else if (d.variance < 1) {return '#fffff0'}
                else if (d.variance < 2) {return '#ffed00'}
                else if (d.variance < 3) {return '#FFA500'}
                else {return '#FF0C00'}
            })
    })

