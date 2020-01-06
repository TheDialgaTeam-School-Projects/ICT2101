#### Table of contents:
1. [Introduction](#1-introduction)
2. [Component Diagram](#2-component-diagram)
3. [Installation Instructions](#3-installation-instructions)
    1. [Development Environment Prerequisite](#31-development-environment-prerequisite)
    2. [Android / iOS Installation](#32-android--ios-installation)
    3. [Cron Jobs Installation](#33-cron-jobs-installation-optional)
4. [Video Demo](#4-video-demo)

# 1. Introduction
In this project, the team is to be able to develop ScrambledTasks a point-to-point mobile navigation application that is compatible with both Android and iOS platforms. The product will help the users to navigate around by finding their first mile last mile (FMLM) routes from their current/proposed location. To entice user to discover new routes in their daily commute, the team will be placing in some game elements to occupy the users from a boring commute. Lastly, this document is to present the System State Diagram with all the test cases and individual members sample unit test plans.

# 2. Component Diagram
![component diagram](img/Component%20Diagram.png)
We have changed our system architecture from MVC architecture to Layered Architecture as it fits the design of our system much more in terms of seperating the presentation layer and having to go through the business layer to reach the data layer.

# 3. Installation Instructions
#### 3.1. Development Environment Prerequisite
You will need an Android device / emulator with Android 9.0 / API Level 28 or newer, [Node 8.3 or newer](https://nodejs.org/en/download/), [Python 2](https://www.python.org/downloads/), [Java SE Development Kit 8 (JDK 8)](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Android Studio](https://developer.android.com/studio/install).

Follow the post installation instructions at: https://facebook.github.io/react-native/docs/getting-started

#### 3.2. Android / iOS Installation
1. Clone this repository: `git clone https://github.com/Infiole/ict2x01-2019t1-team02.git ICT2101`
2. Go into the cloned repository: `cd ICT2101`
3. Execute `npm install`
4. Execute `react-native run-android` for Android Devices or `react-native run-ios` for iOS Devices

\* Do note that you may need to either run a device emulator or plug-in your device before doing step 4.

\* iOS Devices require MacOS and a signing certificate in order to execute. Android can be executed in any operating system.

\** In the event of a build error, delete `/android/app/build/` folder and try again.

You can alternatively install the bundled APK/IPA file onto your device to run the application.

[scrambledTasks.apk](scrambledTasks.apk)

#### 3.3 Cron Jobs Installation (optional)
In order for the cron jobs to work, you will need to install a set of scripts in a dedicated/cloud server or your local development machine. You may need an email server if you want to send emails.

Cron jobs includes the following:
1. Reset daily, weekly and clique tasks on Sun 0000hrs.
2. Send emails to the top 3 winners in the leaderboard.

<hr />

1. Go into `/scripts/` folder
2. Execute `npm install`
3. Setup the cron job to execute `npm run start` in this folder.

# 4. Video Demo
https://youtu.be/MDjH9Jx5XvU

# 5. Undone use cases
1. MAP-03 View All Added Routes 
2. MAP-04 View Added Route
3. MAP-05 Remove Route
4. MAP-06 Add New Routes

Due to API limitations of being unable to track the user accurately to draw a user's custom route, we felt that we could not implement the feature as originally intended in the requirements specifications. As such, we did not implement MAP-06, "Add New Routes" use case. 
Naturally, if there is no source of routes, we will not be able to do the other use cases which details viewing and deleting of routes.

