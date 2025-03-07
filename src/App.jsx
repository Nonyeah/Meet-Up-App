import './App.css'
import React from 'react';
import {useState, useReducer, createContext, useContext} from 'react';

const GroupsContext = createContext(null);
const ReducerContext = createContext(null);

const interests = ["fashionista", "Beauty Industry", "Fitness", "Walking", "Eating & Drinking", "Foodie", "Exercise", "Healthy Living", "Technology Startups", "Skin Care", "Cooking", "Spirituality"];

const topnav = [{id: 0, label: "all", events: [{title:"Mini Golf at Puttshack", time: "13.30 - 16.00 GMT", date: "17th November 2024", address: "Westfield, Ariel Way, White City", }, {title:"Bowling at Park Royal", time: "18.30 - 20.30 GMT", date: "24th November 2024", address: "Park Royal Bowling Club NW10"}, {title:"West end theatre - The Lion King", time: "15.30 - 18.00 GMT", date: "27th November 2024", address: "Drury Lane west end"},
{title:"Ice skating in Westsfield", time: "19.30 - 21.00 GMT", date: "29th November 2024", address: "Westfield, Ariel Way, White City"}, {title:"Winter  at Kew Gardens", time: "13.30 - 16.00 GMT", date: "24th November 2024", address: "Kew Gardens, Richmod"}, {title:"Christmas at Kew", time: "13.30 - 16.00 GMT", date: "17th December 2024", address: "Kew Botanical Gardens - Richmond"},
{title:"Dinner and Drinks  @ The Rum Kitchen Brixton", time: "19.30 - 22.00 GMT", date: "1st December 2024", address: "437 Coldharbour Lane, Brixton"}, {title:"Sunday Lunch at Madison's Rooftop Bar", time: "14.30 - 16.00 GMT", date: "5th December 2024", address: "Rooftop terrace one, New Change, London"}, {title:"Shoreditch Nights", time: "22.00 - 00.00 GMT", date: "10th December 2024", address: "118 Shoreditch High Street, London"},
{title:"Brunch at the Duck and Waffle", time: "12.00 - 14.00 GMT", date: "12th December 2024", address: "110 Bishopsgate London"}, {title:"Friday night dinner at Duck and rice", time: "19.30 - 21.00 GMT", date: "20th November 2024", address: "90 Berwick Street, Soho, London W1F 0QB "}
]}, {id: 1, label: "going", events: [{title:"Weekend away in Brussels", time: "08.00 - 16.00 GMT", date: "17th - 19th November 2024", address: "Bruge"}, {title:"Fine Dining at The Meat & Co", time: "18.30 - 20.30 GMT", date: "21st December 2024", address: "Mayfair London"}, {title:"Brunch at Blixen Spitalfields", time: "12.30 - 14.30 GMT", date: "17th November 2024", address: "65a Brushfield Street LondonE1 6AA"}, {title:"Lunch at the Ivy Chelsea garden", time: "13.30 - 15.30 GMT", date: "22nd November 2024", address: "197 Kings Road Chelsea SW3"},]}, {id: 2, label: "saved", events: [{title:"Cocktails & canapes at 12th Knot rooftop bar", time: "20.00 - 22.00 GMT", date: "14th November 2024", address: "12th Knot Bar, Sea Containers, 20 Upper Ground London"}, {title:"Brunch at Bill's resturant", time: "11.30 - 13.30 GMT", date: "24th November 2024", address: "Westfield, Ariel Way, White City", }]}, {id: 3, label: "past", events: [{title:"Late Night Drinks @ Sabine Rooftop Bar", time: "20.30 - 00.00 GMT", date: "19th September 2024", address: "Sabine Rooftop Bar 10 Godliman Street London"}]}];


const groups = [
  {id: 0, name: "Female Friends London", members: ["Sally", "Julie", "Tina", "Ngozi", "Tami", "Nonye", "Keisha", "Kinga", "Melanie", "Pearl", "Sophia", "Melody"], events: [{title:"Mini Golf at Puttshack", time: "13.30 - 16.00 GMT", date: "17th November 2024", address: "Westfield, Ariel Way, White City", description: "Hey ladies! If you’re free on Friday 19th November, then come along to Puttshack for a round of Mini Golf followed by drinks! The cost is £15pp for a round of Mini Golf and glass of bubbly! The event is open to just 12 members, and RSVP is on a first come first serve basis."}, {title:"Bowling at Park Royal", time: "18.30 - 20.30 GMT", date: "24th November 2024", address: "Park Royal Bowling Club NW10", description: "Join us for a fantastic game of bowling and great food. We've reserved a lane for 12 people and RSVP's will be allocated on a first come first serve basis. Act now to secure your spot"}, {title:"West end theatre - The Lion King", time: "15.30 - 18.00 GMT", date: "27th November 2024", address: "Drury Lane west end", description: "Let's get together and watch the renowned Lion King. Afterwards we can go to pizza hut for a bite to eat"}]},
  {id: 1, name: "Girls Who Brunch Club", members: ["Riley", "Jennifer", "Jackie", "Penelope", "Kim", "Cynthia"], events: [{title:"Ice skating in Westsfield", time: "19.30 - 21.00 GMT", date: "29th November 2024", address: "Westfield, Ariel Way, White City", description: "Let's get into the festive season with our skates and have fun on the ice. We've booked a  30 minute slot for 10 guests so make sure you secure your spot and RSVP right away. Afterwards we can grab a cheeky Nandos"}, {title:"Winter  at Kew Gardens", time: "13.30 - 16.00 GMT", date: "24th November 2024", address: "Kew Gardens, Richmod", description: "Let's soak in some botanical bliss by visiting the effervescent Kew Gardens at Christmas. This is a lunchtime event so after touring the gardens we can have a snack in the popular botanical resturaunt"}, {title:"Christmas at Kew", time: "13.30 - 16.00 GMT", date: "17th December 2024", address: "Kew Botanical Gardens - Richmond", description: "From November to early January, discover 3km of enchanting illuminations, featuring over 20 dazzling installations, including some cherished favourites and exciting new displays. Stroll through glittering tunnels, admire vibrant lakeside reflections, and marvel at trees gleaming with jewel-toned lights. Wander by the fire garden’s warm glow, enjoy larger-than-life illuminations, and keep an eye out for Father Christmas.Christmas at Kew is an unmissable opportunity to celebrate Christmas and welcome in the New Year as you walk through a botanical world brimming with seasonal sparkle."}]},
  {id: 2, name: "London Black Chicks Network", members: ["Charity", "Viola", "Gwyneth", "Rashia", "Taylor", "Christina", "Annie"], events: [{title:"Dinner and Drinks  @ The Rum Kitchen Brixton", time: "19.30 - 22.00 GMT", date: "1st December 2024", address: "437 Coldharbour Lane, Brixton", description: "Let's enjoy some deliciously spicy carrbbean food at the famous eatery Rum Kitchen"}, {title:"Sunday Lunch at Madison's Rooftop Bar", time: "14.30 - 16.00 GMT", date: "5th December 2024", address: "Rooftop terrace one, New Change, London", description: "Overlooking St Paul’s, Madison brings bundles of style, fun and a slice of modern Manhattan to London, all complemented by the views of the City skyline. Perched on the penthouse spot of One New Change, Madison comprises of a glamorous bar, restaurant, cocktail bar and rooftop terraces that are Mediterranean style suntraps making Madison one of London’s most sought after social settings."}, {title:"Shoreditch Nights", time: "22.00 - 00.00 GMT", date: "10th December 2024", address: "118 Shoreditch High Street, London", description: "We ned a night out ladies. Let's get together and explore the famous night life that surrounds Shoreditch and east london. We'll meet at 8pm outside shoreditch tube station and make our way to the Matchbox bar afterwards. We can then go bar hopping until you want to go home."}]},
  {id: 3, name: "Ladies who brunch", members: ["Cherise", "Gail", "Linda"], events: [{title:"Brunch at the Duck and Waffle", time: "12.00 - 14.00 GMT", date: "12th December 2024", address: "110 Bishopsgate London", description: "Duck & Waffle, the restaurant, was born in London 2012, but our namesake dish came well before. With over 2 million sold, and counting, it's a celebration of that unexpectedly delectable combination of sweet and salty and savory for a truly unforgettable culinary experience."}, {title:"Friday night dinner at Duck and rice", time: "19.30 - 21.00 GMT", date: "20th November 2024", address: "90 Berwick Street, Soho, London W1F 0QB ", description: "With their unique blend of tradition and modernism, comfort and extroversion, The Duck and Rice embodies the eclectic rhythm of Soho’s most iconic street.Downstairs in our ground floor pub, traditional British ales sit alongside brewery-fresh Czech Pilsner and sumptuous cocktails. Think pubby good vibes with swanky booths and high tables. Oh, and your pooches are more than welcome! Upstairs, the dining room is luxurious and cosy, intimate but elegant, perfect for friends, families, and lovers. We serve the same world-class menu on both floors."}]},
  {id: 4, name: "The London Travel Club", members: ["Nidhi", "Rini", "Shreya", "Joanna"], events: [{title:"Weekend away in Brussels", time: "08.00 - 16.00 GMT", date: "17th - 19th November 2024", address: "Bruge", description: "Let's take a long weekend away and visit our european cousins in Brussels. We'll be taking the eurostar from waterloo station at 8.30am and should arrive in brussels just after lunchtime. We'll explore the Christmas market, do lots of shopping and eat good food"}, {title:"Fine Dining at The Meat & Co", time: "18.30 - 20.30 GMT", date: "21st December 2024", address: "Mayfair London", description: "A fine dining restaurant in London that fuses African heritage and cuisine with modern culinary techniques and contemporary décor. Each dish is planned and prepared carefully. From knowing exactly where our steak comes from and how it was raised, to sourcing local ingredients, and designing each new menu with seasonal produce in mind. This way, we know that our suppliers have the same values and take the same care when it comes to crafting exceptional meals for"}, {title:"Brunch at Blixen Spitalfields", time: "12.30 - 14.30 GMT", date: "17th November 2024", address: "65a Brushfield Street LondonE1 6AA", description: "Blixen in the iconic Spitalfiels market do a lovely weekend brunch menu. Let's soak in the atmosphere of this popular hangout next weekend"}, {title:"Lunch at the Ivy Chelsea garden", time: "13.30 - 15.30 GMT", date: "22nd November 2024", address: "197 Kings Road Chelsea SW3", description: "Located on London’s enduringly chic King’s Road, our restaurant The Ivy Chelsea Garden brings relaxed yet sophisticated all-day dining restaurant to the heart of West London. From modern British cuisine to café-style classics and fantastic vegan and vegetarian dishes, there’s something for everyone to love. As well as our main restaurant, decorated with lush foliage, dashes of Art-Deco detail and beautiful burnt orange banquettes, we have a stunning outdoor garden. If the weather’s looking unpredictable, you can always dine in our beautiful orangery."}, {title:"Brunch at Bill's resturant", time: "11.30 - 13.30 GMT", date: "24th November 2024", address: "Westfield, Ariel Way, White City", description: "Thought we'd celebrate the official end of restriction mixing indoors with a nice hearty brunch/lunch at Bills Resturaunt in Westfield - White City on Sunday 23rd May. Some of you may want to hit the shops afterwards for some much needed retail therapy! I've booked a table for 6 people between 11.30am and 1.30pm. Please arrive on time as we only have the table for 2 hours. Check out the food menus:"}]},
  {id: 5, name: "Social Singles Age 35+", members: [ "Anick", "Rachel", "Neha", "Arya", "Elizabeth", "Zara", "Louise"], events: [{title:"Cocktails & canapes at 12th Knot rooftop bar", time: "20.00 - 22.00 GMT", date: "14th November 2024", address: "12th Knot Bar, Sea Containers, 20 Upper Ground London", description: "Let's link up on Saturday night for some fancy cocktails and canapes at the 12th Knot Rooftop Bar, at the Sea Containers, in the South Bank of London. The 12th Knot is an Eclectic rooftop bar overlooking the River Thames and London's skyline and is a favourite hang-out of Instagram influencers and bloggers. The venue is lively with a DJ and live music and the dress code is smart/casual so no sportswear or sandals are allowed. For all you young guns there is an over 21 policy and proof of ID may be required. I've booked a table for 6 so spaces are limited. Please arrive on time so that we can hopefully enjoy the evening sun overlooking the Thames whilst we have a cocktail or two....or three....! You can view the food and drinks menu here:https://www.seacontainerslondon.com/manage/wp-content/uploads/12th-Knot-Menu-Reopening-FINAL-QR-CODE.pdf As per all meet ups a non-refundable £3 RSVP fee is required to secure your spot."}, {title:"Late Night Drinks @ Sabine Rooftop Bar", time: "20.30 - 00.00 GMT", date: "19th December 2024", address: "Sabine Rooftop Bar 10 Godliman Street London", description: "Let's see out the last days of summer, in style, at this fabulous city of London, rooftop bar. This much coveted venue is situated in the heart of St Pauls and is definitely one for those who like their high-end bars. Serving spectacular cocktails with the bonus of stunning aerial views of the city of London, Sabine is the perfect place to relax and unwind on a Saturday night. You can view the food and drinks menu here: https://www.sabinelondon.co.uk/menus/ This event is generally geared towards first time attendees - by that I mean ladies who have not yet had an opportunity to RSVP and subsequently attend an event, hosted by this group, due to limited spaces.As always there is a £3 non-refundable RSVP fee to secure your spot. See you on the roof in December!"}]}
  ];

  const labels = [
    {id: 0, text: "Going", event:["Dinner at Nobu Mayfair - 23/11/24 - 19:00 GMT", "Pancakes at My Old Dutch - 30/11/24 - 14: 00 GMT", "Drinks at Claridges - 7/12/24 - 20:00 GMT", "Lunch at Feya Cafe Knightsbridge - 05/12/24 14.00 GMT"]},
    {id: 1, text: "Saved", event:["Drinks at 12th Knot Rooftop Bar", "Shopping at Westfield", "Girls Night In, Hampstead", "Lunch at Five Guys Kingston"] },
    {id: 2, text: "Suggested", event: ["Get suggestions for events"]},

  ];


export default function Meetup(){
const [group, dispatch] = useReducer(groupReducer, null);
 if (group && !group.name) {
  return (
  <GroupsContext.Provider value={group}>
   <ReducerContext.Provider value={dispatch}>
    <div className="grouppages">
    <p><a onClick={() => dispatch({
      type: "home",
    }
    )} 
    href="#">&larr;</a></p>
    <div className={`group${group.groupid} page-banner`}>
    <h2 className="pages-header">{group.groupname}</h2>
    </div>

    <Members />
    </div>
    </ReducerContext.Provider>
    </GroupsContext.Provider>
    
  )
} else if(group && group.name){
  return(
    <GroupsContext.Provider value={group}>
   <ReducerContext.Provider value={dispatch}>
    <div className="eventpage">
    <p><a onClick={() => dispatch({type: group.id,
    name: group.name,
    members: group.members,
    events: group.events}
    )}href="#">&larr; </a></p>
    <h3>{group.name}</h3>
    <p>{group.date}{" "}{group.time}</p>
    <p>{group.address}</p>
    <p><b>{group.groupname}</b></p>
    <h3>About</h3>
    <p className="description">{group.description}</p>
    </div>
     </ReducerContext.Provider>
    </GroupsContext.Provider>
  )
} else {

return (
<>
  <GroupsContext.Provider value={group}>
   <ReducerContext.Provider value={dispatch}>
<UpcomingEvents />
<Groups />
<Interests />
<Calendar />
</ReducerContext.Provider>
</GroupsContext.Provider>
</>
)

}
}

function UpcomingEvents(){
  const [futureevents, setfutureevents] = useState(labels);
  const[selected, setselected] = useState(0);
   

function eventDiary (futureevent){
setfutureevents(labels.filter(label => label.id === futureevent.id ));
}
const eventlist = labels.map(social => <li key={social.id}><button className={selected === social.id ? "selectbutton" : ""}
onClick={
  () => {
    setselected(social.id)
    eventDiary(social);
  }
  }>{social.text}</button></li>)

const attending = futureevents[0].event.map((going, i) => <li key={i}>{going}</li>)

  return (
    <>
  <h1 className="mainheader">Let's Meet</h1>
  <div className="upcoming-events">
  <h1>Upcoming Events</h1>
  <ul className="upcoming-events-list" >
  {eventlist}
  </ul>
  <div className="upcoming-events-category">
  <ul>{attending}</ul>
  </div>
  </div>
  </>
  )
}


function groupReducer(group, action){
switch (action.type) {
  case 0: 
  case 1:
  case 2:
  case 3: 
  case 4: 
  case 5: {
    return {
      groupid: action.type, 
      groupname: action.name,
      groupmember: action.members,
      groupevent: action.events,
    }
  }

case "event" :{
return {
  name: action.name,
  time: action.time,
  date: action.date,
  address: action.address,
  description: action.description,
  id: action.id,
  groupname: action.groupname,
}
}
 
case "home" : {
  return null
}

case "all" : {
  return { 
    going: action.events,
    name: "all",
    }
}
}
}

function Events(){
  const groupstate = useContext(GroupsContext);
  const reducerstate = useContext(ReducerContext);
const events = groupstate.groupevent.map((event, i) => <div onClick={() => reducerstate({
  type: "event",
  name: event.title,
  time: event.time,
  date: event.date,
  address: event.address,
  description: event.description, 
  id: event.id,
  groupname: event.name,

})} className="events" key={i}>{event.title} - {event.date}</div>)
return (
<div className="event-container">
{events}
</div>
)
}

function Members(){
  const groupstate = useContext(GroupsContext);
  
  const members = groupstate.groupmember.map((member, i) => <li key={i}>
  <span>{member}</span></li>)
  return (
<>
<div className="members">
<p>{groupstate.groupmember.length} members</p>
<p>London: Public Group</p>
<ul>{members}</ul>
</div>

<Events />
</>
  )
}

function Groups(){
const reducerstate = useContext(ReducerContext);
const banner = groups.map(group => <div onClick={() => {
  reducerstate({
    type: group.id,
    name: group.name,
    members: group.members,
    events: group.events,
  })
}}
className={`group${group.id}`} key={group.id}><p>{group.name}</p></div>)
return (
<div className="groupscontainer">
<h4 className="grouptitle">Your groups</h4>
<div className="groupsbanner">
{banner}
</div>
</div>
)
}

function Interests(){
  
  const interestLabels = interests.map((hobby, i) => <li key={i}>{hobby}</li>)
  return (
  <div className="interests">
  <ul>
  {interestLabels}
  </ul>
  </div>
  )
}

function Calendar(){

const [calendar, setcalendar] = useState(topnav[0].events);
const [colour, setcolour] = useState(null);

const topnavigation = topnav.map((value) => <li key={value.id}><a onClick={(e) => {
    setcalendar(value.events);
    setcolour(value.label);
    e.preventDefault();
    } 
}
href="#" className={colour == value.label ? colour : ""}>{value.label}</a></li>);
const attending = calendar.map((detail, i) => <div key={i}><p><b>{detail.title}</b></p><p className="time">{detail.time}</p> <p>{detail.date}</p>
  </div>)

return (
<>
<div className="topnav">
<h4>Your calendar </h4>
<ul>
{topnavigation}
</ul>
<div className="calendardisplay">
{attending}
</div>
</div>
</>
)
}

