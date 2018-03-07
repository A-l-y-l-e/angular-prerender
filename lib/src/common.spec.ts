import { transformUrl } from './common';
import { expect } from 'chai';
import 'mocha';

describe('transformUrl function', () => {
  const result1 = {
    file: 'index.html',
    route: ''
  };

  it(`should '/' be equal to '${JSON.stringify(result1)}'`, () => {
    const result = transformUrl('/');
    expect(result).to.deep.equal(result1);
  });

  it(`should '//' be equal to '${JSON.stringify(result1)}'`, () => {
    const result = transformUrl('//');
    expect(result).to.deep.equal(result1);
  });

  it(`should '' be equal to '${JSON.stringify(result1)}'`, () => {
    const result = transformUrl('/');
    expect(result).to.deep.equal(result1);
  });

  const result2 = {
    file: 'login/index.html',
    route: 'login'
  };

  it(`should '/login' be equal to '${JSON.stringify(result2)}'`, () => {
    const result = transformUrl('/login');
    expect(result).to.deep.equal(result2);
  });

  it(`should 'login' be equal to '${JSON.stringify(result2)}'`, () => {
    const result = transformUrl('login');
    expect(result).to.deep.equal(result2);
  });

  it(`should 'login/' be equal to '${JSON.stringify(result2)}'`, () => {
    const result = transformUrl('login/');
    expect(result).to.deep.equal(result2);
  });

  const result3 = {
    file: 'lazy/nested/index.html',
    route: 'lazy/nested'
  };

  it(`should 'lazy/nested' be equal to '${JSON.stringify(result3)}'`, () => {
    const result = transformUrl('lazy/nested');
    expect(result).to.deep.equal(result3);
  });

  const result4 = {
    file: 'lazy/nested/other/index.html',
    route: 'lazy/nested/other'
  };

  it(`should 'lazy/nested/other/' be equal to '${JSON.stringify(result4)}'`, () => {
    const result = transformUrl('lazy/nested/other/');
    expect(result).to.deep.equal(result4);
  });

});
