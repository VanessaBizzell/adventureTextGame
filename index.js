class Room {
    constructor(name, description) {
      this._name = name;
      this._description = description;
      this._linkedRooms = {};
    }
  
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("description is too short.");
        return;
      }
      this._description = value;
    }
  
    describe() {
      return (
        "Looking around the " + this._name + " you can see " + this._description
      );
    }
  
    getDetails() {
      // object entries returns an array of both the key and value of items in the object 
      const entries = Object.entries(this._linkedRooms)
      // initialise an empty details array which will hold the formatted string based on the linked room entries 
      let details = []
      // use a for loop to loop over the entries array and specify we want the key and the value
      for (const [direction, room] of entries) {
          // format a string based on the object. We only take the information we want. 
          let text = `The ${room._name} is to the ${direction}`
          details.push(text)
          return details
      }
  
    }
  
    move(direction) {
      if (direction in this._linkedRooms) {
          return this._linkedRooms[direction]
          } else {
              alert("You can't go that way")
              return this
          }
      }
    
  
    linkRoom(direction, roomToLink) {
      this._linkedRooms[direction] = roomToLink;
    }
  }
  
  class Character {
    constructor(name) {
      (this._name = name), (this._description = "");
      this._conversation = "";
    }
  
    set name(value) {
      if (value.length < 4) {
        alert("Name is too short.");
        return;
      }
      this._name = value;
    }
  
    set description(value) {
      if (value.length < 4) {
        alert("Decription is too short.");
        return;
      }
      this._description = value;
    }
  
    set conversation(value) {
      if (value.length < 4) {
        alert("conversation is too short.");
        return;
      }
      this._conversation = value;
    }
    get name() {
      return this._name;
    }
  
    get description() {
      return this._description;
    }
  
    get conversation() {
      return this._conversation;
    }
  
    describe() {
      return `You have met ${this._name}. ${this._description}`;
    }
  
    converse() {
      return `${this._name} says ${this._conversation}`;
    }
  }
  
  // for assignment, gigure out how to linking characters to rooms
  
  
  const Kitchen = new Room("Kitchen");
  Kitchen.description =
    "a hot, noisy room with a huge fireplace";
  const greatHall= new Room("Great Hall");
  greatHall.description = "a very large room with high ceilings and long tables";
  const guardRoom = new Room("Guard Room");
  guardRoom.description = "a small and dusty room with a round table and a couple of chairs";
  const Chapel = new Room("Chapel");
  Chapel.description =
    "a lovely room with sunlight pouring in through stained glass windows.";
    const Turret = new Room("Turret");
  Turret.description =
    "the stairs opened onto a precarious and windy turret top. Edged by castellated walls, you can see for miles around";
    const bedChamber = new Room("Bed Chamber");
  bedChamber.description =
    "a cosy room with tapestries hanging on the walls and a fire blazing merrily in the stone fireplace";

  
  Kitchen.linkRoom("south", Lounge);
  Kitchen.linkRoom("east", Hall);
  Lounge.linkRoom("north", Kitchen);
  Lounge.linkRoom("east", GamesRoom);
  GamesRoom.linkRoom("west", Lounge);
  GamesRoom.linkRoom("north", Hall);
  Hall.linkRoom("south", GamesRoom);
  Hall.linkRoom("west", Kitchen);
  
  // the room parament to this function is a room object
  
  const displayRoomInfo = (room) => {
    let occupantMsg = "";
  
    if (room.character) {
      //logic here for displaying hte character in the room and their dialogue
    } else {
      occupantMsg = "There is no one else in the room.";
    }
  
    textContent = "<p>" + room.describe() + "</p>" + "<p>" +
      occupantMsg + "</p>" + "<p>" + room.getDetails() + "</p>";
  
    document.getElementById("textarea").innerHTML = textContent;
    document.getElementById("buttonarea").innerHTML = '> <input type = "text" id ="usertext" />';
    document.getElementById("usertext").focus()
    //.focus makes it clear that this is only place to type
  };
  
  const startGame = () => {
      //put start room here
      currentRoom = greatHall
      displayRoomInfo(currentRoom)
  
  
  //adds event listener to whole page
  document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
          // grab the contents of the input box
          const command = document.getElementById("usertext").value
          const directions = ["north", "south", "east", "west"]
  
          //convert to lower case so doensn't return false
          if (directions.includes(command.toLowerCase())) {
              currentRoom = currentRoom.move(command)
              document.getElementById("usertext").value = ""
              displayRoomInfo(currentRoom)
          } else {
              alert("Not a valid command. Please try again")
              displayRoomInfo(currentRoom)
              document.getElementById("usertext").value = ""
          }
          
      }
  })
  }
  
  startGame()