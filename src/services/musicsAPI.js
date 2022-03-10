const getMusics = async (id) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  console.log(requestJson.header);
  return requestJson.results;
};

export default getMusics;
