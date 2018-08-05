module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);

    var sectionModel = require('../models/section/section.model.server');

    function updateSection(req, res) {
        var section = req.body;
        sectionModel.updateSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId'];
        sectionModel.deleteSection(sectionId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        console.log(section);
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
};