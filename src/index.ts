import express, { Request, Response } from "express";

import { API_KEY } from "./config";
import { today, monthstart, monthend, weekstart, weekend } from "./utils/date";
import { fetchTimetable, fetchMeal } from "./utils/response";

const app = express()
const port = 8080

if (!API_KEY) {
  console.error("ERROR: .env 파일에 API_KEY가 존재하지 않기 때문에 종료합니다. 프로젝트 폴더 안에. env 파일이 있는지 확인하고, API_KEY=NEIS_API_KEY 형식으로 작성해야 합니다.");
  process.exit(1);
}

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://github.com/dohun0310/BYHS-API");
});

app.get("/getTodayTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  fetchTimetable(res, grade, classNumber, today, today);
})

app.get("/getWeekTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;

  fetchTimetable(res, grade, classNumber, weekstart, weekend);
})

app.get("/getTodayMeal", async (req: Request, res: Response) => {
  fetchMeal(res, today, today);
})

app.get("/getMonthMeal", async (req: Request, res: Response) => {
  fetchMeal(res, monthstart, monthend);
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}`)
})