export interface IFeedbackCardData {
  userDetails: {[key: string]: string};
  verbatim?: string;
  videoPoster?: string;
  videoUrl?: string;
  videoOffset?: number;
  videoDuration?: number;
  scores?: { name: string, value: number }[];
  terms?: { name: string, isPositive: boolean }[];
}

export class FeedbackCardData {
  userDetails: {[key: string]: string};
  verbatim: string;
  videoPoster: string;
  videoUrl: string;
  videoOffset: number;
  videoDuration: number;
  scores: { name: string, value: number }[];
  terms: { name: string, isPositive: boolean }[];
  new: boolean;

  constructor(options: IFeedbackCardData) {
    this.userDetails = options.userDetails;
    this.verbatim = options.verbatim;
    this.videoPoster = options.videoPoster;
    this.videoOffset = options.videoOffset;
    this.videoDuration = options.videoDuration;
    this.videoUrl = options.videoUrl;
    this.scores = options.scores || [];
    this.terms = options.terms || [];
    this.new = true;
  }

  get scoreAverage(): number {
    return this.scores.reduce((total, item) => {
      total += item.value;
      return total;
    }, 0);
  }
}
