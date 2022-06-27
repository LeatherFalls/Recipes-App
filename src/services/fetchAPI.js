export default async function fetchAPI(param) {
  const response = await fetch(param).then((res) => res.json());
  return response;
}
