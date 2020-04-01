/* eslint-disable */
const img = new Image();
window.phetImages.push( img );
img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACiCAYAAAC3U2j9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRkIzN0Y0RkQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRkIzN0Y1MEQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJGQjM3RjRERDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJGQjM3RjRFRDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+41zvTgAALJ5JREFUeNrsfQu4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';
export default img;
