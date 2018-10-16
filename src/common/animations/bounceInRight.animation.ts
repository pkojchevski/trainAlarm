import {
  trigger,
  transition,
  animate,
  keyframes,
  style,
  state,
} from '@angular/animations';

export const bounceInRight = trigger('bounceInRight', [
  state('active', style({transform: 'translate3d(0px, 0px, 0)', opacity: '1'})),
  transition(
    'inactive => active',
    animate(
      '1s cubic-bezier(0.215, 0.61, 0.355, 1)',
      keyframes([
        style({
          opacity: '1',
          transform: 'translate3d(-25px, 0, 0)',
          offset: 0.6,
        }),
        style({
          transform: 'translate3d(10px, 0, 0)',
          offset: 0.75,
        }),
        style({transform: 'translate3d(-5px, 0, 0)', offset: 0.9}),
        style({transform: 'translate3d(0, 0, 0)', offset: 1}),
      ])
    )
  ),
  state(
    'inactive',
    style({transform: 'translate3d(2000px,0,0)', opacity: '0'})
  ),
  transition(
    'active => inactive',
    animate(
      '1s cubic-bezier(0.215, 0.61, 0.355, 1)',
      keyframes([
        style({
          opacity: '1',
          transform: 'translate3d(-20px, 0, 0)',
          offset: 0.2,
        }),
        style({
          opacity: '0',
          transform: 'translate3d(2000px, 0, 0)',
          offset: 1,
        }),
      ])
    )
  ),
]);

// @keyframes bounceInRight {
//   from,
//   60%,
//   75%,
//   90%,
//   to {
//     animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
//   }

//   from {
//     opacity: 0;
//     transform: translate3d(3000px, 0, 0);
//   }

//   60% {
//     opacity: 1;
//     transform: translate3d(-25px, 0, 0);
//   }

//   75% {
//     transform: translate3d(10px, 0, 0);
//   }

//   90% {
//     transform: translate3d(-5px, 0, 0);
//   }

//   to {
//     transform: translate3d(0, 0, 0);
//   }
// }

// .bounceInRight {
//   animation-name: bounceInRight;
// }
