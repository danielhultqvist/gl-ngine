import {RenderContext} from "./RenderContext";

interface Renderable {
  render(renderContext: RenderContext): void;
}

export {Renderable}
