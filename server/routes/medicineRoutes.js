const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");

router.post("/addmedicine", medicineController.addMedicine);
router.get("/getallmedicine", medicineController.getAllMedicines);
router.get("/getBymedicineId/:id", medicineController.getByMedicineId);
router.put("/:id", medicineController.updateMedicine);
router.delete("/:id", medicineController.deleteMedicine);

module.exports = router;
