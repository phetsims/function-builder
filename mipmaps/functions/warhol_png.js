/* eslint-disable */
import simLauncher from '../../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 123,
    "height": 189,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 62,
    "height": 95,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 31,
    "height": 48,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAwCAYAAADpVKHaAAAAAklEQVR4AewaftIAAAT3SURBVM3BT2xTdQDA8e/7vdf29XVlr13XdR0bHX+6jf3BGBkoB/wTJiMRIYFgIHryYkg8GePFBG/EcFIOmngh4WAGIXgwijL/YFBEMnAjmI1/7bZONrZ1pe3WP699rkENIs51SJ6fj8S/CwDrgTZAB+yAjb+bAwrADeAS0AcYLEDir54E9gItTqezob29XQ+FQtUVFRXouo6qqsiyjBCC+xmGgWmaxONxkskkiUQiOzAwcDsSiUwAN4EfgQ+AJL+TuOttTdNe2rZtW9OaNWvkQCCAx+PBZrPxsJLJJNPT04yOjnLhwoXEuXPnvgfeBb6RgJP79u3bvnnzZsntdvMoFYtFotEox44dm7x48eJOAby4fv16ye1286gJIWhsbKSjo8MHdMp7n918IPrdGZKqE03TcDqdPAqGYTAyMsKpU6f45cvPGZ/LblVW1NSws9LGtZ9/4NJXn3HS5aGuqZlgMIiu62iahsvlwuFwsBimaZJKpchkMszMzBCPx4lGo8iXL7HB62Z/lc4ntdX0TydQmCckibDuJqy72W2aTI1fZzJ6hXgmx+jsHKm8wUS+wKRageTxIttseHw+SnK5HKmZGQrpFGoyQaCYZ5lNoVp1UKPaaXeqVKl2tLZV3E/hPpIk4VMd+FQHC8pN8SddBr0SqKQcAgsJLCSwkMBCAgsJLCSwkMBCAgsJLCRkVcUqQqnUsYrAQgpLYAKFZRpFu4I8m0WezbIUCmXKV2qkV9ZSVO38QbkzS8XVGCJnUA6huNzYgg0sRsFpJ9VUT1G1cy9jmUaypQFTYlECbjclQq6oIHzgIHr3TiRFYSGZ5T5MWfAgBc1Bzq+zEPvKJhrefAd5+y5KFOapVT5Wvfoaxt5XSA8PMxsbJTMaJXt7gnz0BvnpCcxMBkNTWUjBpVKieKpQaoI46kPY/TU4l9fjql+BM1CLJEnw9beUKNxD0VxUNrdQ2dzC/UzD4PzxD7kzOsQ/qd3xMqs3bWGxBIskKQq+xrUsxLtiNeUQlKFh3UacngAP4m/ZgKcuRDkEZbCpTp7Ys5+a1qdAkiiR7SqhTS/Q9vxuJEmiHAplUiuW0dG9B+O5HeQzczhcboQssxQKS6TYHSh2Bw9DYCGBhQQWElhIYCGBhQQWElhIYV52NsWtoQEC4XZsqhMhZP5LxWKBkqnhG5QUDYMShXlzd+Jc7e3B6a7k1lA/gabH8NavpESx2Vmq7GwKTJPBM58SCK8jdvk8SBJClpnXLI4cOTIyeWeWp18/SFXDagrZOYxchiunT3Dl9AkKRp7EeIwS0yySGI9RYppFEuMxSkyzSGI8RolpFkmMx5iORfjp48Ok45MUsnMUiwZtW/ewdssupuNx5m2RJycnb5zu7d3g8VZ5dI+Hlo3P4PYFME0TV1UNE9evMNjbQ7C1k0jfWQZ7ewi2dhLpO8tgbw/B1k4ifWcZ7O0h2NpJpO8sg709LG/biHBo+BpWs7xjA8LpZuDyZd57/3D20KFDJ4E3JO5SgLeArV1dXeHu7u7q5uZmAoEADgo4FImVbY+Tnpkim07irQuRnpkim07irQuRnpkim07irQsRnxjj1+hNHN4AY2NjDA8P09/fnzt69Gh0bGzsEvAR8AXzJB7sWaALaASqAY/f7/eEw2GltrbW5vf7HdzDMAxzZGRk7tq1a/mhoaEccBtIABFgEDgOjPJ/8hteNr6vRYN9NQAAAABJRU5ErkJggg=="
  },
  {
    "width": 16,
    "height": 24,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAYAAADzoH0MAAAAAklEQVR4AewaftIAAAI5SURBVKXBXUtTcQDA4d/5n7O57Zxt7my5VwOxF5QybGAS0YVdJELdRTfZTZ+hu6AP0QcIJAiKoos+gS9XsWCKGpFLmu9ni23OzZ2d7bSRkRdawnkeid/OA9NDQ0PDo6OjsVAoFHR1cKTdbrfK5XIll8sV5+bm1oCPwCwd0uTk5Jvx8fGpaDSqBgIBhBD8y8HBAYZhWKurq5mZmZmHSlzTHkSjUXp7ezkLVVURQiib+fwNoF+5KzXwfnjFlidAI5bi0B+g6fHSVhRcbjcty8JuNnGbDVzVfTyFPfTCFmnLomNeAYmk6iOJBcY6GPxfUONLqUKXwCGBQwKHBA4JSQicEELVcELhFKauYZ4LItdNPPkCkm1zEhG6PYESS3GcpXmoXkph6gHqyQi1gSjHSV4VfWKKLiV09Rojjx5T39vlsGDQrFQobn+nsp7hD3nwIqn7T1A0Dbeu44slyC4vw7PnKHRIsowvnsAXT9DlL19h++USbcukKzl2h+j1m5xE4QS+YIix6afsfltB1SPELgxzGoVT+MN9+MN9/I/AIYFDAodEu2VRq5SwbZuzsG0bs16jUavSpRT3dhv7ur9nayWDFokR7h9EcffQapp0yS43raZJV2lng1qpiMvjZf+nQcct+VPmsz1weTjhi8QDraYlG7kVvJqfatGgmF9DdrmoFg02vy5hSgqlptRe29jZfP32/btsNvtC4q9B4B4wMDIyEk6n0x6v1yvbHYuLi4cLCwsV4AcwC8xz5BcWKs5WfFO4iAAAAABJRU5ErkJggg=="
  },
  {
    "width": 8,
    "height": 12,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAklEQVR4AewaftIAAAD7SURBVIXBTUrDQBgG4He+zqRV0FoqWGlExEUp/nTZtbjwAF5BV65yHRcKCh7AvScQuovoQkqVVJMYbSyZNE1nRgQFEbHPwxzHObZtuy2EqBKRAGCUUjJN0yfXdS94Qw4PxTjDmHMYIkBrCK1QHqVrJpOSr794qIQ9/IUPYkOYgsAY/kPMKuJbXp6FKln4idcPjlAKfCS+h9fsEVwTVqoNFJfrSLIcfKG5gdrOLtQkh766xHzNxmqrjU9hpwOOLwUusLW3j98IU/BhFOgZ0jS3uAQYAzDCJBtBvr9hED6zQnNzm4Sw4N3fJv1eN47CIOre3Tz4sbw+PTs/+QDFOWPa3GqMcwAAAABJRU5ErkJggg=="
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