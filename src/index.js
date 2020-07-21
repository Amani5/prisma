import { getQueryString, filterData, fillTable } from './utils';

// JSON File containing all datas
const jsonFile = require('./data/datas.json');

// Get queries from URL
const queries = getQueryString();

// Filtering datas with the queries
const dataFiltered = filterData(jsonFile, queries);

// Fill HTML table with filtered datas
fillTable(dataFiltered);
