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
   * @author Vanessa Bizzell
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
   * @author Vanessa Bizzell
   * @version 1.0
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
   * @author Vanessa Bizzell
   * @version 1.0
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
   * @author Vanessa Bizzell
   * @version 1.0
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
    this._gift;
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

  set gift(value) {
    if (value.length < 3) {
      alert("gift description is too short");
      return;
    }
    this._gift = value;
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

  get gift() {
    return this._gift;
  }

  describe() {
    return `You have met the ${this._name}, ${this._description}`;
  }

  converse() {
    return `The ${this._name} says ${this._conversation}`;
  }

  giftGiven() {
    return `You accept the ${this._name}'s gift of ${this._gift}`;
  }
}

/**
 * Player Class - extension of character class with inventory array
 *
 * @author Vanessa Bizzell
 * @version 1.0
 */
class Player extends Character {
  constructor(name, description) {
    super(name, description);
    this._inventory = [];
  }

  get inventory() {
    return this._inventory;
  }

  /**
   * method to pass gift into inventory array
   *
   * @author Vanessa Bizzell
   * @version 1.0
   */
  giftInventory(gift) {
    this._inventory.push(gift);
  }
}

//creates player with empty strings for name and description
const Player1 = new Player("", "");

//creates individual room objects and adds room descriptions
const kitchen = new Room("Kitchen");
kitchen.description =
  "a hot, noisy room with a huge fireplace. To the east is a large wooden door, to the south west is an open door through which you can see a kitchen garden.";
const greatHall = new Room("Great Hall");
greatHall.description =
  "a very large room with high ceilings and long tables. It has wooden doors on the north, south , east and west walls.";
const guardRoom = new Room("Guard Room");
guardRoom.description =
  "a small, cold and dusty room with a round table and a couple of chairs. To the north is a large wooden door, to the north west is a smaller door. On the south wall there is a tattered wall hanging. On closer inspection, there is a door built into the wall behind this. It's painted the same colour as the stone and would be hidden if not for the holes in the wall hanging.";
const chapel = new Room("Chapel");
chapel.description =
  "a lovely room with sunlight pouring in through stained glass windows. There is a large wooden door on to the north and a painting on the south west wall. The painting is hanging at an angle indicating it has been recently moved.";
const turret = new Room("Turret");
turret.description =
  "the stairs opened onto a precarious and windy turret top. Edged by castellated walls, you can see for miles around. There is a small wooden door to the south";
const bedChamber = new Room("Bed Chamber");
bedChamber.description =
  "a cosy room with tapestries hanging on the walls and a fire blazing merrily in the stone fireplace. There is a large wooden door to the south and a smaller door on the north wall ";

//links the rooms together
kitchen.linkRoom("west", greatHall);
kitchen.linkRoom("south east", guardRoom);
guardRoom.linkRoom("north west", kitchen);
guardRoom.linkRoom("north", greatHall);
guardRoom.linkRoom("south", chapel);
greatHall.linkRoom("east", kitchen);
greatHall.linkRoom("west", chapel);
greatHall.linkRoom("north", bedChamber);
greatHall.linkRoom("south", guardRoom);
bedChamber.linkRoom("south", greatHall);
bedChamber.linkRoom("north", turret);
turret.linkRoom("south", bedChamber);
chapel.linkRoom("west", greatHall);
chapel.linkRoom("south west", guardRoom);

//creates individual characters and adds descriptions and gifts
const queen = new Character("Queen");
queen.description =
  "a tall woman sparkling purple eyes. She wears a purple velvet dress with gold embroidery. A gold and sapphire crown rests on her long black hair.";
queen.gift = "a bag of coins";
queen.conversation =
  '"Please find the kidnapped king. Here is a bag of gold coins to help"';
const knight = new Character("Knight");
knight.description = "a tired man with curly hair and rusty armour.";
knight.gift = "a shiny silver sword";
knight.conversation = '"Where is your weapon? Here is my sword."';
const cook = new Character("Cook");
cook.description =
  "a friendly man with a grubby hat and white apron, standing by the spit.";
cook.conversation =
  '"You look hungry. Here are provisions to keep you going on your quest"';
cook.gift = "carefully wrapped food";
const princess = new Character("Princess");
princess.description =
  "a cross young woman with purple eyes and black hair, wearing riding gear";
princess.conversation =
  '"I am not allowed to rescue the King. Here is my map so that you can find the Wizard&apos;s lair."';
princess.gift = "a rolled map of the area";
const priest = new Character("Priest");
priest.description =
  "a soft-spoken bald man with a white robe, stood by the altar.";
priest.conversation =
  '"the King is a wise man and I shall miss him. Here is a golden key"';
priest.gift = "a large gold key";
const dragon = new Character("Dragon");
dragon.description =
  "a great purple beast with orange spines, perches on the edge of the turret wall breathing fire";
dragon.conversation =
  '"Let me know when you are ready to leave by saying FLY and I will take you on your quest. Here is a gem of great value."';
dragon.gift = "a purple sapphire";

// links characters to rooms
kitchen.linkCharacter(cook);
greatHall.linkCharacter(queen);
guardRoom.linkCharacter(knight);
chapel.linkCharacter(priest);
bedChamber.linkCharacter(princess);
turret.linkCharacter(dragon);

//function to display start message
const startMessage = () => {
  let startMsg =
    "The King is lost, kidnapped by an evil wizard and taken to a land far, far away. You have been tasked with a rescue quest but first, you must collect provisions from the castle. Collect gifts from the castle occupants before starting your quest.";

  textContent = `<p class = 'font-bold'>${startMsg}</p>`;

  document.getElementById("startArea").innerHTML = textContent;
};

//function to display interaction instructions
const interact = () => {
  let interactMsg =
    "Type TALK to speak to castle occupants. Type TAKE to accept what is being offered.";

  textContent = `<p class = 'text-blue-400'>${interactMsg}</p>`;

  document.getElementById("interactInstr").innerHTML = textContent;
};

//function to display the information about the current room
const displayRoomInfo = (room) => {
  let occupantMsg = "";
  let moveMsg = "Which way would you like to go?";
  if (room.character != []) {
    occupantMsg = room.character[0].describe();
  } else {
    occupantMsg = "There is no one else in the room.";
  }

  textContent = `<p class = 'pt-5 '>${room.describe()}</p><p class = 'pt-5 '>${occupantMsg}</p><p class = 'pt-5'>${room.getDetails()}</p><p class = 'py-5 font-bold'>${moveMsg}</p>`;

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML =
    '> <input type = "text" id ="usertext" class = "w-10/12 border-2 border-purple-400 bg-white rounded-md "/>';
  document.getElementById("usertext").focus();
};

//function to check player inventory and display win/lose message
const winGame = () => {
  let inventory = Player1._inventory;
  let winMsg = "";
  if (
    (inventory.includes(queen.gift) || inventory.includes(dragon.gift)) &&
    inventory.includes(princess.gift) &&
    inventory.includes(cook.gift)
  ) {
    winMsg =
      "Congratulations! You rescued the King...you travelled a long, long way, found the Wizard's lair and paid him to release the King. The Sapphire Dragon flew you both home where you received riches and acclaim.";
  } else if (
    inventory.includes(knight.gift) &&
    inventory.includes(princess.gift) &&
    inventory.includes(cook.gift)
  ) {
    winMsg =
      "Congratulations! You rescued the King...you travelled a long, long way, found the Wizard's lair and fought an epic battle using your silver sword. You killed the wizard and released the King. The Sapphire Dragon flew you both home where you received riches and acclaim.";
  } else if (
    !inventory.includes(queen.gift) &&
    !inventory.includes(dragon.gift) &&
    !inventory.includes(knight.gift)
  ) {
    winMsg =
      "You did not rescue the King. Unfortunately you did not take an item of value to pay for the King's release. You could have fought and killed the Wizard but you didn't take a weapon either.";
  } else if (!inventory.includes(cook.gift)) {
    winMsg =
      "You did not rescue the King. Unfortunately you forgot to take food and starved.";
  } else if (!inventory.includes(princess.gift)) {
    winMsg =
      "You did not rescue the King. Unfortunately, you forgot to take a map, got horribly lost and are still trying to find your way out of a bog.";
  }

  textContent = `<p class = 'pt-5' >The sapphire dragon who bows her neck and allows you to climb up.</p><p class 'pt=5'>She says "Let&apos;s fly together to the edge of the kingdom where I will leave you to complete your rescue quest."</p><p class = 'py-5 font-bold'>${winMsg}</p>`;

  document.getElementById("gameResult").innerHTML = textContent;
  document.getElementById("speecharea").innerHTML = "";
  document.getElementById("startArea").innerHTML = "";
  document.getElementById("usertext").value = "";
  document.getElementById("textarea").innerHTML = "";
};

//function to start game play
const startGame = () => {
  startMessage();
  currentRoom = greatHall;
  displayRoomInfo(currentRoom);
  interact();

  //adds event listener to whole page
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      // grab the contents of the input box and convert to lowercase
      const command = document
        .getElementById("usertext")
        .value.toLowerCase("usertext");
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

      if (directions.includes(command)) {
        currentRoom = currentRoom.move(command);
        document.getElementById("usertext").value = "";
        displayRoomInfo(currentRoom);
        document.getElementById("speecharea").innerHTML = "";
      } else if (command === "talk") {
        //if talk is in input box then character to converse
        document.getElementById("speecharea").innerHTML =
          currentRoom.character[0].converse();
        document.getElementById("usertext").value = "";
      } else if (command === "take") {
        //if take is in input box then player to take gift
        document.getElementById("speecharea").innerHTML =
          currentRoom.character[0].giftGiven();
        //gift is passed to player inventory
        document.getElementById("usertext").value = "";
        Player1.giftInventory(currentRoom.character[0].gift);
        // if in turret and "fly" is input, move to quest room and display win/lose message
      } else if (command === "fly") {
        //display win/lose message in area above user input box
        winGame();
      } else {
        alert("Not a valid command. Please try again");
        displayRoomInfo(currentRoom);
        document.getElementById("usertext").value = "";
      }
    }
  });
};

startGame();
