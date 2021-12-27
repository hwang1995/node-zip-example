import * as fs from 'fs';
import * as os from 'os';
import glob from 'glob-promise';
import archiver from 'archiver';

const zipFolder = async () => {
  // 압축할 경로를 지정합니다.
  const homedir = os.homedir();
  const output = fs.createWriteStream(homedir + '/sampleZip.zip');

  // 파일 갯수 세기 위해 사용 (어차피 DB에서 가져올때 카운트해서 필요 없긴 함. && 폴더 갯수도 카운팅 필요 없음)
  const folderResult = await glob.promise(
    `${homedir}/zipTest/sampleFolder/**`,
    {
      nodir: true,
    }
  );
  const totalFiles = folderResult.length;

  // 압축 옵션을 설정합니다.
  const archive = archiver('zip', {
    zlib: {
      level: 3,
      memLevel: 7, // https://nodejs.org/api/zlib.html,
      windowBits: 14,
    },
  });

  archive.pipe(output);
  // 압축할 폴더를 집어 넣어봅시다.
  archive.directory(`${homedir}/zipTest/sampleFolder`, false).finalize();
  // 압축의 경과를 보기 위해서 정의
  output.on('open', () => {
    console.log('시작 되었습니다. 폴더 압축 ', totalFiles);
  });
  archive.on('progress', (data) => {
    const { entries, fs } = data;
    const progressStatus = ((entries.processed / totalFiles) * 100).toFixed(0);
    const remainFile = totalFiles - entries.processed;
    console.log(
      `PERCENT : ${progressStatus} | PROCESSED FILE : ${entries.processed} | REMAIN FILE : ${remainFile}`
    );
  });
  archive.on('finish', () => {
    console.timeEnd('FOLDER_SAVE');
    console.log('FINISH');
  });

  // archive.on('entry', (data) => {
  //   console.log('ENTRY', data);
  // });
};
(async () => {
  console.time('FOLDER_SAVE');
  await zipFolder();
})();
