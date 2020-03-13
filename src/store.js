import createStore from 'storeon'

function randomName() {
    const names = [
      "Aaran", "Aaren", "Aarez", "Aarman", "Aaron", "Aaron-James", 
      "Aarron", "Aaryan", "Aaryn", "Aayan", "Aazaan", "Abaan", 
      "Abbas", "Abdallah", "Abdalroof", "Abdihakim", "Abdirahman", 
      "Abdisalam", "Abdul", "Abdul-Aziz", "Abdulbasir", "Abdulkadir", 
      "Abdulkarem", "Abdulkhader", "Abdullah", "Abdul-Majeed", 
      "Abdulmalik", "Abdul-Rehman", "Abdur", "Abdurraheem", 
      "Abdur-Rahman", "Abdur-Rehmaan", "Abel", "Abhinav", 
      "Abhisumant", "Abid", "Abir", "Abraham", "Abu", "Abubakar", 
      "Ace", "Adain", "Adam", "Adam-James", "Addison", "Addisson", 
      "Adegbola", "Adegbolahan", "Aden", "Adenn", "Adie", "Adil", 
      "Aditya", "Adnan", "Adrian", "Adrien", "Aedan", "Aedin", 
      "Aedyn", "Aeron", "Afonso", "Ahmad", "Ahmed", "Ahmed-Aziz",
    ];
    const surnames = [
      "Guerin", "Guillaume", "Gurardass", "Gurdeep", "Gursees", 
      "Gurthar", "Gurveer", "Gurwinder", "Gus", "Gustav", "Guthrie", 
      "Guy", "Gytis", "Habeeb", "Hadji", "Hadyn", "Hagun", "Haiden", 
      "Haider", "Hamad", "Hamid", "Hamish", "Hamza", "Hamzah", "Han", "Hansen", "Hao", "Hareem", "Hari", "Harikrishna", "Haris", "Harish", "Harjeevan", "Harjyot", "Harlee", "Harleigh", "Harley", "Harman", "Harnek", "Harold", "Haroon", "Harper", "Harri", "Harrington", "Harris", "Harrison", "Harry", "Harvey", "Harvie", "Harvinder", "Hasan", "Haseeb", "Hashem", "Hashim", "Hassan", "Hassanali", "Hately", "Havila", "Hayden", "Haydn", "Haydon", "Haydyn", "Hcen", "Hector", "Heddle", "Heidar", "Heini", "Hendri", "Henri", "Henry", "Herbert", "Heyden", "Hiro", "Hirvaansh", "Hishaam", "Hogan", "Honey", "Hong", "Hope", "Hopkin", "Hosea", "Howard", "Howie", "Hristomir", "Hubert", "Hugh", "Hugo", "Humza", "Hunter", "Husnain", "Hussain", 
      "Hussan", "Hussnain", "Hussnan", "Hyden", "I",
    ];
    const name = names[Math.floor(Math.random() * names.length)];
    const surname = surnames[Math.floor(Math.random() * surnames.length)];
    return name + " " + surname;
  }
  function randomColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

// Initial state, reducers and business logic are packed in independent modules
let state = store => {
  // Initial state
  store.on('@init', () => ({
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    }
  }
))

let currentMember = {};

//create user with random name and color of avatar
store.on('addID', (obj) => {
    const member = {...obj.member};
    member.id = (Math.random().toFixed(5) + " ").substring(2);
    currentMember = {...member};
    const newObj = {...obj, member};
    newObj.member.id = (Math.random().toFixed(5) + " ").substring(2);
    store = {...newObj}
    return store;
})

// add message to message array with data about user
store.on('msAdd', (state, data) => {
  state.messages.push({member: {id: currentMember.id, clientData: {username: currentMember.username,
  color: currentMember.color}}, text: data});
})
}

export const store = createStore([state])