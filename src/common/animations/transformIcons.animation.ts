import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
  state,
} from '@angular/animations';

export const pinIcon = trigger('pinIcon', [
  state(
    'unfocused',
    style({
      display: 'inline-block',
    })
  ),
  state(
    'focused',
    style({
      transform: 'translate3d(0,40px,0)',
      opacity: '0',
    })
  ),
  transition('unfocused <=> focused', animate('300ms ease-in-out')),
]);

export const closeIcon = trigger('closeIcon', [
  state(
    'hide',
    style({
      // display: 'none',
      transform: 'translate3D(0,-40px, 0)',
      opacity: '0',
    })
  ),
  state(
    'show',
    style({
      display: 'inline-block',
      transform: 'translate3D(0,0,0)',
    })
  ),
  transition('hide <=> show', animate('300ms ease-in-out')),
]);
