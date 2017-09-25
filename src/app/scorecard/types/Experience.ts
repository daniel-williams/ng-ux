import { ExperienceType } from './enums';


interface ITopIssue {
  label?: string;
  description: string;
}

interface IExperience {
  name: ExperienceType;
  summary: string;
  insights?: string[];
  topIssues?: ITopIssue[];
}

export class Experience {
  public name: ExperienceType;
  public summary: string;
  public insights: string[];
  public topIssues: ITopIssue[];

  constructor(data: IExperience) {
    this.name = data.name;
    this.summary = data.summary;
    this.insights = data.insights || [];
    this.topIssues = data.topIssues || [];
  }
}
