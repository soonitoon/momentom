const body = document.querySelector('body');

// eslint-disable-next-line prefer-destructuring
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const UNSPLASH_BASE_URL = `https://api.unsplash.com/photos/random/?`;

const fetchImage = async () => {
  const queryConfig = {
    client_id: UNSPLASH_API_KEY,
    query: 'landscape',
  };
  const queryURL = Object.keys(queryConfig)
    .map(key => `${key}=${queryConfig[key]}`)
    .join('&');
  const data = await fetch(UNSPLASH_BASE_URL + queryURL);
  const parsedData = await data.json();
  const {
    urls: { full },
  } = parsedData;
  return full;
};

const paintImage = imageURL => {
  const img = new Image();
  img.src = imageURL;
  body.appendChild(img);
};

const initBackgroundImage = async () => {
  const imageURL = await fetchImage();
  if (!imageURL) return;
  paintImage(imageURL);
};

export default initBackgroundImage;
