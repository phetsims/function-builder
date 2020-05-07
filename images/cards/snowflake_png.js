/* eslint-disable */
import simLauncher from '../../../joist/js/simLauncher.js';
const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAACCCAYAAACTpDweAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDM3RDI1MEQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRDM3RDI1MUQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZEMzdEMjRFRDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZEMzdEMjRGRDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BLLpWwAAFnNJREFUeNrsXQmY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';
export default image;