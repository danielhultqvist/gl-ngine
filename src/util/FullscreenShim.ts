export function goFullscreen(element: HTMLElement) {
  const tmpElement: any = element;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (tmpElement.mozRequestFullScreen) {
    tmpElement.mozRequestFullScreen();
  } else if (tmpElement.msRequestFullscreen) {
    tmpElement.msRequestFullscreen();
  }
}
