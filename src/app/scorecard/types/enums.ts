export enum DimensionType {
  na = <any>null,
  accessible = <any>'Accessible',
  ease = <any>'Ease',
  findable = <any>'Findable',
  usable = <any>'Usable',
  predictable = <any>'Predictable',
  useful = <any>'Useful',
  desirable = <any>'Desirable',
  satisfaction = <any>'Satisfaction',
  feedback = <any>'Feedback',

  desirableAppIcon = <any>'App Icon',
  desirableOverflowMenu = <any>'Overflow Menu',
  desirableButtons = <any>'Buttons',
  desirableLayout = <any>'Layout',
}

export enum ResponseType {
  'Completed' = <any>'Completed',
  'Graded' = <any>'Graded',
  'Associative' = <any>'Associative',
}

export enum StepType {
  instruction = <any>'instruction',
  question = <any>'question',
}

export enum TaskType {
  na = <any>null,
  visitAnExistingFavorite = <any>'Visit an existing Favorite',
  openSitesInMultipleTabs = <any>'Open sites in multiple tabs',
  reorderTabs = <any>'Re-order tabs',
  moveTabsToNewWindow = <any>'Move tabs to a new window',
  closeAllTabs = <any>'Close all tabs',
  closeSingleTab = <any>'Close a single tab',
  createNewFavorite = <any>'Create a new Favorite',
  addingFavoritesToFolder = <any>'Adding Favorites to a folder',
  topSites = <any>'Top sites',
  findNews = <any>'Find news',
  checkWeather = <any>'Check weather',
  newTabSearch = <any>'New tab search',
  enterUrl = <any>'Enter a URL',
  SearchFromCurrentTab = <any>'Search from current tab',

  impressions = <any>'Impressions',
  appIconImpressions = <any>'App Icon impressions',
  buttonsImpressions = <any>'Buttons impressions',
  layoutImpressions = <any>'Layout impressions',
  overflowContentImpressions = <any>'Overflow content impressions',
}

export class ExperienceType {
  public id: number;
  public title: string;
  public description: string;

  constructor(id: number, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description || title;
  }
}