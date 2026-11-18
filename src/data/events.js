export const CATEGORIES = ["All", "Academic", "Cultural", "Sports", "Career"];

export const EVENTS = [
  {
    id: "1",
    title: "Freshers Welcome 2026",
    category: "Cultural",
    date: "Dec 5, 2026",
    time: "6:00 PM",
    venue: "Main Auditorium",
    organizer: "Student Union",
    seats: 300,
    description:
      "Welcome the new batch with music, dance and games. Open to all students.",
  },
  {
    id: "2",
    title: "Hackathon 24H",
    category: "Academic",
    date: "Dec 8, 2026",
    time: "9:00 AM",
    venue: "Computer Lab 3",
    organizer: "Faculty of Computing",
    seats: 80,
    description:
      "Build a solution to a real campus problem in 24 hours. Prizes for the top 3 teams.",
  },
  {
    id: "3",
    title: "Inter-Faculty Cricket",
    category: "Sports",
    date: "Dec 10, 2026",
    time: "3:00 PM",
    venue: "University Ground",
    organizer: "Sports Council",
    seats: 500,
    description:
      "Faculties compete for the annual cricket trophy. Come and cheer for your faculty.",
  },
  {
    id: "4",
    title: "Career Fair",
    category: "Career",
    date: "Dec 12, 2026",
    time: "10:00 AM",
    venue: "Exhibition Hall",
    organizer: "Career Guidance Unit",
    seats: 400,
    description:
      "Meet 30+ companies hiring interns and graduates. Bring printed copies of your CV.",
  },
  {
    id: "5",
    title: "AI & ML Workshop",
    category: "Academic",
    date: "Dec 14, 2026",
    time: "1:30 PM",
    venue: "Lecture Hall B",
    organizer: "AI Society",
    seats: 60,
    description:
      "A hands-on introduction to machine learning with Python. Bring your laptop.",
  },
  {
    id: "6",
    title: "Cultural Night",
    category: "Cultural",
    date: "Dec 18, 2026",
    time: "7:00 PM",
    venue: "Open Air Theatre",
    organizer: "Arts Circle",
    seats: 350,
    description:
      "An evening of traditional dance, drama and live music by students.",
  },
  {
    id: "7",
    title: "Football Finals",
    category: "Sports",
    date: "Dec 20, 2026",
    time: "4:30 PM",
    venue: "Football Field",
    organizer: "Sports Council",
    seats: 450,
    description: "The final match of the university football league.",
  },
  {
    id: "8",
    title: "CV Writing Clinic",
    category: "Career",
    date: "Dec 22, 2026",
    time: "11:00 AM",
    venue: "Room 204",
    organizer: "Career Guidance Unit",
    seats: 40,
    description: "Get one-to-one feedback on your CV from industry mentors.",
  },
];

const CATEGORY_IMAGES = {
  Academic: require("../assets/images/academic.jpg"),
  Cultural: require("../assets/images/cultural.jpg"),
  Sports: require("../assets/images/sports.jpg"),
  Career: require("../assets/images/career.jpg"),
};

const EVENT_IMAGES = {
  "2": require("../assets/images/hackathon.jpg"),
};

export const getImage = (event) =>
  EVENT_IMAGES[event.id] || CATEGORY_IMAGES[event.category];