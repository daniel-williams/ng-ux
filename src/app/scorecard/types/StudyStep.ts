import {
  DimensionType,
  ExperienceType,
  StepType,
  TaskType,
} from './enums';

import {
  AssociativeResponse,
  CompletedResponse,
  GradedResponse,
} from './Responses';


export class StudyStep {
  public name: string;
  public type: StepType;
  public responseType: CompletedResponse | GradedResponse | AssociativeResponse | null;
  public description: string[];

  public experienceType: ExperienceType;
  public taskType: TaskType;
  public dimensionType: DimensionType;
}
