import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
} from '@angular/animations';

export const rubberBand = trigger('rubberBand', [
  transition(
    'inactive => active',
    animate(
      500,
      keyframes([
        style({transform: 'scale3d(1.25, 0.75, 1)', offset: 0.3}),
        style({transform: 'scale3d(0.75, 1.25, 1)', offset: 0.4}),
        style({transform: 'scale3d(1.15, 0.85, 1)', offset: 0.5}),
        style({transform: 'scale3d(0.95, 1.05, 1)', offset: 0.65}),
        style({transform: 'scale3d(0.95, 1.05, 1)', offset: 0.75}),
        style({transform: 'scale3d(1, 1, 1)', offset: 1}),
      ])
    )
  ),
]);
