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
  private _scores: { name: string, value: number }[];
  private _scoreAverage: number;
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
    return this._scoreAverage;
  }

  get scores(): { name: string, value: number }[] {
    return this._scores.slice();
  }
  set scores(scores: { name: string, value: number }[]) {
    this._scores = scores;
    this._scoreAverage = this._scores.length
      ? this.formattedScore(this.scores.reduce((total, item) => {
        total += item.value;
        return total;
      }, 0) / this.scores.length, 1)
      : 0;
  }

  formattedScore(num: number, precision: number = 1): number {
    let p = Math.pow(10, precision);

    return num
      ? Math.round(num * p) / p
      : 0;
  }
}
