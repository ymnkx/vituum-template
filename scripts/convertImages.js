import fs from 'fs';
import fsExtra from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import chokidar from 'chokidar';

const srcDir = './src/image/';
const publicDir = './public/assets/image/';
const allowedExtensions = ['.jpg', '.png']; // 対象する拡張子

// 画像変換処理の設定
const sharpOptions = {
  jpg: [
    'jpg',
    {
      quality: 80,
      progressive: true,
    },
  ],
  png: [
    'png',
    {
      quality: 80,
    },
  ],
};

// ディレイクトリ置換
const replaceFilePath = (beforeDir, afterDir, filePath) => path.join(afterDir, path.relative(beforeDir, filePath));

// webpへの拡張子置換
const replaceWebpFilePath = (filePath) => filePath.replace(/\.(jpg|png)$/i, '.webp');

// jpg,pngは圧縮処理、それ以外の拡張子はコピー
const optimizeImage = (srcPath, destPath) => {
  const extname = path.extname(srcPath).toLowerCase();

  if (allowedExtensions.includes(extname)) {
    const convertFormat = /\.png$/i.test(srcPath) ? sharpOptions.png : sharpOptions.jpg;
    sharp(srcPath)
      .toFormat(convertFormat[0])
      .toFile(destPath, (err) => {
        if (err) {
          console.error('Error processing image:', err);
        } else {
          console.log('Convert image:', srcPath);
        }
      });
  } else {
    fs.copyFile(srcPath, destPath, (err) => {
      if (err) {
        console.error('Error copying image:', err);
      } else {
        console.log('Copied image:', srcPath);
      }
    });
  }
};

const convertToWebp = (destPath) => {
  const replaceExtension = replaceWebpFilePath(destPath);
  const webpFilePath = path.join(publicDir, path.relative(publicDir, replaceExtension));
  sharp(destPath)
    .webp({ quality: 85 })
    .toFile(webpFilePath, (err) => {
      if (err) {
        console.error('Error processing convert to webp:', err);
      } else {
        console.log('Convert to webp:', webpFilePath);
      }
    });
};

const startSrcWatch = () => {
  const watcher = chokidar.watch(srcDir, {
    ignored: /(^|[\/\\])\../, // 隠しファイルを無視
    persistent: true,
  });

  watcher.on('all', (event, filePath) => {
    const targetFilePath = replaceFilePath(srcDir, publicDir, filePath);
    if (event === 'add' || event === 'change') {
      optimizeImage(filePath, targetFilePath);
    } else if (event === 'addDir') {
      fsExtra.ensureDirSync(targetFilePath);
    } else if (event === 'unlinkDir') {
      fsExtra.removeSync(targetFilePath);
    } else if (event === 'unlink') {
      fsExtra.removeSync(targetFilePath);
    }
  });
};

const startPublicWatch = () => {
  const watcher = chokidar.watch(publicDir, {
    ignored: /(^|[\/\\])\../, // 隠しファイルを無視
    persistent: true,
  });

  watcher.on('all', (event, filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    if (allowedExtensions.includes(extension)) {
      if (event === 'add' || event === 'change') {
        // TODO: 動かなかったり、エラーになったりするので応急処置。watchは１つにするべきかも？？
        setTimeout(() => {
          convertToWebp(filePath);
        }, 1000);
      } else if (event === 'unlink') {
        const removeFilePath = replaceWebpFilePath(filePath);
        if (!fs.existsSync(removeFilePath)) return;
        fs.unlink(removeFilePath, (err) => {
          if (err) throw err;
          console.log('remove:', removeFilePath);
        });
      }
    }
  });
};

// ディレクトリの監視と画像圧縮・変換の実行
const convertImages = async () => {
  startSrcWatch();
  startPublicWatch();
};

convertImages();

// cf. https://841-biboroku.info/entry/images-optimize-sharp/
// TODO: 開発環境を立ち上げるたびに全ファイルに対して処理が走る。
// TODO: 2つのフォルダをwatchしている仕組みが綺麗じゃない。
