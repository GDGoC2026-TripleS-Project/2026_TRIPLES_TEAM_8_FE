export const READER_TYPE_MAP: Record<string, string> = {
  "000": "TYPE_A",
  "001": "TYPE_B",
  "010": "TYPE_C",
  "011": "TYPE_D",
  "100": "TYPE_E",
  "101": "TYPE_F",
  "110": "TYPE_G",
  "111": "TYPE_H",
};

export const PREFERENCE_TAG_MAP: Record<string, string> = {
  TYPE_A: "창작",
  TYPE_B: "소설",
  TYPE_C: "시",
  TYPE_D: "창작",
  TYPE_E: "에세이",
  TYPE_F: "비평",
  TYPE_G: "장르",
  TYPE_H: "고전",
};

export function bitToReaderType(bits: number[]): string {
  const key = bits.join("");
  return READER_TYPE_MAP[key];
}
