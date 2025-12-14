export async function handler(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      message: "Netlify function is alive 🚀"
    })
  };
}
