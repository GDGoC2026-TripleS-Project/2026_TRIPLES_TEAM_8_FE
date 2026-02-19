export type OnboardingRequest = {
  nickname: string;
  readerType: string;
  preferenceTags: string;
};

export type OnboardingResponse = {
  status: number;
  success: boolean;
  code: string;
  message: string;
  data: {
    readerType: string;
    readerTitle: string;
    descriptionLines: string[];
    recommendedCategoryCode: number;
  };
};
