export const friendsData = [
  { id: 1, name: 'Urban Explorers', photo: require('../../../assets/pictures/photo2.png')},
 { id: 2, name: 'Weekend Warriors', photo: require('../../../assets/pictures/circle2.jpg') },
 { id: 3, name: 'Flex Fam', photo: require('../../../assets/pictures/circle3.jpg') },
 { id: 4, name: 'Flex Fam', photo: require('../../../assets/pictures/circle4.png') },
 { id: 5, name: 'Flex Fam', photo: require('../../../assets/pictures/circle5.png') },
 { id: 6, name: 'Flex Fam', photo: require('../../../assets/pictures/circle6.png') },
 { id: 7, name: 'Flex Fam', photo: require('../../../assets/pictures/circle7.png') }, 
];

export const friendEventData = [
  {
    id: 1,
    creator: false,
    photo: require('../../../assets/pictures/circle2.jpg'),
    username: "Darrell Steward",
    name: "Art Exhibition",
    location: "Seoul",
    moderator: true,
    time: "Tues, 24th Jan, 07:00 PM",
    members: "2",
    tags: ["Explore",],
    text: "Join us for a special evening at our art exhibition this Saturday at 7 PM. Celebrate creativity, enjoy beautiful artwork, and share in the joy of artistic expression. Your presence will make the event even more memorable. Looking forward to seeing you there! Warm regards,"
  },
  {
    id: 2,
    attending: true,
    creator: false,
    addNotes: true,
    photo: require('../../../assets/pictures/eventImage2.jpg'),
    username: "Dianne Russell",
    name: "Dinner at Le Blanc",
    location: "Florida",
    time: "Tues, 24th Jan, 07:00 PM",
    members: "5",
    tags: ["Comic", "Comedy_nights",],
    text: "Lets meet up for a relaxed morning of conversations over freshly brewed coffee ! We are also gonna have some special events for y’all"
  },
  {
    id: 3,
    creator: false,
    photo: require('../../../assets/pictures/eventImage3.jpg'),
    username: "Cody Fisher",
    name: "Evening Dining ",
    time: "Tues, 24th Jan, 07:00 PM",
    members: "7",
    tags: ["Book_club", "Fantasy", "Society",],
    text: "Dear Friends,We're hosting a special evening to celebrate Mark's retirement and would love for you to join us! Let's gather at our place this Saturday at 7 PM for a night of delicious food, drinks, and cherished company. We'll toast to Mark's incredible career and new adventures ahead. Your presence would make this celebration truly memorable. Looking forward to an unforgettable night with all of you!"
  },
];