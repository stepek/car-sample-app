const SERVER_URL = "http://localhost:8081"

interface Query {
  [key: string]: string
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
