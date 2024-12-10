/**
 * Castle Rooms Class to create room object template
 *
 * @author Vanessa Bizzell
 * @version 1.0
 */
class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._linkedCharacters = [];
  }

  /**
   * Getter method for name - no parameter. Allows access to property name.
   *
   * @returns room name
   */
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get character() {
    return this._linkedCharacters;
  }

  /**
   * Setter method for name. Sets value for name. Validates value (name) provided - alerts if too short. Could validate no numbers etc.
   *
   * @param value
   *
   */
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

  /**
   * a method to produce the room description. Uses name and description properties to produce user-friendly output.
   *
   * @returns {string} name & description of the room
   * @author Vanessa Bizzell
   * @version 1.0
   */
  describe() {
    return (
      "Looking around the " + this._name + " you can see " + this._description
    );
  }

  /**
   * a method to produce a description of linked rooms
   *
   * @returns {array} descriptions of what rooms are in which direction
   * @author Vanessa Bizzell
   * @version 1.0
   */
  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = ` The ${room._name} is to the ${direction}`;
      details.push(text);
    }
    return details;
  }

  /**
   * a method to swop to new room linked to current room. Checks if move direction is possible. If not, returns error message.
   *
   * @param direction string defining direction for character to move
   * @returns {object} current room or new room
   *
   */
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way");
      return this;
    }
  }

  /**
   *method to link rooms adds a new linked room object into the property linkedRooms
   *
   * @param {string} direction (key) to move to get to this room
   * @param {object} roomToLink (value) room in that direction
   *
   */
  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  //links character and pushes into an array
  linkCharacter(character) {
    this._linkedCharacters.push(character);
  }
}

//Castle Characters
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
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("Conversation is too short.");
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
    return `You have met the ${this._name}, ${this._description}`;
  }

  converse() {
    return `The ${this._name} says ${this._conversation}`;
  }
}

//creates individual room objects and adds room descriptions
const kitchen = new Room("Kitchen");
kitchen.description = "a hot, noisy room with a huge fireplace";
const greatHall = new Room("Great Hall");
greatHall.description = "a very large room with high ceilings and long tables";
const guardRoom = new Room("Guard Room");
guardRoom.description =
  "a small and dusty room with a round table and a couple of chairs";
const chapel = new Room("Chapel");
chapel.description =
  "a lovely room with sunlight pouring in through stained glass windows.";
const turret = new Room("Turret");
turret.description =
  "the stairs opened onto a precarious and windy turret top. Edged by castellated walls, you can see for miles around";
const bedChamber = new Room("Bed Chamber");
bedChamber.description =
  "a cosy room with tapestries hanging on the walls and a fire blazing merrily in the stone fireplace";

//links the rooms together
kitchen.linkRoom("west", greatHall);
kitchen.linkRoom("south east", guardRoom);
guardRoom.linkRoom("north west", kitchen);
guardRoom.linkRoom("north", greatHall);
guardRoom.linkRoom("north east", chapel);
greatHall.linkRoom("east", kitchen);
greatHall.linkRoom("west", chapel);
greatHall.linkRoom("north", bedChamber);
greatHall.linkRoom("south", guardRoom);
bedChamber.linkRoom("south", greatHall);
bedChamber.linkRoom("north", turret);
turret.linkRoom("south", bedChamber);
chapel.linkRoom("west", greatHall);
chapel.linkRoom("south west", guardRoom);

//creates individual characters and adds descriptions
const queen = new Character("Queen");
queen.description =
  "a tall woman sparkling purple eyes. She wears a purple velvet dress with gold embroidery. A gold and sapphire crown rests on her long black hair.";
const knight = new Character("Knight");
knight.description = "a tired man with curly hair and rusty armour.";
const cook = new Character("Cook");
cook.description =
  "a friendly man with a grubby hat and white apron, standing by the spit.";
const princess = new Character("Princess");
princess.description =
  "a cross young woman with purple eyes and black hair, wearing riding gear";
const priest = new Character("Priest");
priest.description =
  "a soft-spoken bald man with a white robe, stood by the altar.";
const dragon = new Character("Dragon");
dragon.description =
  "a great purple beast with orange spines, perches on the edge of the turret wall breathing fire";

// links characters to rooms
kitchen.linkCharacter(cook);
greatHall.linkCharacter(queen);
guardRoom.linkCharacter(knight);
chapel.linkCharacter(priest);
bedChamber.linkCharacter(princess);
turret.linkCharacter(dragon);

//function to display the information about the current room
const displayRoomInfo = (room) => {
  let occupantMsg = "";
  if (room.character != []) {
    //logic here for displaying the character in the room and their dialogue
    occupantMsg = room.character[0].describe();
  } else {
    occupantMsg = "There is no one else in the room.";
  }

  textContent =
    "<p>" +
    room.describe() +
    "</p>" +
    "<p>" +
    occupantMsg +
    "</p>" +
    "<p>" +
    room.getDetails() +
    "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML =
    '> <input type = "text" id ="usertext" />';
  document.getElementById("usertext").focus();
  //.focus makes it clear that this is only place to type (cursor blinks in box)
};

const startGame = () => {
  //put start room here
  currentRoom = greatHall;
  displayRoomInfo(currentRoom);

  //adds event listener to whole page
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      // grab the contents of the input box
      const command = document.getElementById("usertext").value;
      const directions = [
        "north",
        "south",
        "east",
        "west",
        "north east",
        "north west",
        "south east",
        "south west",
      ];

      //convert to lower case so doensn't return false
      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        document.getElementById("usertext").value = "";
        displayRoomInfo(currentRoom);
      } else {
        alert("Not a valid command. Please try again");
        displayRoomInfo(currentRoom);
        document.getElementById("usertext").value = "";
      }
    }
  });
};

startGame();
