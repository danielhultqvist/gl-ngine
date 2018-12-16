import {Log} from "./Log";

export function goFullscreen(element: HTMLElement) {
  Log.log("Going into fullscreen");
  const tmpElement: any = element;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (tmpElement.mozRequestFullScreen) {
    tmpElement.mozRequestFullScreen();
  } else if (tmpElement.webkitRequestFullScreen) {
    tmpElement.webkitRequestFullScreen();
  } else if (tmpElement.msRequestFullscreen) {
    tmpElement.msRequestFullscreen();
  }
}
