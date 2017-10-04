import { Experience } from './Experience';
import { StudyGroup } from './StudyGroup';
import { GradedResponse, CompletedResponse, AssociativeResponse } from './Responses';


interface IStudy {
  id: number;
  date: Date | string;
  title: string;
  description?: string;
  insights?: string[];
  topIssues?: string[];
  experiences?: Experience[];
  groups?: StudyGroup[];
  data?: any;
  responses?: (GradedResponse | CompletedResponse | AssociativeResponse)[];
}

export class Study {
  public id: number;
  public date: Date | string;
  public title: string;
  public description: string;
  public insights: string[];
  public topIssues: string[];
  public experiences: Experience[];
  public groups: StudyGroup[];
  public data: any;
  public responses: (GradedResponse | CompletedResponse | AssociativeResponse)[];

  constructor(data: IStudy) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description || data.title;
    this.insights = data.insights || [];
    this.topIssues = data.topIssues || [];
    this.experiences = data.experiences || [];
    this.groups = data.groups || [];
    this.data = data.data || {};
    this.responses = data.responses || [];
  }
}
