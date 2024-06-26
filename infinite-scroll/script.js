const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
//  Unsplash API
let imgCount = 2;
const apiKey = 'mV6r_c42MOq_HDVG7UrYrUdyf2fJvjBi_pAy9_rE-1U';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imgCount}`;

// Check if all images were loaded successfully

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imgCount = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}
// Helper Function to Set Attributes on Dom Elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //  Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    // Put <img> inside <a> , then put both inside imageContainer Element
    // Event Listener , check when each is finished loading
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//  Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch error
    console.log(error);
  }
}
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log('Load More');
  }
});

//  On Load
getPhotos();
