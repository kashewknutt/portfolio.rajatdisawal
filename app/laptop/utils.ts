import { Boundry } from "./BoundaryClass";
import { Sprite } from "./SpriteClass";

export function collisionCheck({ rect1, rect2 }: { rect1: Sprite, rect2: Boundry }) {
    return (
      rect1!.position.x + rect1!.SingleWidth! >=  rect2.position.x && 
      rect1!.position.x <=  rect2.position.x +  rect2.width! && 
      rect1!.position.y + rect1!.SingleHeight! >=  rect2.position.y && 
      rect1!.position.y <=  rect2.position.y + rect2.height!
    )
}