import { useCallback } from 'react';

export const useMessage = () => {
  const el = document.createElement('div');
  el.id = 'snack';
  document.body.appendChild(el);

  return useCallback(
    text => {
      if (text) {
        el.innerText = text;

        setTimeout(() => {
          el.innerText = '';
        }, 3000);
      }
    },
    [el.innerText],
  );
};
