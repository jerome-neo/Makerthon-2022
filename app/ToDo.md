This is a list of to-dos, in order of priority
Functionalities:

1. Calendar-like function. To integrate with the colouring, so we have a proper coloured mood tracker (J will do this. I will help out as well.)
2. Questionnaire feature & screen <-- remember, needs to assign scoring to each quiz. (Done)
   We store this as a hidden value into
   the calendar feature as well, and keep track of how many days a person is below/edging the threshold.

3. Curate list of resources (S will do this. After S is done, simply add in to the screens)

- Breathing exercises
- Face massage
- Stuff to encourage good mental hygiene

4. Settings screens stuff, which includes:

- Setting a time for notification
- Send feedback button
- About us

5. Services (by Volunteers and UHC)

- Talk to PFA
- Counsellor (hidden)
- Clinical Psych (hidden)

6. Saving on local storage + fetching from local storage

- AsyncStorage?
- Need to save and get back those states. This will be done as soon as mood tracking is done.

7. UI/UX

- Background pictures for screens
- Icons stuff


8. Notifications
- Do this on another app

MISC
... Saving overall app state, and loading on startup

<------------------------------------------------------------ COMPLETED STUFF ------------------------------------------------------------>

1. Colour-based mood changing, mood selection
2. Helplines screen
3. Helplines kinda beautified. More UI updates to come.
4. Screens setup pretty much done

Hidden Screens:

- Questionnaire screen is pretty much done. Left UI/UX updates
  --> Form fillup
  --> Still needs to link to each different screen (Resources, PFA, Counsellor, Psych)

<------------------------------------------------------------ ADDITIONAL STUFF ------------------------------------------------------------>

<---------------------------------------------------------------- POSSIBLE REFACTORING ------------------------------------------------------------------------------>

- Pass Questions and Answers as a prop into QuestionnaireBox
