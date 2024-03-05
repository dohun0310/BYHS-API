import express, { Request, Response } from "express";

import { getToday, getMonthRange, getWeekRange } from "./utils/date";
import { fetchTimetable } from "./services/timetable";
import { fetchMeal } from "./services/meal";

const app = express()
const port = 8080

app.get("/", (req: Request, res: Response) => {
  res.redirect("https://github.com/dohun0310/BYHS-API");
});

app.get("/getTodayTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;
  const today = getToday();

  fetchTimetable(res, Number(grade), Number(classNumber), today, today);
})

app.get("/getWeekTimeTable/:grade/:class", async (req: Request, res: Response) => {
  const { grade, class: classNumber } = req.params;
  const { weekstart, weekend } = getWeekRange();

  fetchTimetable(res, Number(grade), Number(classNumber), weekstart, weekend);
})

app.get("/getTodayMeal", async (req: Request, res: Response) => {
  const today = getToday();

  fetchMeal(res, today, today);
})

app.get("/getMonthMeal", async (req: Request, res: Response) => {
  const { monthstart, monthend } = getMonthRange();

  fetchMeal(res, monthstart, monthend);
})

app.listen(port, () => {
  console.log(`Your app is running at http://localhost:${port}`)
})