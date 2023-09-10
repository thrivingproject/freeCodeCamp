import { createEducationMap } from './createEducationMap.js';

const baseUrl = 'https://cdn.freecodecamp.org' +
    '/testable-projects-fcc/data/choropleth_map/'

Promise.all([
    d3.json(baseUrl + 'counties.json'),
    d3.json(baseUrl + 'for_user_education.json')
]).then(createEducationMap);