import fs from 'node:fs';
import path from 'path';
import SVGSpriter from 'svg-sprite';
import { globSync } from 'glob';

const srcDir = './src/svg/';
const publicDir = './public/assets/svg/';

const config = {
  dest: publicDir,
  mode: {
    symbol: {
      dest: '.',
      sprite: 'icons', // icons.svgに書き出す
    },
  },
};

const spriter = new SVGSpriter(config);

const svgImages = globSync(`${srcDir}/*.svg`);
svgImages.forEach((path) => {
  spriter.add(path, null, fs.readFileSync(path, 'utf-8'));
});

spriter.compile((error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  for (const mode in result) {
    for (const resource in result[mode]) {
      fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
      fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
    }
  }
});
