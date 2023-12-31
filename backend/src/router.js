const express = require("express");

const router = express.Router();

// --------------------------------------- Import Controllers ---------------------------------------
const GrapeVarietyControllers = require("./controllers/GrapeVarietyControllers");
const UserControllers = require("./controllers/UserControllers");
const { hashPassword, verifyToken, verifyPassword } = require("./auth");
const { validateUser } = require("./validators");
const ExistingWineControllers = require("./controllers/ExistingWineControllers");
const WineRegionControllers = require("./controllers/WineRegionControllers");
const TastingSheetsDatasControllers = require("./controllers/TastingSheetsDatasControllers");
const AppellationControllers = require("./controllers/AppellationControllers");
const WorkshopControllers = require("./controllers/WorkshopControllers");
const NewWineControllers = require("./controllers/NewWineControllers");
const CompetitionSelectionControllers = require("./controllers/CompetitionSelectionControllers");
const WorkshopHasExistingWineControllers = require("./controllers/WorkshopHasExistingWineControllers");
const TastingNoteControllers = require("./controllers/TastingNoteControllers");
const TastingNoteHasExistingWineControllers = require("./controllers/TastingNoteHasExistingWineControllers");
const OlfactiveAromasHasTastingNoteControllers = require("./controllers/OlfactiveAromasHasTastingNoteControllers");
const TastingNoteHasTasteFlavorControllers = require("./controllers/TastingNoteHasTasteFlavorControllers");
const SelectedWineControllers = require("./controllers/SelectedWineControllers");
const WineryControllers = require("./controllers/WineryControllers");

const { verifyAdminCredentials } = UserControllers;

// ----------------------------------------- Public routes -------------------------------------------

router.post("/users", hashPassword, validateUser, UserControllers.add);
router.post(
  "/users/login",
  UserControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.get("/visualdatas", TastingSheetsDatasControllers.findVisualDatas);
router.get("/olfactivedatas", TastingSheetsDatasControllers.findOlfactiveDatas);
router.get(
  "/mouthslidersdatas",
  TastingSheetsDatasControllers.findMouthSlidersDatas
);
router.get("/tastedatas", TastingSheetsDatasControllers.findTasteDatas);

router.get("/grapevariety", GrapeVarietyControllers.browse);
router.get("/grapevariety/:id", GrapeVarietyControllers.read);
router.get("/existingwine", ExistingWineControllers.browse);
router.get("/existingwine/:id", ExistingWineControllers.read);
router.get(
  "/onlyexistingwine/:id",
  ExistingWineControllers.getExistingWineById
);
router.get("/winesdata", ExistingWineControllers.refactorWinesData);
router.get(
  "/existingwinebytastingnote/:id",
  ExistingWineControllers.getOneExistingWineByTastingNoteId
);

router.post(
  "/existingwinehasappellation",
  ExistingWineControllers.addEwHasAppellation
);
router.get("/winery", WineryControllers.browse);
router.get("/appellation", AppellationControllers.browse);
router.get("/appellation/:id", AppellationControllers.read);
router.get("/wineregion", WineRegionControllers.browse);
router.get("/wineregion/:id", WineRegionControllers.read);
router.get("/newwine", NewWineControllers.browse);
router.get("/newwine/:id", NewWineControllers.read);
router.get("/newwinebyworkshop/:id", NewWineControllers.getNewWineByWorkshopId);
router.post("/newwine", NewWineControllers.addNewWine);
router.put("/newwinecommentary/:id", NewWineControllers.putCommentary);
router.get("/selectedwine/:id", SelectedWineControllers.read);
router.post("/selectedwine", SelectedWineControllers.add);
router.post("/tastingnote", TastingNoteControllers.add);
router.get("/tastingnote", TastingNoteControllers.browse);
router.get("/tastingnote/:id", TastingNoteControllers.getTastingNoteByUserId);
router.post(
  "/tastingnotehasexistingwine",
  TastingNoteHasExistingWineControllers.add
);
router.post(
  "/olfactivearomashastastingnote",
  OlfactiveAromasHasTastingNoteControllers.add
);
router.post(
  "/tastingnotehastasteflavor",
  TastingNoteHasTasteFlavorControllers.add
);
router.get(
  "/workshophasexistingwine",
  WorkshopHasExistingWineControllers.browse
);
router.get(
  "/workshophasexistingwine/:id_workshop",
  WorkshopHasExistingWineControllers.read
);
router.post("/workshophasexistingwine", WorkshopHasExistingWineControllers.add);
router.delete(
  "/workshophasexistingwine/:id_workshop",
  WorkshopHasExistingWineControllers.destroy
);
router.get("/nextworkshops", WorkshopControllers.getNextWorkshops);

// ---------------------------------------- Private Routes ----------------------------------------------

router.use(verifyToken);

router.get("/users/:id", UserControllers.read);
router.put("/users/:id", validateUser, UserControllers.edit);
router.get(
  "/workshophasexistingwine/:id_workshop",
  WorkshopHasExistingWineControllers.read
);

// ----------------------------------------- Admin routes ------------------------------------------------

router.use(verifyAdminCredentials);

router.get("/users", UserControllers.browse);
router.delete("/users/:id", UserControllers.destroy);
router.get("/admin/workshop/:id", UserControllers.getUserRegisteredToAWorkshop);
router.post("/grapevariety", GrapeVarietyControllers.add);
router.put("/grapevariety/:id", GrapeVarietyControllers.edit);
router.delete("/grapevariety/:id", GrapeVarietyControllers.destroy);
router.post("/existingwine", ExistingWineControllers.add);
router.put("/existingwine/:id", ExistingWineControllers.edit);
router.delete("/existingwine/:id", ExistingWineControllers.destroy);
router.post("/appellation", AppellationControllers.add);
router.put("/appellation/:id", AppellationControllers.edit);
router.delete("/appellation/:id", AppellationControllers.destroy);
router.post("/wineregion", WineRegionControllers.add);
router.put("/wineregion/:id", WineRegionControllers.edit);
router.delete("/wineregion/:id", WineRegionControllers.destroy);
router.get("/workshop", WorkshopControllers.browse);
router.get("/workshop/:id", WorkshopControllers.read);
router.put("/workshop/:id", WorkshopControllers.edit);
router.get("/workshop/date/:date", WorkshopControllers.getWorkshopByDate);

router.post("/workshop", WorkshopControllers.add);
router.delete("/workshop/:id", WorkshopControllers.destroy);
router.get(
  "/workshophasexistingwine",
  WorkshopHasExistingWineControllers.browse
);
router.post("/workshophasexistingwine", WorkshopHasExistingWineControllers.add);
router.delete(
  "/workshophasexistingwine/:id_workshop",
  WorkshopHasExistingWineControllers.destroy
);
router.put("/newwine/:id", NewWineControllers.edit);
router.delete("/newwine/:id", NewWineControllers.destroy);
router.get("/competitionselection", CompetitionSelectionControllers.browse);
router.get("/competitionselection/:id", CompetitionSelectionControllers.read);
router.put("/competitionselection/:id", CompetitionSelectionControllers.edit);
router.post("/competitionselection", CompetitionSelectionControllers.add);
router.delete(
  "/competitionselection/:id",
  CompetitionSelectionControllers.destroy
);

module.exports = router;
