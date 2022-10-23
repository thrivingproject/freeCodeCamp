const [height, width, padding] = [540, 720, 30]

const svg = d3
    .select('#plot')
    .attr('height', height)
    .attr('width', width)