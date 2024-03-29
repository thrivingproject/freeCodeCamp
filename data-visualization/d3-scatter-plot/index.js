const chartWidth = 900
const chartHeight = 500
const padding = 60

const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight)
    .attr('id', 'plot-area')

const tooltip = d3.select('#d3-container')
    .append('div')
    .attr('id', 'tooltip')

const parseYear = d3.timeParse("%Y")

const xScale = d3.scaleTime()
    .range([padding, chartWidth - padding])
const yScale = d3.scaleTime()
    .range([padding, chartHeight - padding])

const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'))

d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(data => {
        data.forEach(d => {
            var parsedTime = d.Time.split(':');
            d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
        })
        const xMin = parseYear(d3.min(data, datum => datum.Year) - 1)
        const xMax = parseYear(d3.max(data, datum => datum.Year) + 1)
        xScale.domain([xMin, xMax])
        yScale.domain(d3.extent(data, d => d.Time))

        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(parseYear(d.Year)))
            .attr('cy', d => yScale(d.Time))
            .attr('r', '7px')
            .attr('class', 'dot')
            .attr('data-xvalue', d => d.Year)
            .attr('data-yvalue', d => d.Time)
            .on('mouseover', (e, d) => {
                tooltip
                    .attr('data-year', d.Year)
                    .style('opacity', 1)
                    .style('left', `${e.clientX + 30}px`)
                    .style('top', `${e.clientY - 30}px`)
                    .html(`Year: ${d.Year}
                           <br>
                           Time: ${d3.timeFormat('%M:%S')(d.Time)}`)
            })
            .on('mouseout', () => tooltip.style('opacity', 0))

        svg.append('g')
            .attr('transform', `translate(0, ${chartHeight - padding})`)
            .attr('id', 'x-axis')
            .call(xAxis)

        svg.append('g')
            .attr('transform', `translate(${padding}, 0)`)
            .attr('id', 'y-axis')
            .call(yAxis)
    })