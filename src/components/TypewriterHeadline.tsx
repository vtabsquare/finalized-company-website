import React, { useState, useEffect } from 'react';

interface Headline {
  lines: [string, string];
  gradientWords: string[];
}

interface TypewriterHeadlineProps {
  headlines: Headline[];
  renderLineWords: (line: string, gradientWords: string[]) => React.ReactNode;
}

const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = React.memo(({ headlines, renderLineWords }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentHeadline = headlines[headlineIndex];
  const fullText = currentHeadline.lines.join('\n');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex(prev => prev - 1), 18);
      } else {
        setIsDeleting(false);
        setHeadlineIndex(prev => (prev + 1) % headlines.length);
      }
    } else if (charIndex < fullText.length) {
      timeout = setTimeout(() => setCharIndex(prev => prev + 1), Math.random() * 35 + 18);
    } else {
      timeout = setTimeout(() => setIsDeleting(true), 3200);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, headlineIndex, fullText.length, headlines.length]);

  const displayedLines = currentHeadline.lines.map((line, lineIdx) => {
    const lineStart = lineIdx === 0 ? 0 : currentHeadline.lines[0].length + 1;
    const charsIntoLine = Math.max(0, charIndex - lineStart);
    return line.slice(0, Math.min(charsIntoLine, line.length));
  });

  const activeLineIndex = charIndex <= currentHeadline.lines[0].length ? 0 : 1;

  return (
    <h1 className="text-[1.85rem] sm:text-[2.65rem] md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-black tracking-[-0.03em] leading-[1.12] sm:leading-[1.1] text-white">
      {displayedLines.map((line, lineIdx) => (
        <span key={`${headlineIndex}-line-${lineIdx}`} className="block">
          {line.length > 0 && renderLineWords(line, currentHeadline.gradientWords)}
          {lineIdx === activeLineIndex && (
            <span
              className="hero-cursor inline-block w-[3px] h-[0.82em] bg-cyan-400 ml-1 align-[-0.08em]"
              aria-hidden="true"
            />
          )}
        </span>
      ))}
    </h1>
  );
});

export default TypewriterHeadline;
