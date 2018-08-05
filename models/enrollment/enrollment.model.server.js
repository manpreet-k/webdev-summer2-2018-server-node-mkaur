const mongoose = require('mongoose');
const enrollmentSchema = require('./enrollment.schema.server');

const enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

enrollStudentInSection = (enrollment) =>
enrollmentModel.create(enrollment);

findSectionsForStudent = (studentId) =>
enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();

removeStudentFromSection = (enrollment) =>
enrollmentModel.find(enrollment).remove().exec();

module.exports = {
    enrollStudentInSection,
    findSectionsForStudent,
    removeStudentFromSection
};