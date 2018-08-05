const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

createSection = (section) =>
sectionModel.create(section);

findSectionsForCourse = (courseId) =>
sectionModel.find({courseId: courseId});

deleteSection = (sectionId) =>
sectionModel.findByIdAndRemove(sectionId)

updateSection = (section) =>
{
    sectionModel.update({
            _id: section.id
        },
        {
            $set: {title: section.title, maxCap: section.maxCap, rem: section.rem}
        });
}

decrementSectionCapacity = (sectionId) => {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {rem: -1}
    });
}

incrementSectionCapacity = (sectionId) => {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {rem: +1}
    });
}


module.exports = {
    createSection,
    findSectionsForCourse,
    deleteSection,
    updateSection,
    decrementSectionCapacity,
    incrementSectionCapacity
};