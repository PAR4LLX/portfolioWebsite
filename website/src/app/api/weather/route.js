// Weather Data - https://www.weatherapi.com/docs/
export async function GET(request) {
  const key = process.env.WEATHER_API;
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location') || 'Melbourne';

  // Check for Correct API Key
  if (!key) {
    return new Response(JSON.stringify({ error: 'API key is missing' }), {
      status: 500,
    });
  }

  // Fetch Data
  try {
    const weatherRes = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=1&aqi=no&alerts=no`
    );

    // Error Handling
    if (!weatherRes.ok) {
      const error = await weatherRes.json();
      return new Response(JSON.stringify({ error: error.error?.message || 'API Error' }), {
        status: weatherRes.status,
      });
    }

    // 'weatherData' Contains JSON
    const weatherData = await weatherRes.json();
    return Response.json(weatherData);

    // Catches and Logs Errors
  } catch (err) {
    console.error('Weather API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), {
      status: 500,
    });
  }
}
