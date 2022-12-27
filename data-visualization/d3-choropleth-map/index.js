const [width, height, padding] = [960, 600, 30]
const colors = ['#EE5533', '#ef6749', '#f17a60', '#f38d77']

const svg = d3
    .select('#plot')
    .attr('height', height)
    .attr('width', width)

edURL =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
mapURL =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

async function create() {
    const data = await Promise.all([d3.json(edURL), d3.json(mapURL)])
    const [edData, mapData] = [data[0], data[1]]
    const path = d3.geoPath()
    const map = topojson.feature(mapData, mapData.objects.counties).features

    svg
        .append('g')
        .selectAll('path')
        .data(map)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('class', 'county')

}

create()