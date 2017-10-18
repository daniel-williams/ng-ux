import {
  ExperienceType,
  AssociativeResponse,
  CompletedResponse,
  GradedResponse,
  NVPair,
  NBPair,
} from '../../../scorecard/types';


export class ExperienceTypes {
  public static Search  = new ExperienceType(1, 'Search', 'Search / Navigation');
  public static Tabs = new ExperienceType(2, 'Tabs', 'Tab Management');
  public static Favorites = new ExperienceType(3, 'Favorites');
  public static NewTabPage = new ExperienceType(4, 'NTP', 'New Tab Page');
  public static Appearance = new ExperienceType(5, 'Appearance');
}

export const yesNoMaybeResponse = new CompletedResponse([
  new NVPair("Yes", 1),
  new NVPair("No", -1),
  new NVPair("Maybe", 0),
]);
export const timeOnTaskResponse = new GradedResponse([
  new NVPair("Much longer than I expected", 1),
  new NVPair("Somewhat longer than I expected", 2),
  new NVPair("About as I expected", 3),
  new NVPair("Somewhat faster than I expected", 4),
  new NVPair("Much faster than I expected", 5),
]);
export const agreementResponse = new GradedResponse([
  new NVPair("Strongly disagree", 1),
  new NVPair("Somewhat disagree", 2),
  new NVPair("Neutral, neither agree or disagree", 3),
  new NVPair("Somewhat agree", 4),
  new NVPair("Strongly agree", 5),
]);
export const satisfactionResponse = new GradedResponse([
  new NVPair("Very dissatisfied", 1),
  new NVPair("Somewhat dissatisfied", 2),
  new NVPair("Neither satisfied nor dissatisfied", 3),
  new NVPair("Somewhat satisfied", 4),
  new NVPair("Very satisfied", 5),
]);
export const desirableResponse = new AssociativeResponse([
  new NBPair("Calm", true),
  new NBPair("Creative", true),
  new NBPair("Cutting-edge", true),
  new NBPair("Exciting", true),
  new NBPair("Familiar", true),
  new NBPair("Fresh", true),
  new NBPair("Impressive", true),
  new NBPair("Innovative", true),
  new NBPair("Inspiring", true),
  new NBPair("Professional", true),
  new NBPair("Trustworthy", true),

  new NBPair("Boring", false),
  new NBPair("Complicated", false),
  new NBPair("Intimidating", false),
  new NBPair("Old", false),
  new NBPair("Unprofessional", false),
]);