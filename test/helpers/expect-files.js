import { expect } from 'chai';
import fs from 'fs';
import denodeify from 'denodeify';
import Promise from 'promise';

const readFile = denodeify(fs.readFile);
const { all } = Promise;

export function expectFilesToBeEqual(filePath1, filePath2) {
  return all([
    readFile(filePath1, 'utf8'),
    readFile(filePath2, 'utf8')
  ]).then(([file1, file2]) => {
    expect(file1).to.equal(file2);
  });
}
