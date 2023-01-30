'use client';

import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import useStickyElement from '../hooks/useStickyElement';

// Challenge [Sticky Element] : Options 1: Use HTML/CSS only
// import './sidebar.css';

export default function Sidebar({ children }: PropsWithChildren) {
  const ref = useRef<HTMLElement>(null) as MutableRefObject<HTMLElement>;

  // Challenge [Sticky Element] : Options 2: Use direct DOM handling
  useStickyElement({
    el: ref, // ref.current : HTMLElement => ref : MutableRefObject<HTMLElement> (I)
    top: 121,
  });

  // (I) :
  // Passing ref.current to the hook pass null(value) not the ref(reference&).
  // Because ref is changed after the first render, (in useEffect).

  return (
    <aside ref={ref} className="sidebar sticky" style={{ height: '100%' }}>
      {children}
    </aside>
  );
}
