/*
 * Jake's Giga Pet
 * This project uses a JavaScript object to store the pet's changing values.
 */

var pet_info = {
  name: "Jake",
  weight: 12,
  happiness: 8
};

var OVERFED_WEIGHT = 16;
var NORMAL_PUP_IMAGE = "images/pixel-pup.svg";
var OVERFED_PUP_IMAGE = "images/Fat&Bald-pixelpup.svg";

$(function() {
  // jQuery's .on() method attaches an event handler to an element.
  // It is useful here because each button can listen for a click and call
  // the matching function whenever the player interacts with the pet.
  $(".treat-button").on("click", clickedTreatButton);
  $(".play-button").on("click", clickedPlayButton);
  $(".exercise-button").on("click", clickedExerciseButton);
  $(".groom-button").on("click", clickedGroomButton);

  updatePetInfoInHtml();
});

function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;
  showNotification("Jake says: Yum! That treat was delicious.");
  updatePetInfoInHtml();
}

function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;
  showNotification("Jake says: That game was pawsome!");
  updatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 2;
  showNotification("Jake says: I feel stronger already!");
  updatePetInfoInHtml();
}

function clickedGroomButton() {
  pet_info.happiness += 3;
  showNotification("Jake says: My fur looks fabulous!");
  updatePetInfoInHtml();
}

function updatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();

  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
  $(".mood").text(getMood());
  updatePetImage();
}

function checkWeightAndHappinessBeforeUpdating() {
  // These conditionals prevent either value from dropping below zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

function updatePetImage() {
  var isOverfed = pet_info.weight >= OVERFED_WEIGHT;
  var image = isOverfed ? OVERFED_PUP_IMAGE : NORMAL_PUP_IMAGE;
  var altText = isOverfed
    ? "Pixel art dog named Jake looking fat and bald"
    : "Pixel art dog named Jake sitting on a blue cushion";
  var caption = isOverfed
    ? "Jake needs more exercise!"
    : "Jake is ready for attention!";

  $(".pet-image").attr("src", image).attr("alt", altText);
  $(".pet-caption").text(caption);
}

function getMood() {
  if (pet_info.happiness >= 12) {
    return "Overjoyed";
  }

  if (pet_info.happiness >= 7) {
    return "Feeling curious";
  }

  return "Needs some love";
}

function showNotification(message) {
  // jQuery's .fadeIn() method reveals the notification with a short
  // animation instead of showing a browser alert or writing to the console.
  $(".notification").text(message).fadeIn(250);
}
