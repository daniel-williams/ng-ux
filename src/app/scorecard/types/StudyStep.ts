import {
  DimensionType,
  StepType,
  TaskType,
  ExperienceType,
} from './enums';

import {
  AssociativeResponse,
  CompletedResponse,
  GradedResponse,
} from './Responses';


export class StudyStep {
  public id: number;
  public type: StepType;
  public responseType: CompletedResponse | GradedResponse | AssociativeResponse | null;
  public description: string[];

  public experienceType: ExperienceType;
  public taskType: TaskType;
  public dimensionType: DimensionType;
}
