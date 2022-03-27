const express = require("express");
const router = express.Router();
const report = require("../controllers/reportController");

router
    .route("/")
    .post(
        report.createReport
    )
    // all report for all types for test
    .get(
        report.getAllReports
    )
//main router
router
    .route("/report/type/:type/target/:id")
    .get(
        report.getTReports
    )
router
    .route("/report/type/:type/reporter/:id")
    .get(
        report.getRReports
    )
// test routers
router
    .route("/target/:id")
    .get(
        report.getReportsByTarget
    )
router
    .route("/reporter/:id")
    .get(
        report.getReportsByReporter
    )


module.exports = router;