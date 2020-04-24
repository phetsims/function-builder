/* eslint-disable */
import SimLauncher from '../../../joist/js/SimLauncher.js';
const image = new Image();
const unlock = SimLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4QThFMTc5MkQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4QThFMTc5M0Q3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhBOEUxNzkwRDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhBOEUxNzkxRDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HGM8MQAABhVJREFUeNrsnX2s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';
export default image;