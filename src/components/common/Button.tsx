import { FCC } from '@/utils/react.utils';
import clsx from 'clsx';
import { DetailedHTMLProps } from 'react';

export interface Props extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  intent: 'primary' | 'secondary' | 'warning';
}

export const Button: FCC<Props> = (props) => {
  return (
    <button
      {...props}
      className={clsx('py-2 px-3 rounded-sm', {
        'bg-slate-500 hover:bg-slate-400': props.intent === 'secondary',
      })}>
      {props.children}
    </button>
  );
};
