import { Response } from "express";
import axios from "axios";

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
      notFoundResponse(res);
    }
  } catch (error) {
    errorResponse(res, error);
  }
};