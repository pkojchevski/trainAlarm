import {
  trigger,
  transition,
  style,
  keyframes,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const swing = trigger('swing', [
  transition('* => *', [
    // query(':enter', style({opacity: 0}), {optional: true}),
    query(
      ':enter',
      [
        style({opacity: 0}),
        stagger('200ms', [
          animate(
            '500ms cubic-bezier(.36,-0.64,.34,1.76)',
            keyframes([
              style({opacity: 0, transform: 'rotateX(-90deg)', offset: 0}),
              style({opacity: 1, transform: 'rotateX(0)', offset: 1}),
            ])
          ),
        ]),
      ],
      {optional: true}
    ),
    query(
      ':leave',
      [
        stagger('200ms', [
          animate(
            '500ms cubic-bezier(.36,-0.64,.34,1.76)',
            keyframes([
              style({opacity: 1, transform: 'rotateX(0)', offset: 0}),
              style({opacity: 0, transform: 'rotateX(-90deg)', offset: 1}),
            ])
          ),
        ]),
      ],
      {optional: true}
    ),
  ]),
]);
