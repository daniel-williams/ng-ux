

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

  appIcon = <any>'App Icon',
  overflowMenu = <any>'Overflow Menu',
  buttons = <any>'Buttons',
  layout = <any>'Layout',
}

export enum ExperienceType {
  na = <any>null,
  favorites = <any>'Favorites',
  tabManagement = <any>'Tabs',
  appearance = <any>'Appearance',
  newTabPage = <any>'NTP',
  searchAndNavigation = <any>'Search'
  // na = <any>null,
  // favorites = <any>'Favorites',
  // tabManagement = <any>'Tab Management',
  // appearance = <any>'Appearance',
  // newTabPage = <any>'New Tab Page',
  // searchAndNavigation = <any>'Search / Navigation'
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
  impressions = <any>'Impressions',
  topSites = <any>'Top sites',
  findNews = <any>'Find news',
  checkWeather = <any>'Check weather',
  newTabSearch = <any>'New tab search',
  enterUrl = <any>'Enter a URL',
  SearchFromCurrentTab = <any>'Search from current tab',
}
