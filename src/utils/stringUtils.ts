export const truncateByChar = (text: string | undefined, limit = 13) => {
  if (!text) {
    return '';
  }

  const chars = Array.from(text);
  let nonSpaceCount = 0;
  const truncateIndex = chars.findIndex((char) => {
    if (char !== ' ') {
      nonSpaceCount++;
    }
    return nonSpaceCount > limit;
  });

  if (truncateIndex === -1) {
    return text;
  }

  return chars.slice(0, truncateIndex).join('') + '…';
};
