import express, { Request, Response } from "express";
import axios from "axios";
import cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = 8080

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://open.neis.go.kr/hub/";
const OFFICE_CODE = "J10";
const SCHOOL_CODE = "7530575";

if (!API_KEY) {
  console.error("ERROR: .env 파일에 API_KEY가 존재하지 않기 때문에 종료합니다. 프로젝트 폴더 안에. env 파일이 있는지 확인하고, API_KEY=NEIS_API_KEY 형식으로 작성해야 합니다.");
  process.exit(1);
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const day = (`0${date.getDate()}`).slice(-2);
  return `${year}${month}${day}`;
};

const getToday = (date: Date) => {
  const day = date.getDate();
  const today = new Date(date.setDate(day))
  return formatDate(today);
};

const getWeekRange = (date: Date) => {
  const day = date.getDay();
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diffToMonday));
  const friday = new Date(date.setDate(monday.getDate() + 4));
  return { mon: formatDate(monday), fri: formatDate(friday) };
};

const today = getToday(new Date());
const { mon, fri } = getWeekRange(new Date());
const dateFormatter = new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" });
const formattedToday = dateFormatter.format(new Date());

const formatResponse = (res: Response, property: any, date: any, firstProperty: any, firstItem: any, secondProperty: any, secondItem: any) => {
  const groupedByDate = property?.row?.reduce((acc: any, item: any) => {
    const year = item[date].substring(0, 4);
    const month = item[date].substring(4, 6);
    const day = item[date].substring(6, 8);
    const apiDate = new Date(`${year}-${month}-${day}`);
    const formattedDate = dateFormatter.format(apiDate);

    if (!acc[formattedDate]) {
      acc[formattedDate] = {
        "RESULT_CODE": 200,
        "RESULT_MSG": "Success",
        "RESULT_DATA": {
          date: formattedDate,
          [firstProperty]: [item[firstItem]],
          [secondProperty]: [item[secondItem]],
        },
      };
    } else {
      acc[formattedDate]["RESULT_DATA"][firstProperty].push(item[firstItem]);
      acc[formattedDate]["RESULT_DATA"][secondProperty].push(item[secondItem]);
    }

    return acc;
  }, {});

  res.status(200).json(Object.values(groupedByDate));
};

const notFoundResponse = (res: Response) => {
  res.status(404).json([{
    "RESULT_CODE": 404,
    "RESULT_MSG": "Not Found"
  }]);
};

const errorResponse = (res: Response, error: any) => {
  console.error("API call ERROR:", error);

  res.status(500).json([{
    "RESULT_CODE": 500,
    "RESULT_MSG": "Error"
  }]);
};

const fetchTimetable = async (res: Response, grade: string, classNumber: string, startDate: string, endDate: string) => {
  try {
    const response = await axios.get(`${BASE_URL}hisTimetable`, {
      params: {
        KEY: API_KEY,
        Type: "json",
        ATPT_OFCDC_SC_CODE: OFFICE_CODE,
        SD_SCHUL_CODE: SCHOOL_CODE,
        GRADE: grade,
        CLASS_NM: classNumber,
        ...(startDate && { TI_FROM_YMD: startDate }),
        ...(endDate && { TI_TO_YMD: endDate }),
      }
    });

    if (response.data.hisTimetable && response.data.hisTimetable[1] && response.data.hisTimetable[1].row) {
      formatResponse(res, response.data.hisTimetable[1], "ALL_TI_YMD", "period", "PERIO", "subject", "ITRT_CNTNT");
    } else {
      notFoundResponse(res);
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

const fetchMeal = async (res: Response, startDate: string, endDate: string) => {
  try {
    
    const response = await axios.get(`${BASE_URL}mealServiceDietInfo`, {
      params: {
        KEY: API_KEY,
        Type: "json",
        ATPT_OFCDC_SC_CODE: OFFICE_CODE,
        SD_SCHUL_CODE: SCHOOL_CODE,
        MLSV_FROM_YMD: startDate,
        MLSV_TO_YMD: endDate,
      }
    });

    if (response.data.mealServiceDietInfo && response.data.mealServiceDietInfo[1] && response.data.mealServiceDietInfo[1].row) {
      formatResponse(res, response.data.mealServiceDietInfo[1], "MLSV_YMD", "dish", "DDISH_NM", "calorie", "CAL_INFO");
    } else {
      try {
        /// TODO: NIES API에 식단표가 없을 경우, 학교 홈페이지 크롤링으로 식단표 가져오기(API 찾음)

        const url = "https://buyong-h.goeujb.kr/buyong-h/widgApi/get/json.do";
        const response = await axios.get(url, {
          params: {
            widgSysId: "buyong-h",
            widgId: "70"
          }
        });
        
        res.json(response.data);
      } catch (error) {
        console.error('Error sending POST request:', error);
        res.status(500).send('Error sending POST request');
      }
    }
  } catch (error) {
    errorResponse(res, error);
  }
};

app.get("/getTodayTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  fetchTimetable(res, grade, classNumber, today, today);
})

app.get("/getWeekTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  fetchTimetable(res, grade, classNumber, mon, fri);
})

app.get("/getTodayMeal", async (req: Request, res: Response) => {
  fetchMeal(res, today, today);
})

app.get("/getWeekMeal", async (req: Request, res: Response) => {
  fetchMeal(res, mon, fri);
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}`)
})