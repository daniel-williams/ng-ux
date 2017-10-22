import {
  AssociativeResponse,
  CompletedResponse,
  DimensionType,
  Experience,
  GradedResponse,
  NVPair,
  NBPair,
  StepType,
  Study,
  StudyStep,
  TaskType,
} from '../../../scorecard/types';

import {
  ExperienceTypes,
  agreementResponse,
  desirableResponse,
  satisfactionResponse,
  timeOnTaskResponse,
  yesNoMaybeResponse,
  verbatimResponse,
} from './common.types';
import { studyData } from './study.data.2017.07.07';


// order of experiences will be reflected in the website
let experiences: Experience[] = [
  new Experience({
    type: ExperienceTypes.Search,
    summary: "Search and navigation experiences are robust in both browsers. The scenario around checking the weather got lower scores for Edge because of the inclusion of the Weather Channel app in the default Top Sites on the New Tab Page.",
    insights: [],
    topIssues: []
  }),
  new Experience({
    type: ExperienceTypes.Tabs,
    summary: "Tab management is an area where Edge received significantly lower scores than Chrome. Both reordering tabs in a window and moving them to a new window were more difficult and less desirable in Edge. Closing tabs was extremely easy in both browsers, although Edge got slightly dinged for including a warning before closing all tabs, which was seen by some users as unnecessary.",
    insights: [
      "Tab management is the one area where Chrome's experience was clearly far better than ours. We need to explore what we can do, both in terms of design and performance, to make this a better experience for users.",
    ],
    topIssues: [
      { label: 'Tabs', description: 'Moving tabs between and within windows in Edge is more difficult than in Chrome.' }
    ]
  }),
  new Experience({
    type: ExperienceTypes.Favorites,
    summary: "Favorites and Bookmarks were highly usable in both Edge and Chrome. However, Favorites in Edge got a lower percentage of positive ratings for desirability, driven by comments that the Favorites UI felt old and complicated.",
    insights: [
      "Favorites in Edge were highly usable, but on average were seen as less desirable than Bookmarks in Chrome. We should explore what changes we could make Favorites feel more modern without negatively impacting usability.",
    ],
    topIssues: [
      { label: 'Favorites', description: 'Favorites in Edge are usable, but less desirable than bookmarks in Chrome.' },
    ]
  }),
  new Experience({
    type: ExperienceTypes.NewTabPage,
    summary: "Experiences on the New Tab Page were generally seen as highly usable. Finding news on the NTP was seen significantly more desirable in Edge, but also got low ratings for usefulness across both browsers.",
    insights: [
      "Although participants thought the Newsfeed on the NTP was novel, they gave this scenario very low ratings on Usefulness. We should continue to explore other options for the NTP, such as allowing users to customize the feed or simply using the Bing homepage.",
      "Having app installation links on the NTP by default negatively impacted impressions of the predictability of the NTP, and served as a dead end for users pursuing common tasks (like checking the weather). We should evaluate whether this negative UX impact is worth the extra installs.",
    ],
    topIssues: [
      { label: 'Newsfeed on NTP', description: 'Newsfeed on NTP has low usefulness for most users.' },
      { label: 'Apps on the NTP', description: 'App installation links on the NTP create usability problems for new users and funnel them out of Edge.' },
    ]
  }),
  new Experience({
    type: ExperienceTypes.Appearance,
    summary: "Chrome's icon and layout were significantly more desirable than Edge's, driven by participants who felt the design was creative and professional. However, Edge's menu design was more desirable than Chrome's, driven by users who felt it was professional and calm.",
    insights: [
      "Chrome beats Edge on desirability in some (but not all) areas of Appearance and Personality -- specifically the Icon and Layout of the browser. We need to explore this as part of the larger Edge branding question for RS4/RS5.",
    ],
    topIssues: [
      { label: 'Personality', description: 'Edge’s app icon and layout are less desirable than Chrome’s.' },
    ]
  })
];

let study = new Study({
  id: 1,
  date: "2017-07-07T00:00:00.000Z",
  title: "July 2017",
  description: "Initial study",
  insights: [
    'Across the five core areas we looked at, most experiences in both Edge and Chrome were rated as highly usable and familiar. Chrome received slightly higher ratings overall, but generally by very small margins.'
  ],
  topIssues: [
    `Moving tabs between and within windows in Edge is more difficult than in Chrome`,
    `Newsfeed on NTP has low usefulness for most users. are less desirable than Chrome's.`,
    `App installation links on the NTP create usability problems for new users and funnel them out of Edge. are less desirable than Chrome's.`,
    `Favorites in Edge are usable, but less desirable than bookmarks in Chrome. are less desirable than Chrome's.`,
    `Edge's app icon and loutout are less desirable than Chrome's.`,
  ],
  experiences: experiences,
  groups: [
    {
      title: "groupA",
      studySteps: [
        {
          id: 1,
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
          experienceType: null,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          id: 2,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Now that you are logged into the remote PC, go ahead and open up the Edge web browser."
          ],
          experienceType: null,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          id: 3,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Visit a lasagna recipe site from your Bookmarks.",
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.accessible,
        }, {
          id: 5,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to visit a bookmarked site was..."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.ease,
        }, {
          id: 6,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding the lasagna recipe bookmark was easy."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.findable,
        }, {
          id: 7,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, navigating to a bookmarked site was easy to do."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.usable,
        }, {
          id: 8,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Navigating to a bookmarked site worked the way I expected."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.predictable,
        }, {
          id: 9,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to navigate to a bookmarked site is important to me."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.useful,
        }, {
          id: 10,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of opening a bookmark in this browser?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.desirable,
        }, {
          id: 11,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with opening a bookmarked site in this browser?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 12,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.visitAnExistingFavorite,
          dimensionType: DimensionType.feedback,
        }, {
          id: 13,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open all the sites in the Bookmarks folder called \"Interesting Animals\" so that each one is in a different tab. (There should be five total.)",
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.na,
        }, {
          id: 14,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Task 2 of 8:",
            "Open all the sites in the Bookmarks folder called \"Interesting Animals\" so that each one is in a different tab. (There should be five total.)",
            "",
            "If you have any difficulty seeing UI or content in the browser, you may click the 'pin' icon on the remote desktop toolbar to hide it, or move the UserTesting task widget."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.accessible,
        }, {
          id: 15,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to do this was..."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.ease,
        }, {
          id: 16,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to open all the bookmarks in new tabs was easy."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.findable,
        }, {
          id: 17,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, opening all the bookmarks in new tabs was easy to do."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.usable,
        }, {
          id: 18,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Opening the bookmarks in new tabs worked the way I expected."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.predictable,
        }, {
          id: 19,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to open bookmarks in new tabs is important to me."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.useful,
        }, {
          id: 20,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of opening bookmarks in new tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.desirable,
        }, {
          id: 21,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with opening bookmarks in new tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 22,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.openSitesInMultipleTabs,
          dimensionType: DimensionType.feedback,
        }, {
          id: 23,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Change the order of the tabs in the browser so that they are in reverse alphabetical order (Z to A).",
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.na,
        }, {
          id: 24,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully change the order of the tabs?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.accessible,
        }, {
          id: 25,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to change the order of the tabs was..."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.ease,
        }, {
          id: 26,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to change the order of the tabs was easy."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.findable,
        }, {
          id: 27,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, changing the order of the tabs was easy to do."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.usable,
        }, {
          id: 28,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Changing the order of the tabs worked the way that I expected."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.predictable,
        }, {
          id: 29,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to change the order of the tabs is important to me."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.useful,
        }, {
          id: 30,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of changing the order of tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.desirable,
        }, {
          id: 31,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with changing the order of tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 32,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.reorderTabs,
          dimensionType: DimensionType.feedback,
        }, {
          id: 33,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Pull two tabs out from the current window and put them in the same new window as each other."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.na,
        }, {
          id: 34,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to move the tabs to a new window?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.accessible,
        }, {
          id: 35,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to move the tabs to a new window was..."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.ease,
        }, {
          id: 36,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to move the tabs to a new window was easy."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.findable,
        }, {
          id: 37,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, moving the tabs to a new window was easy to do."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.usable,
        }, {
          id: 38,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Moving the tabs to a new window worked the way that I expected."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.predictable,
        }, {
          id: 39,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to move tabs to a new window is important to me."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.useful,
        }, {
          id: 40,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of moving tabs to a new window in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.desirable,
        }, {
          id: 41,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with moving a group of tabs to a new window in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 42,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.moveTabsToNewWindow,
          dimensionType: DimensionType.feedback,
        }, {
          id: 43,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Close the window that has two tabs in it."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.na,
        }, {
          id: 44,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully close the window?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.accessible,
        }, {
          id: 45,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to close this window was..."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.ease,
        }, {
          id: 46,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to close a browser window was easy."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.findable,
        }, {
          id: 47,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, closing a browser window was easy to do."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.usable,
        }, {
          id: 48,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Closing a browser window worked the way I expected."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.predictable,
        }, {
          id: 49,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to close a browser window is important to me."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.useful,
        }, {
          id: 50,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of closing a window with multiple tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.desirable,
        }, {
          id: 51,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with closing a window in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 52,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeAllTabs,
          dimensionType: DimensionType.feedback,
        }, {
          id: 53,
          type: StepType.instruction,
          responseType: null,
          description: [
            "In the remaining window, close only two of the tabs, so that one is still open."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.na,
        }, {
          id: 54,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully close two of the tabs?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.accessible,
        }, {
          id: 55,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to close two of the tabs was..."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.ease,
        }, {
          id: 56,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to close individual tabs was easy."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.findable,
        }, {
          id: 57,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, closing individual tabs was easy to do."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.usable,
        }, {
          id: 58,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Closing individual tabs worked the way I expected."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.predictable,
        }, {
          id: 59,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to close individual tabs is important to me."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.useful,
        }, {
          id: 60,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of closing individual tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.desirable,
        }, {
          id: 61,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with closing individual tabs in this browser?"
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 62,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Tabs,
          taskType: TaskType.closeSingleTab,
          dimensionType: DimensionType.feedback,
        }, {
          id: 63,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Go to a site you typically visit on the web, and add it to your Bookmarks."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.na,
        }, {
          id: 64,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully add a site to your Bookmarks?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.accessible,
        }, {
          id: 65,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to add a site to your Bookmarks was..."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.ease,
        }, {
          id: 66,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to add a site to my Bookmarks was easy."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.findable,
        }, {
          id: 67,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, adding a site to my Bookmarks was easy to do."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.usable,
        }, {
          id: 68,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Adding a site to my Bookmarks worked the way that I expected."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.predictable,
        }, {
          id: 69,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to add a site to my Bookmarks is important to me."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.useful,
        }, {
          id: 70,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of adding sites to your Bookmarks?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.desirable,
        }, {
          id: 71,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with adding a site to your Bookmarks in this browser?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 72,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.createNewFavorite,
          dimensionType: DimensionType.feedback,
        }, {
          id: 73,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Create a new folder in your Bookmark list called \"Social Media\" and add these two sites to that folder:",
            "https://www.linkedin.com/",
            "http://www.instagram.com"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.na,
        }, {
          id: 74,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully create a folder of bookmarks?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.accessible,
        }, {
          id: 75,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to create a folder of bookmarks was..."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.ease,
        }, {
          id: 76,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to create a folder of bookmarks was easy."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.findable,
        }, {
          id: 77,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once found, creating a folder of bookmarks was easy to do."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.usable,
        }, {
          id: 78,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Creating a folder of bookmarks worked the way that I expected."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.predictable,
        }, {
          id: 79,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to create a folder of bookmarks is important to me."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.useful,
        }, {
          id: 80,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of creating a folder of bookmarks in this browser?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.desirable,
        }, {
          id: 81,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with creating a folder of bookmarks in this browser?"
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 82,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Favorites,
          taskType: TaskType.addingFavoritesToFolder,
          dimensionType: DimensionType.feedback,
        }, {
          id: 83,
          type: StepType.instruction,
          responseType: null,
          description: [
            "That's it for tasks!  Click on the 'x' in the remote desktop app (near the top of your screen) to close your connection and we'll wrap up with just a few more general questions."
          ],
          experienceType: null,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }
      ] as StudyStep[],
    }, {
      title: "groupB",
      studySteps: [
        {
          id: 1,
          type: StepType.instruction,
          responseType: null,
          description: [
            ""
          ],
          experienceType: null,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          id: 2,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Now that you are logged into the remote PC, go ahead and open up the Edge web browser. "
          ],
          experienceType: null,
          taskType: TaskType.na,
          dimensionType: DimensionType.na,
        }, {
          id: 3,
          type: StepType.instruction,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes the icon for this browser?"
          ],
          experienceType: ExperienceTypes.Appearance,
          taskType: TaskType.appIconImpressions,
          dimensionType: DimensionType.desirableAppIcon,
        }, {
          id: 4,
          type: StepType.instruction,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes the design of the buttons in this browser?"
          ],
          experienceType: ExperienceTypes.Appearance,
          taskType: TaskType.buttonsImpressions,
          dimensionType: DimensionType.desirableOverflowMenu,
        }, {
          id: 5,
          type: StepType.instruction,
          responseType: desirableResponse,
          description: [
            "Which of the following words best describes the spacing and layout of this browser?"
          ],
          experienceType: ExperienceTypes.Appearance,
          taskType: TaskType.layoutImpressions,
          dimensionType: DimensionType.desirableButtons,
        }, {
          id: 6,
          type: StepType.instruction,
          responseType: desirableResponse,
          description: [
            "Click the \"…\" button in the upper right hand corner.  What word best describes the appearance of this content?"
          ],
          experienceType: ExperienceTypes.Appearance,
          taskType: TaskType.overflowContentImpressions,
          dimensionType: DimensionType.desirableLayout,
        }, {
          id: 7,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about why you gave the answers you did."
          ],
          experienceType: ExperienceTypes.Appearance,
          taskType: TaskType.impressions,
          dimensionType: DimensionType.feedback,
        }, {
          id: 8,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open up a new tab in this browser, and use it to access a frequently visited site (for example, Twitter)."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.na,
        }, {
          id: 9,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully use the new tab to get to the site that you wanted?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.accessible,
        }, {
          id: 10,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to a frequently visited site from a new tab was..."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.ease,
        }, {
          id: 11,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to get to a frequently visited site from a new tab was easy."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.findable,
        }, {
          id: 12,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once you found how to do this, getting to a frequently visited site from a new tab was easy."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.usable,
        }, {
          id: 13,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Getting to a frequently visited site from a new tab worked the way I expected."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.predictable,
        }, {
          id: 14,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to get to a frequently visited site from a new tab is important to me."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.useful,
        }, {
          id: 15,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of using a new tab to get to a frequently visited site in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.desirable,
        }, {
          id: 16,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with using a new tab to get to a frequently visited site in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 17,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.topSites,
          dimensionType: DimensionType.feedback,
        }, {
          id: 18,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab and use it to check the latest news about technology."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.na,
        }, {
          id: 19,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find the latest news about technology in a new tab?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.accessible,
        }, {
          id: 20,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to the latest news about technology from a new tab was..."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.ease,
        }, {
          id: 21,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to get to the latest news about technology from a new tab was easy."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.findable,
        }, {
          id: 22,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once  you found how to do this, getting the latest news about technology from a new tab was easy to do."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.usable,
        }, {
          id: 23,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Getting the latest news about technology from a new tab worked the way I expected it to."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.predictable,
        }, {
          id: 24,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to get to the latest news about technology from a new tab is important to me."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.useful,
        }, {
          id: 25,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of finding the latest news about technology in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.desirable,
        }, {
          id: 26,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with finding the latest news about technology in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 27,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.findNews,
          dimensionType: DimensionType.feedback,
        }, {
          id: 28,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab, and use it to check the weather in Shanghai."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.na,
        }, {
          id: 29,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to open a new tab and check the weather in Shanghai?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.accessible,
        }, {
          id: 30,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to check the weather in Shanghai was..."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.ease,
        }, {
          id: 31,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to check the weather in Shanghai in a new tab was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.findable,
        }, {
          id: 32,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Once you found how to do this, checking the weather in Shanghai from a new tab was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.usable,
        }, {
          id: 33,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Checking the weather in Shanghai in a new tab worked the way I expected."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.predictable,
        }, {
          id: 34,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
              "Being able to check the weather in a new tab is important to me."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.useful,
        }, {
          id: 35,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of checking the weather in Shanghai in a new tab in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.desirable,
        }, {
          id: 36,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with checking the weather in Shanghai in a new tab in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 37,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.checkWeather,
          dimensionType: DimensionType.feedback,
        }, {
          id: 38,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Open a new tab, and search for the age of the oldest tree in the world."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.na,
        }, {
          id: 39,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find the age of the oldest tree?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.accessible,
        }, {
          id: 40,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to search for this information was..."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.ease,
        }, {
          id: 41,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to search the web from a new tab was easy."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.findable,
        }, {
          id: 42,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, searching the web from a new tab was easy."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.usable,
        }, {
          id: 43,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Searching the web from a new tab worked the way I expected."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.predictable,
        }, {
          id: 44,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to search the web from a new tab is important to me."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.useful,
        }, {
          id: 45,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of searching the web in a new tab in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.desirable,
        }, {
          id: 46,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with searching the web in a new tab in this browser?"
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 47,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.NewTabPage,
          taskType: TaskType.newTabSearch,
          dimensionType: DimensionType.feedback,
        }, {
          id: 48,
          type: StepType.instruction,
          responseType: null,
          description: [
            "In a new tab, use the Address Bar to go directly to www.outsideonline.com"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.na,
        }, {
          id: 49,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully go directly to the site?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.accessible,
        }, {
          id: 50,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to get to a site using the Address Bar was..."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.ease,
        }, {
          id: 51,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to go directly to a site using the Address Bar was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.findable,
        }, {
          id: 52,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, going directly to a site using the Address Bar was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.usable,
        }, {
          id: 53,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Going directly to a site using the Address Bar worked the way I expected."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.predictable,
        }, {
          id: 54,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to go directly to a site using the Address Bar is important to me."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.useful,
        }, {
          id: 55,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of going directly to a website using the Address Bar in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.desirable,
        }, {
          id: 56,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with getting to a site using the Address Bar in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 57,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.enterUrl,
          dimensionType: DimensionType.feedback,
        }, {
          id: 58,
          type: StepType.instruction,
          responseType: null,
          description: [
            "Using the *current* tab, search for a review of the latest Honda CR-V."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.na,
        }, {
          id: 59,
          type: StepType.question,
          responseType: yesNoMaybeResponse,
          description: [
            "Were you able to successfully find a review of the latest Honda CR-V?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.accessible,
        }, {
          id: 60,
          type: StepType.question,
          responseType: timeOnTaskResponse,
          description: [
            "The time it took to search the web from your current tab was..."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.ease,
        }, {
          id: 61,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Finding how to search the web from an existing tab was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.findable,
        }, {
          id: 62,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Once you found how to do this, searching the web from an existing tab was easy."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.usable,
        }, {
          id: 63,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Searching the web form an existing tab worked the way I expected."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.predictable,
        }, {
          id: 64,
          type: StepType.question,
          responseType: agreementResponse,
          description: [
            "Being able to search the web from an existing tab is important to me."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.useful,
        }, {
          id: 65,
          type: StepType.question,
          responseType: desirableResponse,
          description: [
            "What word best describes your experience of searching the web from an existing tab in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.desirable,
        }, {
          id: 66,
          type: StepType.question,
          responseType: satisfactionResponse,
          description: [
            "How satisfied are you with searching the web from an existing tab in this browser?"
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.satisfaction,
        }, {
          id: 67,
          type: StepType.question,
          responseType: verbatimResponse,
          description: [
            "Please share a bit about your experience with this task, and why you gave the ratings you did."
          ],
          experienceType: ExperienceTypes.Search,
          taskType: TaskType.SearchFromCurrentTab,
          dimensionType: DimensionType.feedback,
        }, {
          id: 68,
          type: StepType.instruction,
          responseType: null,
          description: [
            "That's it for tasks!  Click on the 'x' in the remote desktop app (near the top of your screen) to close your connection and we'll wrap up with just a few more general questions."
          ],
          experienceType: null,
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
