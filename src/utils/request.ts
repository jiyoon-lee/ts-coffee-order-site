export default async (url: string) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    alert(e.message);
  }
};
