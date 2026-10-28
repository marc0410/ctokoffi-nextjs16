'use client';
import type { ElementType } from 'react';
export function KineticText({
  children,
  className = '',
  as: Tag = 'h2',
}: {
  children: string;
  className?: string;
  as?: ElementType;
}) {
  const lines = typeof children === 'string' ? children.split('\n') : [];
  return (
    <Tag className={'kinetic-title ' + className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="kinetic-line" aria-hidden="true" key={i}>
          {line.split(' ').map((word, j) => (
            <span className="word-clip" key={j}>
              <span className="kinetic-word">{word}&nbsp;</span>
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
