import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

const cities: Record<string, [number, number]> = {
  tehran: [35.7219, 51.3347],
  ny: [40.7128, -73.935242],
  sp: [59.9311, 30.3609],
};

const getCurrentWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=240bfc4baf6406f0b061027d836b439c`,
    { next: { revalidate: 3600, tags: ["weathers"] } }
  );
  return res.json();
};

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ city: string }> }
) {
  const city = (await params).city?.toLowerCase();
  if (city === "clear") {
    revalidateTag("weathers");
    return new Response(JSON.stringify({ meesage: "Cache cleared" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const latlon = cities[city];
  if (!latlon) {
    return new Response(JSON.stringify({ messsage: "City not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  const result = await getCurrentWeather(...latlon);
  return new Response(JSON.stringify({ city, result }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
