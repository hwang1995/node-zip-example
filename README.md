# NODE-ZIP-EXAMPLE

## 사용 라이브러리

- TypeScript
- Archvier

## 만든 이유

- 회사에서 폴더 압축 시에 AdmZip을 사용하고 있었는데 압축 진행 현황을 알림으로 주기 원하길래 AdmZip에선 progress를 얻을 수 없어서 Archiver를 이용해서 가져오기 위해 만든 샘플 프로젝트

## 유의 사항

- 압축 파일 경로는 homedir/example.zip에 저장 (homedir는 운영체제 따라 달라요)
- 압축할 폴더 경로는 homedir/zipTest/hugeFolder 라고 가정하고 민들었습니다.

## 사용 법

- npm run start 하시면 됩니다.
