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
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABKCAYAAAA/i5OkAAAAAklEQVR4AewaftIAABBISURBVO3BDVBUh4HA8f97+/aThWVhF1hAZEHj4ifVGg2oEA71tCZmAjYzpqlJJlOnd5nY1APTOLau5zjttE3apgyNY6YmpqZOvK3Bj9wpMMZUqVgSZUwFv5AYXDYaAXE/YJf3jp3GOWYPBCykA/H3477RJXBfBjAdMPF/uoGPgAv8gwS+fmzAD4D5wKS4uLjkzMxMjEYjfr+fML/fT0tLCzdu3OgAGoAG4DWgjmES+PooBDZoNJoFhYWFuoULF2KxWEhNTSUsFArh8Xjoq62tjevXr3Pu3DmqqqpCPp+vDngd+D1DJDD+ZQC/NRqNi5977jlp7ty5xMXFESkUCuHxeBiI3+/n/PnzVFRU0Nzc/GfACVQyCIHxbR3wclZWVsL3v/99Jk+ezEBCoRAej4fB+P1+Tp06xTvvvOMNBoO/BV7iLlSMX7/W6XQb58+fH52WlsatW7dwOBwIgkB/ZFnG6/UyGLVazcSJE/nmN7+p+fTTTxfcvHlzKnAACNEPFeNTmclkej43N1c0mUyE+f1+YmNjiY+Ppz+yLOP1ehkqo9FIdnY2Pp9vWnNz88PAbiBEBBXjz69NJtPz8+fPx2Aw0FdraysOhwNJkogkyzJer5fh0Gg0OBwOurq60pqammYAfySCivFlnU6n25iTkyMaDAYihUIh1Go1NpuNSLIs4/V6GS5JkrDb7TQ3Nztu3LhhBv6bPkTGDxvw0pw5c6SoqCgG8te//pXOzk5GktFo5Lvf/S5qtXotsII+VIwTarX6nSlTpsxOS0tjMMFgkPT0dPqSZRmv18u9io2NZeLEiVJNTc1U4HW+pGJ8KBRFcfPkyZNFtVqNSqXibm7cuMGECRMwGo3cIcsyXq+X4RJFkdjYWGJjY5kwYQKNjY1Jra2tPcAxeomMDyV2u10SRZHOzk5u3bpFKBTibmpqavhHRUdHk5iYiMFgIEyj0fDEE0/QaxVfEhn7zECu2WzmjmAwSEdHB52dnfT09NAfj8dDU1MT90Kn05GYmEhMTAyiKNJXVlYWaWlpM4FH6KVi7Hs5ISGhMDExkUg9PT0EAgEURUGSJARBoK/W1laysrJQqVRER0ej0+nQ6XR0dXWhKAqRJEnCbDYTExODKIr0R6VSodfrqampMQB/lBj7FlqtVu4mEAjQ1dWFXq9Hp9MhCAJhXq+XqKgocnJy0Ol03NHd3c2FCxc4deoUPT09CIJATEwMUVFRCILAYNLS0ug1hV4SY1+6TqdjMIqi4PP58Pv9REVFodFoKC0tJScnh0gajYZp06aRkJDA0aNHiYqKQhRFhio9PR21Wu0IBoM2kbHNJopiul6vZ6gUReH27dsUFxeTk5PD3VitVubPn48oigyHRqMhOzubXg+JjG0ZOp0OQRAYriVLljAUqampaDQahiszM5NecyTGtgyj0chw2e12EhISGApBEAhrampiOLq7u+lllPgaSklJYThaWlo4fPgww9Ha2kqvLJGvoS+++ILhCAQCDFdnZye9zomMbZd9Ph/Dde7cOb744guGQlEULl26xHD19PTQ67aKsS0ky/L6CRMmMFSSJBEdHY3JZGLq1KkMJhAIMGPGDGw2G83Nzfj9fobi4sWL3L59+1cqxrbbsiw/bbVaY9VqNXcjCAJGo5GoqChEUeSTTz7B4XCQlJTEQEKhEB0dHYiiSEpKCosWLcJms9Hc3Izf72cgsixTX1+PLMsvqxhFiqIUb968OeB0OtsYhKIoL2zevPmM0+kMMTyPW63WiTqdjoHodDqio6NRq9XcoSgKfr+fqVOnotVqEQSBOxRFIRAI0NHRgaIo3KFSqUhJSWHBggWYzWaampoIBoNEunXrFpd6AU6BUaIoyg+AjcAewM/gCoFu4N8EQahj6H6WkpJSmpGRQSRJkoiKikKSJCJJkkRJSQlxcXEIgoBer0eSJDQaDd3d3SiKwmD8fj+1tbVUVFTg9Xq54+rVq9TV1b0PLBcYBYqiFAPlgIXhOw4UCoIQYGhsoihenj9/vk6lUhEmCAIGgwGtVosgCPRnxYoV5OXlESk6Oprh8vv91NbWUlFRQWdnJ8eOHaO9vX018I7ACFMUpRgoByz0Kisrw+/3M5jCwkKys7P50nGgUBCEAENzZObMmYUmkwmtVovBYEAURQYSHx/Piy++iFarJVJUVBSiKHIv/H4/e/bs4aWXXroAPEAviRGkKEoxUA5YvF4vUVFRbN++nfr6egZz+PBhwj7//HMSEhJygUpFUQoFQQgwuJ9dvHgxf+HChZJer2cwK1euRKvV0h9FUbhXarWa6upqer3Nl0RGiKIoxUA5YHG5XNTW1nIvSktLaWhooFcuUKkoio7BVfp8vqrPPvuMwWRlZZGVlcVAZFnmXlVVVXH48OHzwBa+JDEIRVFygQzuLh7YCFhcLhdFRUVUV1dzh9lsZsWKFUQ6cOAAbW1t9CXLMgUFBVRXV+NwOHKBSkVRXmcQ169ffychIeFBi8Vi7kV/RFFk+fLl3I0sy9yL1tZWSktLQ8BW+pC4C0VRMoA/AqkMgcvloqioiEgTJkzgrbfeItKsWbNoa2sjktvtpqCggOrqahwORy6QyyCsVisnTpw4tnTp0kU5OTno9Xoi5eXlkZSUxN3Issxw+Xw+Nm3ahMfjeRPYRR8SA1AURQfsBVJPnz7N9evXiRQTE8O8efMIc7lcFBUVMVLcbjcFBQVUV1fjcDjwer2cOHGCgTz44IM89NBDOT/5yU/+55VXXlk6a9YstFotdxgMBvLz8xmMoigMh8/nY9u2bezfv/8D4DkiSAzsv4BvfPzxx+Tk5BAIBOiruLiY8vJywlwuF0VFRYw0t9tNQUEB1dXVOBwODAYDhYWFBAIBIm3ZsoVNmzZJ69evn/WHP/xh35kzZx6bOXMmOp2OsEcffRSDwcBgZFlmqHw+H9u2bWPHjh0ngH+lHyL9UBTlV8Dya9eu8Z3vfIdAIEBfxcXFlJeXY7FYcLlcFBUVMVrcbjcFBQU0NDSQm5tLZWUlOp2OSD/+8Y/Zt28fvZI++uijuGvXrr1VU1NDe3s7KSkpZGdnMxSKoqAoCoO5evUq69atY8eOHR8A/wIE6IdIBEVR1gH/7vV6WbduHX/729/oq7i4mPLyciwWCy6Xi6KiIkab2+2moKCAhoYGcnNzqaysRKfTEenZZ5/l8uXL9FqkKEpHr/88evRoh9FoxOfzMVSyLDOQUCjEwYMHKSwsDO3fv/8NIB8IMAAVfSiKsgL4dSgUinI6nWzfvp2+iouLKS8vx2Kx4HK5KCoqYiBr1qzBbrfzu9/9jvr6epxOJ06nE6fTidPpxOl04vF4uOOpp54iMzOTP/3pT9TX1xPp9u3buFwuvvWtbzF79mwefvhhdu/eTSgU4o5AIMDly5dZuXIlGo1m1ubNm990Op1lx48ff6CqqiotJSUFi8WCVqvlbiRJQhRF+urq6uIvf/kLpaWlvPbaa41dXV3/AWxlEAJfUhTFBpwA0j/++GOqqqroS6PRsHr1aiwWCxcvXmTfvn3czbJly5g2bRplZWX4/X4GU1hYSHZ2Nrt27cLj8TAQQRBYu3YtRqOR2tpajh07RqS5c+eSl5dHr2bgXUEQSoC1wDNWq3XeM888w+zZs3nggQeIjo4mklarRaPR4PP5uHDhAg0NDZSVlXH+/PmzwLvAFoZIoJeiKDrgBPANxiGhF/9nDlAKfJteWVlZTJ8+nYyMDO5oaWnhypUrnDp1iq6urmvAKeD3wHsMk8TfTQOqAAHI3rVrFx6Ph7GuqKgIu92Ooig2QRDc/F0d8ATwbXqdO3eOc+fOcRefAI9xjyR6CYJQB9QpinKYXkeOHGHXrl2Mdfn5+djtdgRBcPNPInLfqBK5b1SJ3DeqJL4iVquV9PR0oqOjCQaDtLa20tTURCgUYjyTGEWSJLFo0SImTZpEXFwckYLBIJ999hknT57kypUrjEcSo2TSpEksXrwYk8mESqXCZrNhNpvR6XQEg0E6OzvxeDyo1WrS0tI4c+YMhw8fZryRGAUOh4OlS5diMBiwWCxYrVbUajVh3d3dhBmNRmJiYmhra8PtdjN79myMRiMul4vxRGKEmUwmFi9ejNlsJi0tDb1ejyAIKIrCtWvXEEWRYDBITEwMNpsNk8lEdHQ0Ho+HsLy8PD744ANGmMI/icQIW7JkCfHx8WRkZKBWqwkEApw8eZKdO3cSCAToKzs7myeffBK73Y7NZkOj0TBnzhxOnz5NR0cH44HECLJYLGRmZmK321Gr1dy8eZOtW7fidrt55JFHePbZZzGZTMiyzMmTJ/nFL35BSUkJa9euJT8/n/j4eAKBAHl5eVRUVDAeSIyg2bNnk5qaikajwe/3s379esxmM4cOHSIhIYFDhw5x4cIFNBoNjz76KCdOnKC8vJzf/OY3hBUWFpKUlER6ejrjhcQISkpKwmw2I0kSO3fuJBAIcPDgQY4cOcKGDRvo64033iA3N5cdO3bg9/t5/fXXmTZtGlarlczMTEwmEx0dHYx1IiMoOTkZURRpaWnh2LFj/PKXv+Tq1ats2LABQVCRmPAIqSlrSEl+kmjjNI4fP05JSQnPP/88YUePHkUURUwmEwaDgfFAZATp9XrCPB4PYQUFBWzZsoUwW2IR0cap6LRJ6HWpWC1L0OsncuDAAdrb21m1ahUulwtJktBqtWg0GsYDiREkSRJhV65cIUyv11NXV4ckxWIw2OlLFDXEmubi9zdz6dIlli1bxrvvvovH48FsNqNSqRhBAv+fwldAZBRIkkSYXq8nTBAE+iMIKsI6OzvRaDSE9fT0EKZWqxkPREZQIBAgLD4+nrCOjg5sNhvBYBtdXZ/Tl6LI3Lp1mrDp06fz4YcfEpacnExYR0cH44HICLp58yZhqamphNXW1rJ161bCPr9+CL//KrLcTXewjbb2Gm57G5k6dSpWq5U333yTZcuWIcsy7e3ttLa2Mh6IjKDKykrCMjMzmTVrFiUlJcybN48XXniBrm4PLe7dXL7yKp9e3c7Ntj9js9l4++232b17N4FAgPz8fEKhEM3NzYwXEiOosbGRxsZGpkyZwpo1a/jhD3/ImjVr2LlzJ0uWLOHVV1/l+PHjJCcns3btWpYvX05FRQU//elPWbVqFXa7ne7ubg4cOMBXYBZDc5t/gMQI27t3L+vXryc5OZlt27bx8ssvM3fuXDZt2oTT6cRqtdLe3o7b7ebpp5+mrq6OFStWsHLlSnp6eqipqeHs2bN8Ber5CkiMsLNnz3Lw4EEee+wxMjIyKCsrY8+ePWzcuJFIZrOZH/3oR8ycOZOw8+fPs337dsYTiVGwd+9evF4vjz/+OHFxcbz44ousWrUKRVFoaWkhMTERWZZJS0ujp6eHsNOnT/PKK68QDAYZTyRGyfvvv099fT2rV69mxowZWCwWwqxWK3f09PTQ0tLChx9+yHvvvcd4JDGKWlpa+PnPf05sbCwLFy5k8uTJaLVawtxuNzU1NTQ2NjKeSXwF2tvb2b9/P19HIveNKpH7RpXIfaNKoh/f+973eOqppxjrUlNT+WeT6MeCBQu4b2T8L04M7z+JXmS3AAAAAElFTkSuQmCC"
  },
  {
    "width": 44,
    "height": 37,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 22,
    "height": 19,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAATCAYAAACUef2IAAAAAklEQVR4AewaftIAAAMdSURBVKXBX0hrdQDA8e9vZ+eys+bUbIrYnBtDCZxgQg4hqYTR7lPiXjRKEG7XB+lh9JAUlPUSYg+CBEItsF58qDvwUZlPU0mXCNPd6x9k4tXQq2deBse5eU5KBjI0rrfPR/DyWnt7ex94PB63qqrnyWRydWZmZgR4ygXBS6ivr/82EAh8GgwG7WdnZxwdHVEoFNjd3d2LRqNfJpPJnyXuqKamZqChoeEbTdOsXq8XWZbRNA2TyURZWVlJbW3t27Ozs/MSd+TxeH5SFKVakiQ0TcPj8aBpGpesVit1dXWK0+l8zczdlMuyXJ/L5cjlcjidToLBIPl8nng8zvn5OZdcLpfPzN28LoS4x5Xm5mZkWUaWZY6Pj4nFYlzKZDKvmLmBYRj3AQHoQBXwuxDiOfDEMIwsYLNYLMTjcfx+P0IIWltb0XWdqakpDg4OVIkihmG8n81mf4xEIg8XFxc/zOfzH1gslreGh4d/HRoaKjgcjvuVlZW1FouFQCCAoijouo4sy7jdbvx+P7FYbEpwwTCMB0tLS1/oui5ZrdaStbW1Ul3XcbvdrK+vs7KyQjgc/iuVShXsdrtpbGysrLq62trX14fJZMJqtSJJEoZhMDc3t9HV1fWOZBjGe8vLyz+Mjo7WNDU12UdGRiw+nw9VVbkkhGBhYYF0Om2rqKiwj4+PlwwODu5ns9mD8vLyCkVRkCSJw8PD8/n5+T+6u7s/AR4LwzC+np6e/mpzc5MX5XA4CIVC3wkhWltaWt49PT1ldXX1M+B7rpiBnWQySTgc5l9CCPx+P4qikEql2N/f57qBgQFCoRAXColEgisq15i5QX9/P16vF13X6ejoIBKJsLW1xXWTk5MB4FVuYaKIz+fD5XLx7NkRe3sH5PN5AoEAxba3t98E6riFiSJVVVXYbDZ+mXjMo980MpkMpaWlFGtvb38E/MktzBTZ2NhAVVU++vgNTk8L2Gz32NnZoVhbW9sTYB045h97XGOmSDqdJpFI0NjYiKJInJycMDExwS0+5xZmbhCNRolGo/wfZuBpT0/PdGdnJy9KlmUubPIf/gYL5Ddev67PiAAAAABJRU5ErkJggg=="
  },
  {
    "width": 11,
    "height": 10,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAAklEQVR4AewaftIAAAE7SURBVHXBQUvCUAAH8L9Ph3vk6uFpwQ7tsA7pCN4n6BJBnneK7oaQt44FQewD7BtE4T3oEgyhTp5kHRTB3ghhMEoPS2mT0nZQiMjfL4MVDMPYr9VqF7Isa8Ph8KXRaJxlsYJpmveFQoHrus4opTrnfJfgf5vT6XRbURRYlgVJkhBF0U4WC+Px+NIwjHPbtg+DILiO4/hU0zTKOQdjDEKIMNPtdu1er3cymUzWKKW5fr+PUqn0EQTBl6qqcrlcpnEcR57nXeV8399zXXcDqXw+jyRJMBgMlGKxiNlsdluv14+EEMcA7kgYht+O42A0GkFR1jGfz+E4DtrtNjzPOxBCIJUgRbDAGEOn8wZJkrBkmuYDgFcAn0gRLDSbTRDyjlarhaVqteoC2ALwiFSuUqnc+L7/hD8IIUg945cfnUV6/egJFNIAAAAASUVORK5CYII="
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