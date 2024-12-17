/* eslint-disable */
/* @formatter:off */

import MipmapElement from '../../../chipper/js/browser/MipmapElement.js';

// The levels in the mipmap. Specify explicit types rather than inferring to assist the type checker, for this boilerplate case.
const mipmaps = [
  new MipmapElement( 183, 93, 'data:image/png;base64,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' ),
  new MipmapElement( 92, 47, 'data:image/png;base64,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' ),
  new MipmapElement( 46, 24, 'data:image/png;base64,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' ),
  new MipmapElement( 23, 12, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAMCAYAAACJOyb4AAAAAklEQVR4AewaftIAAAJ5SURBVH3BW0hTYQDA8f93zplH5z0xA9Nl4szEvEQJPSgYFkhZPXQVeik0qSjqqcIkMnouYT2UBRWVlEKBZPTgqJc0zFbYaJjdRJC04ZxzZ3PnS0hBRf39BCvxGGXACUxZRHg6jYhpQREmFm0UVXEDD7HrrSxDsBSPEQXcI2DsxRuwiiEDxoAgYAFWSWSGDinWaWKj3wDnsOsuFhEs5jFyMc3H/JkoFn0Bqrslh7QA2UkhrBaTUETwYzyKp5NWnpQqyCId1iQOoaknsesvmEcwn8fQkLKbIW9J2ssQLT4fOyrcaCXv8CUOYGhTREV0EnxZmJ9Lcb4qoF5LYqBKhXUpw2jKPux6D7NU5jvdcJsxf1VKR5BOc5Sy2mf8KnDydmr1RL8/s++7P9M9EEgfGUSJ0+w9MZuLB9nx1cZrVyxjtnA8CTEbaG66xyyVOR7DhhG+Id6PRz8enKC8ro3e5BFc3hxnyLQcrMlvvNbmcD5oczjvVtdXPhqeTM3yW8ftRQVusak7j/tTGmRY1nL+yiDNTZ+YoTLnVMNF/k5ur+owuFTp4ndBFy6vvasmv7Gi3eEcYZ52h9PX7nC2bj++Kz8q+Vd+sTWOn50ZuPJQSIzRaW56xAyNGVLKwt9BszqcGk+oVkW3pWMqZ6crbetvQSPLEYK6L97s8pwtY2kXkhKoiBXcFDK3l/80KeVV4ExGtBJPtA6lOrCNbNCA68BTlnF44+UjpozEKUIlNw1ygaOQjZQfgT0KsBOIZ2l+VmZThBrLQgIoBJ4rQAvgAYIs1A8cYGVbWZoJjAtmSSmPAfuBIOAG7gghvrECKeVuoB6IAGHACrQBvUKID/8A6W/sJQzfsSgAAAAASUVORK5CYII=' ),
  new MipmapElement( 12, 6, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAGCAYAAAD37n+BAAAAAklEQVR4AewaftIAAAEASURBVFXBPUgCYQCA4fe6O45DQpEkjuCIhEMs0ISmoJYggibbHKKaouj2hopAiMa4IWm5Kdwamlpa+iPCRSioi4Z+hjCuJIjjSPxS0KHnkejyQpnwt4QfTFNvJlBpkFAfiUVKWNoBHRJtXtjDd3C2cPk1vqJ79A2+0Qw1bqpp1kaM0Ldiu6T1LVpk2pbXnfnzz7md3DG17HXlTm+UP+I1bzR3Zc5W+ntdLZplo3iCU3xXhBDG0cvPTCpZx08q1QnDGaPj8Ha7MDl14e49WNF9xNI92ApwmjcjQ5gZIDMAq3QVhjdFi2ynJGxYRIgnBSgDeUAFXP6LS5L0DAjgFQj+ANsvVah2bRoPAAAAAElFTkSuQmCC' )
];

export default mipmaps;