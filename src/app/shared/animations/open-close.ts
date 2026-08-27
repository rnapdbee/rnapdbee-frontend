import { AnimationCallbackEvent } from '@angular/core';

const DURATION_MS = 50;

/**
 * Animates an element from zero height to its natural (content) height.
 * Intended for use with the `(animate.enter)` template binding.
 */
export function animateOpen(event: AnimationCallbackEvent): void {
  const element = event.target as HTMLElement;
  const targetHeight = element.scrollHeight;
  const animation = element.animate(
    [{ height: '0px' }, { height: `${targetHeight}px` }],
    { duration: DURATION_MS, easing: 'linear' },
  );
  animation.onfinish = () => {
    element.style.height = '';
    event.animationComplete();
  };
}

/**
 * Animates an element from its natural (content) height down to zero.
 * Intended for use with the `(animate.leave)` template binding.
 */
export function animateClose(event: AnimationCallbackEvent): void {
  const element = event.target as HTMLElement;
  const startHeight = element.scrollHeight;
  const animation = element.animate(
    [{ height: `${startHeight}px` }, { height: '0px' }],
    { duration: DURATION_MS, easing: 'linear' },
  );
  animation.onfinish = () => {
    event.animationComplete();
  };
}
