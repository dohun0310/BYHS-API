import express, { Request, Response } from "express";

import { today, monthstart, monthend, weekstart, weekend } from "./utils/date";
import { fetchTimetable } from "./services/timetable";
import { fetchMeal } from "./services/meal";

const app = express()
const port = 8080

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