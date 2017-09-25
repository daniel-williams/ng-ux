import { StudyStep } from './StudyStep';


export class StudyGroup {
  public title: string;
  public studySteps: StudyStep[];

  constructor(title: string, studySteps: StudyStep[] = []) {
    this.title = title;
    this.studySteps = studySteps;
  }
}
