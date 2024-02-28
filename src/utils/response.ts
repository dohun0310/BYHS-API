import { Response } from "express";

import { dateFormatter } from "./date";

export const formatResponse = (res: Response, property: any, date: any, firstProperty: any, firstItem: any, secondProperty: any, secondItem: any) => {
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

export const notFoundResponse = (res: Response) => {
  res.status(404).json([{
    "RESULT_CODE": 404,
    "RESULT_MSG": "Not Found"
  }]);
};

export const errorResponse = (res: Response, error: any) => {
  console.error("API call ERROR:", error);

  res.status(500).json([{
    "RESULT_CODE": 500,
    "RESULT_MSG": "Error"
  }]);
};