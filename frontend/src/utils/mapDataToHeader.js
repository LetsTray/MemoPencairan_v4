export function mapDataToHeader(data, header) {
  return data.map((item) => header.map((key) => item[key] ?? "-"));
}
