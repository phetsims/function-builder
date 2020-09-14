/* eslint-disable */
import simLauncher from '../../../joist/js/simLauncher.js';

const image = new Image();
const unlock = simLauncher.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAACKCAYAAAAuY40QAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRDM3RDI1OEQ3ODkxMUU3QjA1RjhCNkJDQzY2ODUwOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRjExRjM4NkQ3OEExMUU3QjA1RjhCNkJDQzY2ODUwOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZEMzdEMjU2RDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZEMzdEMjU3RDc4OTExRTdCMDVGOEI2QkNDNjY4NTA5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JUoy1QAACeNJREFUeNrsXQm0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';
export default image;