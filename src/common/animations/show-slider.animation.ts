import {trigger, state, style} from '@angular/animations';

export const showSlider = trigger('showSlider', [state('visible', style({}))]);
