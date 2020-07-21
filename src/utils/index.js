/**
 * Return an array of query from the URL
 * @return {array}
 */
export const getQueryString = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const keys = urlParams.keys();
  const queries = Array.from(keys).map((key) => ({ key, value: urlParams.get(key) }));

  queries.forEach((query) => {
    // Parse age from query to get min & max age
    if (query.key === 'age') {
      const values = query.value.split('-');
      query.value = { min: values[0], max: values[1] };
    }
  });

  return queries;
};

/**
 * Return an array of the filtered data with only the attributes we want to display
 * @param {object} jsonFile
 * @param {array} queries
 * @return {array}
 */
export const filterData = (jsonFile, queries) => {
  const datas = Object.keys(jsonFile).flatMap((key) => {
    let shouldKeep = Boolean(true);

    // Loop through queries to filter the jsonFile
    queries.forEach((query) => {
      if (!shouldKeep) return;
      if (query.key === 'age') shouldKeep = jsonFile[key].age >= query.value.min && jsonFile[key].age <= query.value.max;
      else if (query.key === 'firstName') shouldKeep = jsonFile[key].name.first === query.value;
      else if (query.key === 'lastName') shouldKeep = jsonFile[key].name.last === query.value;
      else shouldKeep = jsonFile[key][query.key] === query.value;
    });

    return shouldKeep ? [jsonFile[key]] : [];
  });

  // Mapping only the attributes we want to display
  return datas.map((data) => ({
    lastName: data.name.last,
    firstName: data.name.first,
    age: data.age,
    eyeColor: data.eyeColor,
    email: data.email,
    company: data.company,
    phoneNumber: data.phone,
  }));
};

/**
 * This method fill the HTML table with the datas given
 * @param {array} datas
 */
export const fillTable = (datas) => {
  const bodyTable = document.getElementById('body-table');
  datas.forEach((data) => {
    const tr = document.createElement('tr');

    // Filling the line of the table with all the data given
    Object.keys(data).forEach((key) => {
      const td = document.createElement('td');
      td.innerText = data[key];
      tr.appendChild(td);
    });

    bodyTable.appendChild(tr);
  });
};
