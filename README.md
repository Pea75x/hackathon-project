# Hacktrack
## Created for Hack Yeah! Hackathon

Over 30% of hackathon participants are first-timers, with limitless potential but overwhelmed by the rapid pace and ambiguity. Juggling ideation and prototyping, testing and pitching - it's easy to fall into time traps.
Time mismanagement is a silent killer of hackathon success. 82% of people report not using any time management strategy, even though effective planners are 53% more likely to succeed academically or professionally.

Enter hacktrack – your smart hackathon guide.

hacktrack is a lightweight time coach built specifically for hackathon teams. Users input their total available time, and hacktrack intelligently suggests time allocations for each stage. Advanced users can customise as they see fit. The countdown begins, with built-in reminders at 50%, 30 minutes, and 5 minutes remaining of each stage, helping teams pace themselves without burning out.and helping teams stay agile, focused, and goal-aligned.

<video src="https://github.com/user-attachments/assets/788e3994-be79-4afc-b07d-29538a9c9f60" height="100" controls></video>

### Implementation
We decided to build hacktrack as a purely frontend application using React. We opted not to include a backend or database to keep the tool lightweight and easy to use during fast-paced hackathons as the current version does not require persistent user data.

Users input their total available time, and hacktrack calculates and displays recommended time allocations across seven structured stages. These default values, stage descriptions, and actionable tips are stored in a JSON file for modularity and easy iteration.

Time input is counted in hours (e.g. 5 hours), and each phase is allocated a percentage (e.g. 0.1 for 10%). We formatted the countdown timer and range inputs to convert an integer into intuitive hours, minutes, and seconds for both the UI and timers.

To visualise time spent and remaining, we used CountdownCircleTimer, a React library that provided a clear, circular timer interface. To trigger start and end sounds for each phase, we made use of the useSound package This offers both visual and auditory feedback.

As we plan to introduce the Performance Journal, we look to implement a backend with a database to support user accounts, session data, and analytics. This will enable future features such as time-spent tracking, team retrospectives, and growth insights across hackathons.

