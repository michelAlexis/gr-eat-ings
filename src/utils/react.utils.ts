import { FC, PropsWithChildren } from 'react';
import { AnyObject } from './ts.utils';

export type FCC<P = AnyObject> = FC<PropsWithChildren<P>>;
