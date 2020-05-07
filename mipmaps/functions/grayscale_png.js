/* eslint-disable */
import simLauncher from '../../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 176,
    "height": 148,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 88,
    "height": 74,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 44,
    "height": 37,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 22,
    "height": 19,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAATCAYAAACUef2IAAAAAklEQVR4AewaftIAAAMcSURBVKXBX0hrdQDA8e9vZ+eyc5pTsylic24MJXCCCTmEpHwY7T4l7kWDKwi3fJAeRg9JQVkvIfYgSCDUAunFh24DH5X5NJV0iTDnvf5BJl4NvboZg7O5eU5KBjI0rrfPR/Dq2vv7+x+73W5XOp2+SCQS63Nzc2PAcy4JXkFjY+O3fr//00AgYDs/P+fk5IRiscj+/v5BJBL5MpFI/CxxT3V1dUNNTU3faJqmejweZFlG0zRMJhMVFRVl9fX1787Pzy9K3JPb7f5JUZRaSZLQNA23242maVxRVZWGhgbF4XC8YeZ+KmVZbszn8+TzeRwOB4FAgEKhQCwW4+LigitOp9Nr5n7eFEI84FprayuyLCPLMqenp0SjUa5kMpnXzNzCMIyHgAB0oAZ4IoT4C3hmGEYWsFosFmKxGD6fDyEE7e3t6LrOzMwMR0dHaYkShmF8kM1mfwyHw58sLy9/VCgUPrRYLO+Mjo7+MjIyUrTb7Q+rq6vrLRYLfr8fRVHQdR1ZlnG5XPh8PqLR6IzgkmEYj1dWVr7QdV1SVbUsmUyW67qOy+Vic3OTtbU1QqHQnxsbG0WbzWaamJioqK2tVQcGBjCZTKiqiiRJGIbBwsLCVk9Pz3uSYRhdq6urP4yPj9e1tLTYxsbGLF6vl3Q6zRUhBEtLS6RSKWtVVZVtcnKybHh4+DCbzR5VVlZWKYqCJEkcHx9fLC4u/t7b2/sx8FQYhvH17OzsV9vb27wsu91OMBj8TgjR3tbW9n4ul2N9ff0z4HuumYG9RCJBKBTiX0IIfD4fqqqSTCY5PDzkpqGhIYLBIJeK8Xica2luMHOLwcFBPB4Puq7T1dVFOBxmZ2eHm6anp/3A69zBRAmv14vT6eTFixMODo4oFAr4/X5K7e7uvg00cAcTJWpqarBarUxNPeXJrxqZTIby8nJKdXZ2/gb8wR3MlNja2iKdTvPo0VvkckWs1gfs7e1RqqOj4xmwCZzyjwNuMFMilUoRj8dpbm5GUSTOzs6YmpriDp9zBzO3iEQiRCIR/g8z8Lyvr2+2u7ublyXLMpe2+Q9/AwMQN1pIgzvmAAAAAElFTkSuQmCC"
  },
  {
    "width": 11,
    "height": 10,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAAklEQVR4AewaftIAAAE8SURBVHXBQUvCUAAH8L9Ph3vk6uHJYId2cIecBO8TdIkgz56iu3nIW8eCIPYB9g2i8B50CYZQJ08yD4pgb4QwGKWHNWmT0nZQiMjfL4U1dF0/qNfrl7Isq+Px+KXZbJ6nsYZhGA+5XI5rmsYopRrnfI/gf9uz2UxXFAXVahWSJCEIgt00lsIwvCoWixemaR55nncTRdGZqqqUcw7GGIQQfqrf75uDweB0Op1uUEozw+EQpVLpw/O8r0KhIBuGQaMoChzHuc64rrtv2/YWEtlsFnEcYzQaKfl8HvP5/K7RaBwLIU4A3BPf978ty8JkMoGibGKxWMCyLHQ6HTiOcyiEQCJGgmCJMYZe7w2SJGGlXC4/AngF8IkEwVKr1QIh72i321ip1Wo2gB0AT0hkKpXKreu6z/iDEIJEF7/8AJjgevrFqqeCAAAAAElFTkSuQmCC"
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;