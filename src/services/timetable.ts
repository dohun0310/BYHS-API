import { Response } from "express";
import axios from "axios";

import { API_KEY, BASE_URL, OFFICE_CODE, SCHOOL_CODE } from "../config";
import { formatResponse, errorResponse, notFoundResponse } from "../utils/response";
import { temporarytimetable } from "../temporarydata";

export const fetchTimetable = async (
  res: Response,
  grade: string,
  classNumber: string,
  startDate: string,
  endDate: string
) => {
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
      if (temporarytimetable[startDate] && temporarytimetable[startDate][grade] && temporarytimetable[startDate][grade][classNumber]) {
        const responseData = {
          "RESULT_CODE": 200,
          "RESULT_MSG": "Success",
          "RESULT_DATA": temporarytimetable[startDate][grade][classNumber],
        };

        res.status(200).json([responseData]);
      } else {
        notFoundResponse(res);
      }
    }
  } catch (error) {
    errorResponse(res, error);
  }
};