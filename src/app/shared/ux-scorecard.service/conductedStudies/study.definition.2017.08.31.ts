import {
  AssociativeResponse,
  CompletedResponse,
  DimensionType,
  Experience,
  ExperienceType,
  GradedResponse,
  NVPair,
  NBPair,
  StepType,
  Study,
  StudyStep,
  TaskType,
} from '../../../scorecard/types';

import { studyData } from './study.data.2017.08.31';


const yesNoMaybeResponse = new CompletedResponse([
  new NVPair("Yes", 1),
  new NVPair("No", -1),
  new NVPair("Maybe", 0),
]);
const timeOnTaskResponse = new GradedResponse([
  new NVPair("Much longer than I expected", 1),
  new NVPair("Somewhat longer than I expected", 2),
  new NVPair("About as I expected", 3),
  new NVPair("Somewhat faster than I expected", 4),
  new NVPair("Much faster than I expected", 5),
]);
const agreementResponse = new GradedResponse([
  new NVPair("Strongly disagree", 1),
  new NVPair("Somewhat disagree", 2),
  new NVPair("Neutral, neither agree or disagree", 3),
  new NVPair("Somewhat agree", 4),
  new NVPair("Strongly agree", 5),
]);
const satisfactionResponse = new GradedResponse([
  new NVPair("Very dissatisfied", 1),
  new NVPair("Somewhat dissatisfied", 2),
  new NVPair("Neither satisfied nor dissatisfied", 3),
  new NVPair("Somewhat satisfied", 4),
  new NVPair("Very satisfied", 5),
]);
const desirableResponse = new AssociativeResponse([
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

let experiences: Experience[] = [
  new Experience({
    id: 1,
    name: ExperienceType.searchAndNavigation,
    summary: "Search and navigation experiences are robust in both browsers. The scenario around checking the weather got lower scores for Edge because of the inclusion of the Weather Channel app in the default Top Sites on the New Tab Page.",
    insights: [],
    topIssues: []
  }),
  new Experience({
    id: 2,
    name: ExperienceType.tabManagement,
    summary: "Tab management is an area where Edge received significantly lower scores than Chrome. Both reordering tabs in a window and moving them to a new window were more difficult and less desirable in Edge. Closing tabs was extremely easy in both browsers, although Edge got slightly dinged for including a warning before closing all tabs, which was seen by some users as unnecessary.",
    insights: [],
    topIssues: []
  }),
  new Experience({
    id: 3,
    name: ExperienceType.favorites,
    summary: "Favorites and Bookmarks were highly usable in both Edge and Chrome. However, Favorites in Edge got a lower percentage of positive ratings for desirability, driven by comments that the Favorites UI felt old and complicated.",
    insights: [],
    topIssues: []
  }),
  new Experience({
    id: 4,
    name: ExperienceType.newTabPage,
    summary: "Experiences on the New Tab Page were generally seen as highly usable. Finding news on the NTP was seen significantly more desirable in Edge, but also got low ratings for usefulness across both browsers.",
    insights: [],
    topIssues: []
  }),
  new Experience({
    id: 5,
    name: ExperienceType.appearance,
    summary: "Chrome's icon and layout were significantly more desirable than Edge's, driven by participants who felt the design was creative and professional. However, Edge's menu design was more desirable than Chrome's, driven by users who felt it was professional and calm.",
    insights: [],
    topIssues: []
  })
];

let study = new Study({
  id: 2,
  date: "2017-08-31T00:00:00.000Z",
  title: "August 2017",
  description: "Edge RS3 follow up study",
  insights: [],
  topIssues: [],
  experiences: experiences,
  groups: [
    {
      title: "groupA",
      studySteps: [
        {
          name: "Task 1",
          type: StepType.instruction,
          responseType: null,
          description: [
            "First thing is to get connected to the remote PC.  There are a few steps:",
            "",
            "  1. A website will open, asking for the project name.  Enter \"JuneBrowser\" and submit.",
            "  2. A remote desktop file with a name similar to \"CUE-Browser00_...rdp\" will download.  Open or Run this file. It should launch in Remote Desktop Connection (built into Windows 10.)",
            "  3. You will be prompted to accept an 'unknown connection' to the remote PC.  Don't worry, this is a one-way connection that won't affect your home PC at all. ",
            "  4. When prompted to login, use this password: CUEpassword1",
            "",
            "Click 'Next' once you are connected and signed in (you will be able to see a background of a blue Windows logo.)"
          ],
          experienceType: ExperienceType.na,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 2",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Now that you are logged into the remote PC, go ahead and open up the Edge web browser."
          ],
          experienceType: ExperienceType.na,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 3",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Visit a lasagna recipe site from your Bookmarks.",
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 4",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully visit the site about lasagna?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 5",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to visit a bookmarked site was..."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 6",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "Finding the lasagna recipe bookmark was easy."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 7",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, navigating to a bookmarked site was easy to do."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 8",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Navigating to a bookmarked site worked the way I expected."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 9",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to navigate to a bookmarked site is important to me."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 10",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of opening a bookmark in this browser?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 11",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with opening a bookmarked site in this browser?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 12",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 13",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open all the sites in the Bookmarks folder called \"Interesting Animals\" so that each one is in a different tab. (There should be five total.)",
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 14",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Task 2 of 8:",
            "Open all the sites in the Bookmarks folder called \"Interesting Animals\" so that each one is in a different tab. (There should be five total.)",
            "",
            "If you have any difficulty seeing UI or content in the browser, you may click the 'pin' icon on the remote desktop toolbar to hide it, or move the UserTesting task widget."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 15",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to do this was..."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 16",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to open all the bookmarks in new tabs was easy."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 17",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, opening all the bookmarks in new tabs was easy to do."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 18",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Opening the bookmarks in new tabs worked the way I expected."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 19",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to open bookmarks in new tabs is important to me."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 20",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of opening bookmarks in new tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 21",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with opening bookmarks in new tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 22",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 23",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Change the order of the tabs in the browser so that they are in reverse alphabetical order (Z to A).",
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 24",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully change the order of the tabs?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 25",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to change the order of the tabs was..."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 26",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to change the order of the tabs was easy."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 27",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, changing the order of the tabs was easy to do."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 28",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Changing the order of the tabs worked the way that I expected."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 29",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to change the order of the tabs is important to me."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 30",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of changing the order of tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 31",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with changing the order of tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 32",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 33",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Pull two tabs out from the current window and put them in the same new window as each other."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 34",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to move the tabs to a new window?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 35",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to move the tabs to a new window was..."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 36",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to move the tabs to a new window was easy."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 37",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, moving the tabs to a new window was easy to do."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 38",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Moving the tabs to a new window worked the way that I expected."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 39",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to move tabs to a new window is important to me."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 40",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of moving tabs to a new window in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 41",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with moving a group of tabs to a new window in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 42",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 43",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Close the window that has two tabs in it."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 44",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully close the window?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 45",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to close this window was..."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 46",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to close a browser window was easy."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 47",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, closing a browser window was easy to do."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 48",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Closing a browser window worked the way I expected."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 49",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to close a browser window is important to me."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 50",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of closing a window with multiple tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 51",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with closing a window in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 52",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 53",
          type: StepType.instruction,
          responseType: null,
          description: [
            "In the remaining window, close only two of the tabs, so that one is still open."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 54",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully close two of the tabs?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 55",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to close two of the tabs was..."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 56",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to close individual tabs was easy."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 57",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, closing individual tabs was easy to do."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 58",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Closing individual tabs worked the way I expected."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 59",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to close individual tabs is important to me."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 60",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of closing individual tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 61",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with closing individual tabs in this browser?"
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 62",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.tabManagement,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 63",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Go to a site you typically visit on the web, and add it to your Bookmarks."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 64",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully add a site to your Bookmarks?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 65",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to add a site to your Bookmarks was..."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 66",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to add a site to my Bookmarks was easy."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 67",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, adding a site to my Bookmarks was easy to do."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 68",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Adding a site to my Bookmarks worked the way that I expected."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 69",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to add a site to my Bookmarks is important to me."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 70",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of adding sites to your Bookmarks?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 71",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with adding a site to your Bookmarks in this browser?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 72",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 73",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Create a new folder in your Bookmark list called \"Social Media\" and add these two sites to that folder:",
            "https://www.linkedin.com/",
            "http://www.instagram.com"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 74",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully create a folder of bookmarks?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 75",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to create a folder of bookmarks was..."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 76",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to create a folder of bookmarks was easy."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 77",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, creating a folder of bookmarks was easy to do."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 78",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Creating a folder of bookmarks worked the way that I expected."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 79",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to create a folder of bookmarks is important to me."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 80",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of creating a folder of bookmarks in this browser?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 81",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with creating a folder of bookmarks in this browser?"
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 82",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 83",
          type: StepType.instruction,
          responseType: null,
          description: [
            "That's it for tasks!  Click on the 'x' in the remote desktop app (near the top of your screen) to close your connection and we'll wrap up with just a few more general questions."
          ],
          experienceType: ExperienceType.na,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }
      ] as StudyStep[],
    }, {
      title: "groupB",
      studySteps: [
        {
          name: "Task 1",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Now that you are logged into the remote PC, go ahead and open up the Edge web browser."
          ],
          experienceType: ExperienceType.na,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 3",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes your impressions about..."
          ],
          experienceType: ExperienceType.appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.appIcon,
        }, {
          name: "Task 4",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Click the \"…\" button in the upper right hand corner.  What word best describes the appearance of this content?"
          ],
          experienceType: ExperienceType.appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.overflowMenu,
        }, {
          name: "Task 5",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes the design of the buttons in this browser?"
          ],
          experienceType: ExperienceType.appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.buttons,
        }, {
          name: "Task 6",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes the spacing and layout of this browser?"
          ],
          experienceType: ExperienceType.appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.layout,
        }, {
          name: "Task 7",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about why you gave the answers you did."
          ],
          experienceType: ExperienceType.appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 8",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open up a new tab in this browser, and use it to access a frequently visited site (for example, Twitter)."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 9",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully use the new tab to get to the site that you wanted?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 10",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to a frequently visited site from a new tab was..."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 11",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to get to a frequently visited site from a new tab was easy."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 12",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once you found how to do this, getting to a frequently visited site from a new tab was easy."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 13",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Getting to a frequently visited site from a new tab worked the way I expected."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 14",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to get to a frequently visited site from a new tab is important to me."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 15",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of using a new tab to get to a frequently visited site in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 16",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with using a new tab to get to a frequently visited site in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 17",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 18",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab and use it to check the latest news about technology."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 19",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find the latest news about technology in a new tab?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 20",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to the latest news about technology from a new tab was..."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 21",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to get to the latest news about technology from a new tab was easy."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 22",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once  you found how to do this, getting the latest news about technology from a new tab was easy to do."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 23",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Getting the latest news about technology from a new tab worked the way I expected it to."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 24",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to get to the latest news about technology from a new tab is important to me."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 25",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of finding the latest news about technology in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 26",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with finding the latest news about technology in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 27",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 28",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab, and use it to check the weather in Shanghai."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 29",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to open a new tab and check the weather in Shanghai?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 30",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to check the weather in Shanghai was..."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 31",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to check the weather in Shanghai in a new tab was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 32",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once you found how to do this, checking the weather in Shanghai from a new tab was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 33",
          type: StepType.question,
          responseType: 'agreementScale',
          description: [
              "Checking the weather in Shanghai in a new tab worked the way I expected."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 34",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Being able to check the weather in a new tab is important to me."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 35",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of checking the weather in Shanghai in a new tab in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 36",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with checking the weather in Shanghai in a new tab in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 37",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 38",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab, and search for the age of the oldest tree in the world."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 39",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find the age of the oldest tree?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 40",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to search for this information was..."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 41",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to search the web from a new tab was easy."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 42",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, searching the web from a new tab was easy."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 43",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Searching the web from a new tab worked the way I expected."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 44",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to search the web from a new tab is important to me."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 45",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of searching the web in a new tab in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 46",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with searching the web in a new tab in this browser?"
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 47",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.newTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 48",
          type: StepType.instruction,
          responseType: null,
          description: [
            "In a new tab, use the Address Bar to go directly to www.outsideonline.com"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 49",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully go directly to the site?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 50",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to a site using the Address Bar was..."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 51",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to go directly to a site using the Address Bar was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 52",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, going directly to a site using the Address Bar was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 53",
          type: StepType.question,
          responseType: 'agreementScale',
          description: [
            "Going directly to a site using the Address Bar worked the way I expected."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 54",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to go directly to a site using the Address Bar is important to me."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 55",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of going directly to a website using the Address Bar in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 56",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with getting to a site using the Address Bar in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 57",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 58",
          type: StepType.instruction,
          responseType: null,
          description: [
            "Using the *current* tab, search for a review of the latest Honda CR-V."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.na,
        }, {
          name: "Task 59",
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find a review of the latest Honda CR-V?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.accessible,
        }, {
          name: "Task 60",
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to search the web from your current tab was..."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.ease,
        }, {
          name: "Task 61",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Please rate to what extent you agree or disagree with the following statements:",
            "",
            "Finding how to search the web from an existing tab was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.findable,
        }, {
          name: "Task 62",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, searching the web from an existing tab was easy."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.usable,
        }, {
          name: "Task 63",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Searching the web form an existing tab worked the way I expected."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.predictable,
        }, {
          name: "Task 64",
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to search the web from an existing tab is important to me."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.useful,
        }, {
          name: "Task 65",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of searching the web from an existing tab in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.desirable,
        }, {
          name: "Task 66",
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with searching the web from an existing tab in this browser?"
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.satisfaction,
        }, {
          name: "Task 67",
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceType.searchAndNavigation,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.feedback,
        }, {
          name: "Task 68",
          type: StepType.instruction,
          responseType: null,
          description: [
            "That's it for tasks!  Click on the 'x' in the remote desktop app (near the top of your screen) to close your connection and we'll wrap up with just a few more general questions."
          ],
          experienceType: ExperienceType.na,
          taskType: TaskType.na,
          dimensionType: DimensionType.na
        }
      ] as StudyStep[]
    }
  ],
  data: studyData,
  responses: [
    desirableResponse,
    yesNoMaybeResponse,
    timeOnTaskResponse,
    agreementResponse,
    satisfactionResponse,
  ]
});

export default study;
