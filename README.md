# 부용고등학교 급식/시간표 조회 API 가이드

부용고등학교의 급식과 시간표를 조회할 수 있는 API의 가이드입니다.

## 시작하기

### 개발용 사전 요구사항

1. `Node.js`가 설치되어 있어야 합니다.
2. 프로젝트에 필요한 환경 변수를 설정하기 위해 .env 파일이 필요합니다.

### 운영용 사전 요구사항

1. `Docker`가 설치되어 있어야 합니다.
2. `Container` 생성 시, API_KEY를 지정해야 합니다.
3. 본인 환경에 맞게 포트포워딩을 해야 합니다.

### 로컬 환경

1. 이 프로젝트를 클론합니다.
```bash
git clone https://github.com/dohun0310/BYHS-API
```
2. 프로젝트 디렉토리로 이동한 후, 필요한 패키지를 설치합니다.
```bash
cd BYHS-API
yarn add
```
3. `.env` 파일을 프로젝트 루트에 생성하고, 다음과 같이 API 키를 추가합니다.
```.env
API_KEY = NEIS_API_KEY
```
4. 서버를 시작합니다.
```bash
yarn start
```
5. 서버가 시작되면, 다음 주소를 통해 애플리케이션에 접근할 수 있습니다.
```
http://localhost:8080
```

### 운영 환경

1. [`Docker`](https://docs.docker.com/get-docker/)를 설치합니다.

2. `Image`를 가져옵니다.
```bash
sudo docker image pull dohun0310/byhs-api:latest
```

3. `Container`를 생성합니다.
```bash
sudo docker run -d --name byhs-api -p 8080:8080 -e API_KEY=YOUR_NEIS_API_KEY --restart=on-failure dohun0310/byhs-api:latest
```

5. 서버가 시작되면, 다음 주소를 통해 애플리케이션에 접근할 수 있습니다.
```
API_URL:8080
```

## API 사용법

| endpoint | Description | Parameters |
|---|---|---|
| /getTodayTimeTable | grade와 class에 해당하는 학년과 반의 오늘 시간표를 조회합니다. | grade, class |
| /getWeekTimeTable | grade와 class에 해당하는 학년과 반의 이번 주 시간표를 조회합니다. 만약, 오늘이 목요일 이후라면 다음 주 금요일까지의 시간표를 조회합니다. | grade, class |
| /getTodayMeal | 오늘의 식단 정보를 조회합니다. |  |
| /getMonthMeal | 이번 달 식단 정보를 조회합니다. 만약, 오늘이 이번 달의 마지막 주라면 다음 달 말일까지의 식단을 조회합니다. |  |

### 응답 형식

해당 API는 JSON 형식으로 데이터를 반환합니다. 각 엔드포인트에 따라 다음과 같은 정보를 포함할 수 있습니다.

| Variable | Type | Description |
|---|---|---|
| RESULT_CODE | Integer | 200: Success / 404: Not Found / 500: Error |
| RESULT_MSG | String | 결과 코드를 설명하는 짧은 메시지로, 요청 처리 결과에 대한 요약 정보를 제공합니다. |
| RESULT_DATA |	Object | 요청에 대한 응답으로 반환되는 실제 데이터입니다. |

### 요청 예제

#### /getTodayTimeTable

요청
```
API_URL/getTodayTimeTable/3(학년)/10(반)
```

응답
```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 1일 월요일",
      "period":[
        "1", "2", "3", "4", "5", "6"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시"
      ]
    }
  }
]
```
---

#### /getWeekTimeTable

요청
```
API_URL/getWeekTimeTable/3(학년)/10(반)
```

응답
```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 1일 월요일",
      "period":[
        "1", "2", "3", "4", "5", "6"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 2일 화요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 3일 수요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 4일 목요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 5일 금요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  }
]
```

```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 5일 금요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 8일 월요일",
      "period":[
        "1", "2", "3", "4", "5", "6"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 9일 화요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 10일 수요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 11일 목요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 12일 금요일",
      "period":[
        "1", "2", "3", "4", "5", "6", "7"
      ], 
      "subject":[
        "1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"
      ]
    }
  }
]
```
---

#### /getTodayMeal

요청
```
API_URL/getTodayMeal
```

응답
```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 1일 월요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "878.0 Kcal"
      ]
    }
  }
]
```
---

#### /getMonthMeal

요청
```
API_URL/getMonthMeal
```

응답
```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 1일 월요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "878.0 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 2일 화요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "1387.3 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 3일 수요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "1414.0 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 4일 목요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "915.9 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 5일 금요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  },

  ...

  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 31일 수요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  }
]
```

```json
[
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 30일 화요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "878.0 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "1월 31일 수요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "2월 1일 목요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "2월 2일 금요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  },
  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "2월 5일 화요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  },

  ...

  {
    "RESULT_CODE": 200,
    "RESULT_MSG": "Success",
    "RESULT_DATA": {
      "date": "2월 28일 수요일",
      "dish": [
        "밥 (1.2.3)<br/>국 (4.5.6)<br/>김치 (7.8.9)<br/>고기 (10.11.12)<br/>채소 (13.14.15)"
      ],
      "calorie": [
        "823.9 Kcal"
      ]
    }
  }
]
```
---

## 개발 환경

- Node.js
- Express.js
- TypeScript
- Axios
- dotenv
- Docker
- Jenkins

## 기여하기

이 프로젝트에 기여하고 싶으신가요? 기여는 언제나 환영입니다! `Pull request` 해주시면 적극 검토 후 반영하겠습니다.