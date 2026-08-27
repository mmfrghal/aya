export interface TimelineEvent {
  id: string;
  date: string;
  dateRaw: string;
  title: string;
  subtitle: string;
  daysIntervalText?: string;
  badge?: string;
}

export interface MemoryPhoto {
  id: string;
  title: string;
  caption: string;
  date: string;
  placeholderType: 'firstPhoto' | 'engagementPhoto' | 'katbKetabPhoto' | 'weddingPhoto' | 'wifePhoto';
  imageSrc?: string;
  rotation: number;
}

export interface StoryData {
  husbandName: string;
  wifeName: string;
  tagline: string;
  firstLookDate: string;
  engagementDate: string;
  katbKetabDate: string;
  weddingDate: string;
  currentDate: string;
  firstLookImage?: string;
  durations: {
    firstLookToCurrent: {
      text: string;
      days: string;
    };
    engagementToCurrent: {
      text: string;
      days: string;
    };
    katbKetabToCurrent: {
      text: string;
      days: string;
    };
    weddingToCurrent: {
      text: string;
      days: string;
    };
    firstLookToWedding: {
      days: string;
    };
  };
  loveLetter: {
    salutation: string;
    paragraphs: string[];
    closing: string;
    signatureName: string;
    signatureRole: string;
  };
  audioUrl?: string;
}
