const Report = require("../Models/reportModel");

exports.createReport = async (req, res, next) => {
    const { reporter, target, description, type, date } = req.body;
    try {
        const Report = new Report({
            reporter,
            target,
            description,
            type, // set by front-end depending on where is it made 
            date
        });
        const newReport = await Report.save();
        res.send(newReport);
    } catch (err) {
        next(err);
    }
};
//main api
//for target
exports.getTReports = async (req, res, next) => {
    const { type, id } = req.params;
    try {
        const Reports = await Report.find({ type: type }).find({ target: id });
        res.send(Reports);
    } catch (err) {
        next(err);
    }
};
// for reporter  display reporter reports in his page if needed
exports.getRReports = async (req, res, next) => {
    const { type, id } = req.params;
    try {
        const Reports = await Report.find({ type: type }).find({ reporter: id });
        res.send(Reports);
    } catch (err) {
        next(err);
    }
};
//apis for test
exports.getAllReports = async (req, res, next) => {
    try {
        const Reports = await Report.find();
        res.send(Reports);
    } catch (err) {
        next(err);
    }
};
exports.getReportsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
        const typeReports = await Report.find({ type: type });
        res.send(typeReports);
    } catch (err) {
        next(err);
    }
};
exports.getReportsByReporter = async (req, res, next) => {
    const { id } = req.params;
    try {
        const reporterReports = await Report.find({ reporter: id });
        res.send(reporterReports);
    } catch (err) {
        next(err);
    }
};
exports.getReportsByTarget = async (req, res, next) => {
    const { id } = req.params;
    try {
        const reporterReports = await Report.find({ target: id });
        res.send(reporterReports);
    } catch (err) {
        next(err);
    }
};
