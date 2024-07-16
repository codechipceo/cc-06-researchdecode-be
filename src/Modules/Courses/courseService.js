const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const uploadFileService = require("../../Utils/uploader");
const Course = require("./coursesModel");
const model = new DbService(Course);

const courseService = {
  create: serviceHandler(async (data) => {
    const { files } = data;
    const courseThumbnail = files["courseThumbnail"][0].path;
    const courseBanner = files["courseBanner"][0].path;

    const bannerResult = await uploadFileService.uploadFile(
      courseBanner,
      "Images",
      "auto"
    );
    const thumbnailResult = await uploadFileService.uploadFile(
      courseThumbnail,
      "Images",
      "auto"
    );

    data.courseBanner = bannerResult.secure_url;
    data.courseThumbnail = thumbnailResult.secure_url;
    return await model.save(data);
  }),

  getAll: serviceHandler(async (data) => {
    const role = data.userRole;

    const query = { isDelete: false };
    if (role === "TEACHER") {
      query.createdBy = data.createdBy;
    }
    const populate = [
      {
        path: "instructor",
      },
    ];
    const options = { ...data, populate };

    const savedData = await model.getAllDocuments(query, options);
    const totalCount = await model.totalCounts({ isDelete: false });
    return { savedData, totalCount };
  }),
  getById: serviceHandler(async (dataId) => {
    const { courseId } = dataId;
    const query = { isDelete: false, _id: courseId };
    const populateOptions = [{ path: "instructor" }];
    const savedDataById = await model.getDocumentById(query, populateOptions);
    return savedDataById;
  }),
  update: serviceHandler(async (updateData) => {
    const { courseId } = updateData;
    const filter = { _id: courseId };
    const updatePayload = { ...updateData };
    const updatedDoc = await model.updateDocument(filter, updatePayload);
    return updatedDoc;
  }),
  delete: serviceHandler(async (deleteId) => {
    const { courseId } = deleteId;
    const deletedDoc = await model.updateDocument(
      { _id: courseId },
      { isDelete: true }
    );
    return deletedDoc;
  }),
};

module.exports = courseService;
