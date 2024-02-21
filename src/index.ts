import express, { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = 3000

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://open.neis.go.kr/hub/";
const OFFICE_CODE = "J10";
const SCHOOL_CODE = "7530575";

if (!API_KEY) {
  console.error("ERROR: .env 파일에 API_KEY가 존재하지 않아요.");
  process.exit(1);
}

const now = new Date();
const formattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

const getFriday = (date: Date) => {
  const monday = getMonday(new Date(date));
  return new Date(monday.setDate(monday.getDate() + 4));
};

const today = formattedDate(now);
const monday = formattedDate(getMonday(now));
const friday = formattedDate(getFriday(now));

app.get("/todaytimetable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/hisTimetable`, {
      params: {
        KEY: API_KEY,
        Type: "json",
        ATPT_OFCDC_SC_CODE: OFFICE_CODE,
        SD_SCHUL_CODE: SCHOOL_CODE,
        GRADE: grade,
        CLASS_NM: classNumber,
        ALL_TI_YMD: today,
      }
    });

    if (response.data && response.data.hisTimetable && response.data.hisTimetable[1].row) {
      const timetable = response.data.hisTimetable[1].row.map((item: any) => {
        const year = item.ALL_TI_YMD.substring(0, 4);
        const month = item.ALL_TI_YMD.substring(4, 6);
        const day = item.ALL_TI_YMD.substring(6, 8);
        const api_date = new Date(`${year}-${month}-${day}`);
    
        const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
          month: 'long',
          day: 'numeric'
        });
        const formattedDate = dateFormatter.format(api_date);
    
        return {
          ALL_TI_YMD: formattedDate,
          PERIO: item.PERIO,
          ITRT_CNTNT: item.ITRT_CNTNT
        };
      });
  
      res.json(timetable);
    } else {
      res.status(404).send("해당하는 학년, 반의 오늘 시간표가 존재하지 않아요.");
    }
  } catch (error) {
    console.error("API call error:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.get("/weektimetable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/hisTimetable`, {
      params: {
        KEY: API_KEY,
        Type: "json",
        ATPT_OFCDC_SC_CODE: OFFICE_CODE,
        SD_SCHUL_CODE: SCHOOL_CODE,
        GRADE: grade,
        CLASS_NM: classNumber,
        TI_FROM_YMD: monday,
        TI_TO_YMD: friday,
      }
    });

    if (response.data && response.data.hisTimetable && response.data.hisTimetable[1].row) {
      const timetable = response.data.hisTimetable[1].row.map((item: any) => {
        const year = item.ALL_TI_YMD.substring(0, 4);
        const month = item.ALL_TI_YMD.substring(4, 6);
        const day = item.ALL_TI_YMD.substring(6, 8);
        const api_date = new Date(`${year}-${month}-${day}`);
    
        const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
          month: 'long',
          day: 'numeric'
        });
        const formattedDate = dateFormatter.format(api_date);
    
        return {
          ALL_TI_YMD: formattedDate,
          PERIO: item.PERIO,
          ITRT_CNTNT: item.ITRT_CNTNT
        };
      });
  
      res.json(timetable);
    } else {
      res.status(404).send("해당하는 학년, 반의 오늘 시간표가 존재하지 않아요.");
    }
  } catch (error) {
    console.error("API call error:", error);
    res.status(500).send("Internal Server Error");
  }
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}`)
})