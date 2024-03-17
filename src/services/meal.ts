import { Response } from "express";
import axios from "axios";
import cheerio from "cheerio";

import { API_KEY, BASE_URL, OFFICE_CODE, SCHOOL_CODE } from "../config";
import { formatResponse, errorResponse, notFoundResponse } from "../utils/response";

export const fetchMeal = async (
  res: Response,
  startDate: string,
  endDate: string
) => {
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
        const response = await axios.get("https://buyong-h.goeujb.kr/buyong-h/main.do");
        const $ = cheerio.load(response.data);

        const data = $(".meal_list").text().split("\n");
        const meal = data.slice(1, data.length - 2).join("\n");
        const calorie = data[data.length - 1].split("/")[0] + " kcal";

        if (meal.length != 0) {
          const crawling = {
            row: [{
              MLSV_YMD: startDate,
              DDISH_NM: meal,
              CAL_INFO: calorie
            }]
          };
  
          formatResponse(res, crawling, "MLSV_YMD", "dish", "DDISH_NM", "calorie", "CAL_INFO");
        } else {
          notFoundResponse(res);
        }
      } catch (error) {
        notFoundResponse(res);
      }
    }
  } catch (error) {
    errorResponse(res, error);
  }
};