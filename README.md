# UniEvents – University Event Management App

A mobile app built with **React Native**, **Expo** and **Expo Router** (JavaScript). Students can browse campus events, filter them, register, save favourites and get local notifications.

**Author:** Inuri Hansani – FGS/MSC/CS/2025/019
**Module:** Mobile Application Development – Assignment 1

## Demo Video

[Watch the demo video](https://drive.google.com/file/d/1WGXOWYhY0w-SGvEzjtg9MYLDQOuK3LVr/view?usp=sharing)

---

## 1. About the App

**UniEvents** puts all university events in one place: academic workshops, cultural nights, sports finals and career fairs.

**Problem it solves:** Event information is scattered across notice boards, WhatsApp groups and social media, so students miss events or forget the dates. UniEvents lets students:

- See all events in one list and filter them by category.
- Register for events and keep a personal "My Events" list.
- Save favourite events.
- Get notifications as confirmations and timed reminders.

---

## 2. Screens (4)

| #   | Screen            | Route         | Purpose                                                                         |
| --- | ----------------- | ------------- | ------------------------------------------------------------------------------- |
| 1   | **Home**          | `/`           | Lists all events (`FlatList`) with a category filter (`Modal`).                 |
| 2   | **My Events**     | `/myevents`   | Shows registered events. A confirm `Modal` guards "Cancel all".                 |
| 3   | **Profile**       | `/profile`    | Shows student info, stats, the AppState monitor and notification test buttons.  |
| 4   | **Event Details** | `/event/[id]` | Full event info. Register (confirm `Modal`), save, or set a 10-second reminder. |

---

## 3. Core Components Used

| Component                    | Where it is used                                                                    |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `View`, `Text`, `StyleSheet` | All screens                                                                         |
| `Image`                      | Home (card image), Event Details (banner)                                           |
| `Pressable`                  | Buttons and event cards on all screens                                              |
| `FlatList`                   | Home (all events), My Events (registered events)                                    |
| `Modal`                      | Home (filter), Event Details (confirm registration), My Events (confirm cancel all) |
| `ScrollView`, `Alert`        | Event Details                                                                       |
| `AppState`                   | `src/app/_layout.js`                                                                |

---

## 4. Expo Router Structure

```
src/app/
├── _layout.js          Root layout: state provider + AppState listener + Stack
├── (tabs)/             Route group (not shown in the URL)
│   ├── _layout.js      Tab navigator (Events, My Events, Profile)
│   ├── index.js        Home screen
│   ├── myevents.js     My Events screen
│   └── profile.js      Profile screen
└── event/
    ├── _layout.js      Nested Stack (header + back button)
    └── [id].js         Event Details (dynamic route)
```

- `router.push('/event/3')` opens a detail screen, and `router.back()` goes back.
- The header arrow, the Android back button and the modal `onRequestClose` all work.

---

## 5. State Management

Global state uses **React Context + `useState`** (`src/context/EventsContext.js`).

- `registered`: event ids the student joined.
- `saved`: favourite event ids.
- `lastResumed` and `resumeCount`: AppState data.

Registering on the detail screen updates the badge on Home, the list on My Events and the counter on Profile.

---

## 6. AppState

In `src/app/_layout.js`, `AppState.addEventListener('change', ...)` detects when the app goes from **background to foreground**. It then saves the time and increases a counter. Home shows a "Welcome back" message and Profile shows the resume count.

---

## 7. Local Notifications

**How I researched it:**

1. Read the Expo `expo-notifications` documentation and learned that local notifications are scheduled on the device, so no server is needed.
2. Found the main APIs: `requestPermissionsAsync`, `setNotificationHandler` and `scheduleNotificationAsync`.
3. Learned that `trigger: null` fires immediately, while a time-interval trigger fires after N seconds.
4. Tested on a real Android phone. Local notifications work in Expo Go, and the Android channel setup is wrapped in `try/catch` because it can fail there.
5. Replaced the deprecated `shouldShowAlert` option with `shouldShowBanner` and `shouldShowList`.

**Implementation:** `src/utils/notify.js` has `setupNotifications()`, `notifyNow()` and `notifyLater()`.

| Action                    | Notification                          |
| ------------------------- | ------------------------------------- |
| Register for an event     | "Registration confirmed!" (immediate) |
| Save an event             | "Event bookmarked!" (immediate)       |
| "Remind me in 10 seconds" | Reminder (scheduled)                  |
| Cancel all registrations  | "Registrations cancelled" (immediate) |

---

## 8. Hard-Coded Data

`src/data/events.js` has 8 realistic events (for example Freshers Welcome 2026, Hackathon 24H, Inter-Faculty Cricket, Career Fair) in 4 categories, each with a date, time, venue, organiser, seats and description.

---

## 9. Run the Project

**Requirements:** Node.js 22.13 or newer, Git, and the Expo Go app on your phone.

```bash
# Clone
git clone https://github.com/<your-username>/UniEvents.git
cd UniEvents

# Install dependencies
npm install

# Start the app
npx expo start -c
```

Scan the QR code with **Expo Go** (phone and PC on the same Wi-Fi), or press `a` for the Android emulator. Allow notifications when asked.

**If the phone cannot connect (USB option):**

```bash
adb reverse tcp:8081 tcp:8081
npx expo start -c --localhost
```
