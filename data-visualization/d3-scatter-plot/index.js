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

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(data => {
        
        // console.log(yMin, yMax);
        
        const parseYear = d3.timeParse("%Y")
        const xMin = parseYear(d3.min(data, datum => datum.Year) - 1)
        const xMax = parseYear(d3.max(data, datum => datum.Year))
        const xScale = d3.scaleTime()
            .domain([xMin, xMax])
            .range([padding, chartWidth - padding])

        const yScale = d3.scaleTime()
            .domain(d3.extent(data, d => d.Time))
            .range([padding, chartHeight - padding])

        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')

        const xAxis = d3.axisBottom(xScale)
        svg.append('g')
            .attr('transform', `translate(0, ${chartHeight - padding})`)
            .attr('id', 'x-axis')
            .call(xAxis)

        const timeFormat = d3.timeFormat('%M:%S')
        const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)
        svg.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .attr('id', 'y-axis')
            .call(yAxis)
    })