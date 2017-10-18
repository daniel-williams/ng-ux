import { ExperienceType } from './enums';


interface ITopIssue {
  label?: string;
  description: string;
}

interface IExperience {
  type: ExperienceType;
  summary: string;
  insights?: string[];
  topIssues?: ITopIssue[];
}

export class Experience {
  public type: ExperienceType;
  public summary: string;
  public insights: string[];
  public topIssues: ITopIssue[];

  constructor(data: IExperience) {
    this.type = data.type;
    this.summary = data.summary;
    this.insights = data.insights || [];
    this.topIssues = data.topIssues || [];
  }
}
