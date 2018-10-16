import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';

export const rotate = trigger('rotate', [
  transition(
    'idle => clicked',
    animate(
      500,
      keyframes([
        style({transform: 'rotate3d(0,0,0,0)', offset: 0}),
        style({transform: 'rotate3d(0,0,0,45)', offset: 1}),
      ])
    )
  ),
]);
