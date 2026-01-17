export const truncateByChar = (text: string, limit = 13) => {
  if (!text) {
    return '';
  }

  const chars = Array.from(text);
  let count = 0;
  let result = '';

  for (const char of chars) {
    // 공백은 글자 수에서 제외
    if (char !== ' ') {
      count += 1;
    }

    // limit 초과 시 말줄임
    if (count > limit) {
      return result + '…';
    }

    result += char;
  }

  return result;
};
