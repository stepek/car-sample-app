const SERVER_URL = "http://localhost:8080"
const RETRY_TIME_STEP = 500

interface Query {
  [key: string]: string | undefined
}

export function parseQuery(query: Query): string {
  return Object.entries(query).reduce((result: string, [key, value]) => {
    if (result !== "") {
      result += "&"
    }
    result += `${key}=${value}`
    return result
  }, "")
}

export async function get<T>(path: string, query?: Query): Promise<T> {
  try {
    const response = await fetch(
      `${SERVER_URL}${path}${query ? `?${parseQuery(query)}` : ""}`,
      {method: "GET"},
    )
    return (await response.json()) as T
  } catch (e) {
    throw e
  }
}

export function getRetryTime(value: number): number {
  let a = 1
  let result = 0
  let temp: number

  while (value >= 0) {
    temp = a
    a = a + result
    result = temp
    value--
  }

  return result * RETRY_TIME_STEP
}

export function retryWhenFail<T>(
  callback: () => Promise<T>,
  maxRetry: number = 10,
  countNo: number = 1,
): Promise<T> {
  return new Promise((resolve, reject) => {
    callback()
      .then(resolve)
      .catch(error => {
        if (maxRetry > 1) {
          setTimeout(() => {
            resolve(retryWhenFail(callback, maxRetry - 1, countNo + 1))
          }, getRetryTime(countNo))
        } else {
          reject(error)
        }
      })
  })
}
