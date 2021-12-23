import * as fs from 'fs';
import * as os from 'os';
import archiver from 'archiver';

const zipFolder = async () => {
  // 압축할 경로를 지정합니다.
  const homedir = os.homedir();
  const output = fs.createWriteStream(homedir + '/example.zip');
  // 압축 옵션을 설정합니다.
  const archive = archiver('zip', {
    zlib: {
      level: 9,
      memLevel: 7, // https://nodejs.org/api/zlib.html,
    },
  });
  archive.pipe(output);
  // 압축할 폴더를 집어 넣어봅시다.
  archive.directory(`${homedir}/zipTest/hugeFolder`, false).finalize();
  console.log(`${homedir}`);
  // 압축의 경과를 보기 위해서 정의
  archive.on('progress', (data) => {
    const { entries, fs } = data;
    console.log('ENTRIES', entries);
    console.log('FS', fs);
  });
  archive.on('finish', () => {
    console.timeEnd('FOLDER_SAVE');
    console.log('FINISH');
  });
};
(async () => {
  console.time('FOLDER_SAVE');
  await zipFolder();
})();
