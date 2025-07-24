const cities = [
  {
    name: "Tehran",
    key: "tehran",
  },
  {
    name: "New York",
    key: "ny",
  },
  {
    name: "Saint Petersburg",
    key: "sp",
  },
];

export async function GET() {
  return new Response(JSON.stringify(cities), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
