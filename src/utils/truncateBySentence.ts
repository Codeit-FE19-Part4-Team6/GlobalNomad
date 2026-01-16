export const truncateBySentence = (text: string, maxLen: number) => {
  const t = text.trim();
  if (t.length <= maxLen) {
    return t;
  }

  // 문장 경계: . ! ? … + 한글 종결(다/요/니다)까지 완벽히는 어렵지만, 기본 구두점 기준으로 처리
  // 줄바꿈도 문장 경계로 취급
  const parts = t
    .split(/(?<=[.!?…])\s+|\n+/g) // 문장 끝(구두점) 다음 공백 or 줄바꿈 기준 분리
    .map((s) => s.trim())
    .filter(Boolean);

  let out = '';
  for (const p of parts) {
    const next = out ? `${out} ${p}` : p;
    if (next.length > maxLen) {
      break;
    }
    out = next;
  }

  // 문장 하나도 못 넣을 정도로 첫 문장이 길면, 단어 단위로라도 maxLen 맞춰 자르기
  if (!out) {
    const slice = t.slice(0, maxLen);
    // 마지막 공백 기준으로 잘라서 단어 중간 끊김 완화
    const lastSpace = slice.lastIndexOf(' ');
    const safe = lastSpace > 20 ? slice.slice(0, lastSpace) : slice;
    return safe.trimEnd();
  }

  // 원문보다 짧아졌으면 말줄임표
  return out.length < t.length ? `${out}` : out;
};
