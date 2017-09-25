export class FeedbackCardData {
  username: string;
  verbatim: string;
  videoPoster: string;
  videoUrl: string;
  videoOffset: number;
  videoDuration: number;
  scores: { name: string, value: number }[];
  scoreAverage?: number;
  terms: { name: string, isPositive: boolean }[];
  new: boolean;

  constructor() {
    this.new = true;
  }
}
