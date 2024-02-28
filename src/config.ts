import dotenv from "dotenv";

dotenv.config();

export const API_KEY = process.env.API_KEY;
export const BASE_URL = "https://open.neis.go.kr/hub/";
export const OFFICE_CODE = "J10";
export const SCHOOL_CODE = "7530575";

if (!API_KEY) {
  console.error("ERROR: .env 파일에 API_KEY가 존재하지 않기 때문에 종료합니다. 프로젝트 폴더 안에. env 파일이 있는지 확인하고, API_KEY=NEIS_API_KEY 형식으로 작성해야 합니다.");
  process.exit(1);
}