/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
import { getQueryString, filterData, fillTable } from '../../src/utils';

const jsonFile = require('../../src/data/datas.json');

describe('index', () => {
  describe('getQueryString', () => {
    test('should return correct array containing queries', () => {
      window.history.pushState({}, 'Test Title', '/test.html?firstName=toto&eyeColor=blue');
      const queries = getQueryString();
      expect(queries).toEqual([
        {
          key: 'firstName',
          value: 'toto',
        },
        {
          key: 'eyeColor',
          value: 'blue',
        },
      ]);
    });

    test('should return correct array containing query with age', () => {
      window.history.pushState({}, 'Test Title', '/test.html?age=20-25');
      const queries = getQueryString();
      expect(queries).toEqual([
        {
          key: 'age',
          value: {
            max: '25',
            min: '20',
          },
        },
      ]);
    });
  });

  describe('filterData', () => {
    test('should return array containing filtered data with lastName query', () => {
      const queries = [{
        key: 'firstName',
        value: 'Henson',
      }];

      const res = [{
        lastName: 'Jacobson',
        firstName: 'Henson',
        age: 38,
        eyeColor: 'blue',
        email: 'henson.jacobson@delphide.org',
        company: 'DELPHIDE',
        phoneNumber: '+1 (846) 597-3879',
      }];

      const filteredData = filterData(jsonFile, queries);
      expect(filteredData).toEqual(res);
    });

    test('should return array containing filtered data with eyeColor query', () => {
      const queries = [{
        key: 'eyeColor',
        value: 'blue',
      }];

      const filteredData = filterData(jsonFile, queries);
      expect(filteredData.length).toEqual(42);
    });

    test('should return array containing filtered data with age query', () => {
      const queries = [{
        key: 'age',
        value: {
          max: 25,
          min: 20,
        },
      }];

      const filteredData = filterData(jsonFile, queries);
      expect(filteredData.length).toEqual(22);
    });
  });

  describe('fillTable', () => {
    beforeEach(() => {
      jest.spyOn(document, 'getElementById').mockImplementation();
      jest.spyOn(document, 'createElement').mockImplementation();
    });

    afterEach(() => {
      document.getElementById.mockRestore();
      document.createElement.mockRestore();
    });

    test('should fill table with datas', () => {
      document.getElementById.mockReturnValueOnce({
        appendChild: jest.fn(),
      });

      document.createElement.mockReturnValue({
        appendChild: jest.fn(),
      });

      const datas = [{
        lastName: 'Puckett',
        firstName: 'Henson',
        age: 38,
        eyeColor: 'blue',
        email: 'henson.jacobson@delphide.org',
      }, {
        lastName: 'Jacobson',
        firstName: 'Naomi',
        age: 35,
        eyeColor: 'blue',
        email: 'naomi.puckett@roughies.name',
      }];

      const objectLength = datas.reduce((acc, current) => Object.keys(acc).length + Object.keys(current).length);

      fillTable(datas);
      expect(document.createElement).toHaveBeenCalledTimes(objectLength + datas.length); // +1 for <tr> tag
      expect(document.createElement.mock.results[1].value.appendChild).toHaveBeenCalledTimes(objectLength);
      expect(document.getElementById.mock.results[0].value.appendChild).toHaveBeenCalled();
    });
  });
});
