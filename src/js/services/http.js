const httpService = async (
  url,
  method = "GET",
  body = null,
  headers = { "Content-type": "application/json" }
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(url, { method, body, headers });

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
export default httpService;
