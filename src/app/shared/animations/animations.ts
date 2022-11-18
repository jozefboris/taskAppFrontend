import { trigger, style, animate, transition, state } from '@angular/animations';

export let  formAnim = trigger('formAnim', [
    transition(':enter, :leave', [
        style({
            opacity: 0,
            transform: 'scale(0.85)'
        }),
        animate('1.2s ease')
    ])
]);

export let list =   trigger('list', [
    state('in', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'scale(0.85)'
      }),
      animate(300)
    ]),
    transition('* => void', [
      animate(1000, style({
        'background-color': 'red',
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ])

  export let addSuccess =  trigger('addSuccess', [
    state('in', style({
      opacity: 0,
      transform: 'translateX(0)'
    })),
    transition('* => void', [
      animate(3000, style({
        'background-color': 'green',
        transform: 'scale(0.85)',
        'font-size': 'large',
        opacity: 0
      }))
    ]),
  ]);