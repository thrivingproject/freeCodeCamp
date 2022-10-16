const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

const paddingLeft = 100
const padding = 30;
const height = 400;
const width = 900;

const svg = d3.select('#d3')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

d3.json(url)
    .then(data => {
        data.monthlyVariance.forEach(d => d.month -= 1)
        console.log(data);
        const base = data.baseTemperature

        // X-scale and x-axis
        const xScale = d3
            .scaleLinear()
            .domain([1753, 2015])
            .range([paddingLeft, width - padding])
        const xAxis = d3.axisBottom(xScale)
        svg.append('g')
            .attr('id', 'x-axis')
            .call(xAxis)
            .attr('transform', `translate(0, ${height - padding})`)

        // Y-scale and y-axis
        const yScale = d3
            .scaleBand()
            .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
            .rangeRound([padding, height - padding])
        const yAxis = d3
            .axisLeft(yScale)
            .tickValues(yScale.domain())
            .tickFormat(month => {
                let date = new Date(0)
                date.setUTCMonth(month)
                return d3.timeFormat('%B')(date)
            })
        svg.append('g')
            .attr('id', 'y-axis')
            .call(yAxis)
            .attr('transform', `translate(${paddingLeft}, 0)`)

        // Graph
        svg.selectAll('rect')
            .data(data.monthlyVariance)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('data-month', d => d.month)
            .attr('data-year', d => d.year)
            .attr('data-temp', d => base + d.variance)
            .attr('x', d => xScale(d.year))
            .attr('y', d => yScale(d.month))
            .attr('width', width / (2015 - 1753))
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

