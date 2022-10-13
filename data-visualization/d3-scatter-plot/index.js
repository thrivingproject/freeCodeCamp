const chartWidth = 900
const chartHeight = 500
const padding = 60

const svg = d3.select('#spa')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('id', 'plot-area')

const tooltip = d3.select('#spa')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0)

const parseYear = d3.timeParse("%Y")
const parseTime = d3.timeParse('%M:%S')

const xScale = d3.scaleTime().range([padding, chartWidth - padding])
const yScale = d3.scaleTime().range([padding, chartHeight - padding])

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(data => {
        const parsedTimeData = data.map((d) => parseTime(d.Time))
        const xMin = parseYear(d3.min(data, datum => datum.Year) - 1)
        const xMax = parseYear(d3.max(data, datum => datum.Year) + 1)

        xScale.domain([xMin, xMax])
        yScale.domain(d3.extent(parsedTimeData))
        yAxis.tickFormat((d, i)=> data[i].Time)

        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(parseYear(d.Year)))
            .attr('cy', d => yScale(parseTime(d.Time)))
            .attr('r', '5px')
            .attr('class', 'dot')

        svg.append('g')
            .attr('transform', `translate(0, ${chartHeight - padding})`)
            .attr('id', 'x-axis')
            .call(xAxis)

        svg.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .attr('id', 'y-axis')
            .call(yAxis)
    })