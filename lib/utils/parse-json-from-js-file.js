import fs from 'fs';

export default filePath => {
  let js = fs.readFileSync(filePath, 'utf8');
  let jsonString = js.substring(js.indexOf('{'), js.lastIndexOf('}') + 1);
  let json = JSON.parse(jsonString);
  return json;
};
