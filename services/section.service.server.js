module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.get('/api/section/:sectionId', findSectionById);
    app.delete('/api/section/:sectionId', deleteSection);
    app.put('/api/section/:sectionId', updateSection);
    app.put('/api/section/:sectionId/enroll', enrollStudentInSection);
    app.delete('/api/section/:sectionId/unenroll', removeStudentFromSection);
    app.get('/api/student/section', findAllSectionsForStudent);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function updateSection(req, res) {
        var section = req.body;
        console.log(section);
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

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function removeStudentFromSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session['currentUser'];
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .incrementSectionCapacity(sectionId)
            .then(function () {
                return enrollmentModel
                    .removeStudentFromSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params['sectionId'];
        var currentUser = req.session['currentUser'];
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionCapacity(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }

    function findAllSectionsForStudent(req, res) {
        var currentUser = req.session['currentUser'];
        var studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function findSectionById(req, res){
        var sectionId = req.params['sectionId'];
        sectionModel.findSectionById(sectionId)
            .then(function(section){
                res.json(section);
            });
    }
};