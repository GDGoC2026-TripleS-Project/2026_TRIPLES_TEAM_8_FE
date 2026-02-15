export interface OnboardingResult {
  readerType: string;
  readerTitle: string;
  descriptionLines: string[];
  recommendedCategoryCode: number;
}

export const mockOnboardingResult: OnboardingResult = {
  readerType: "TYPE_B",
  readerTitle: "사유 감상형",
  descriptionLines: [
    "느낀 감정을 쉽게 놓치지 않는 독자예요.",
    "읽는 순간의 감정도 중요하지만,",
    "책을 덮은 뒤에도 생각이 이어지는 글에 끌려요.",
  ],
  recommendedCategoryCode: 3,
};
