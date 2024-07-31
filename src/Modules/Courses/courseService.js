const { default: mongoose } = require("mongoose");
const DbService = require("../../Service/DbService");
const serviceHandler = require("../../Utils/serviceHandler");
const uploadFileService = require("../../Utils/uploader");
const courseEnrollmentService = require("../CourseEnrollment/courseEnrollmentService");
const Course = require("./coursesModel");
const model = new DbService(Course);
const { ObjectId } = mongoose.Types;

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
    const { courseId, decodedUser } = dataId;

    console.log(decodedUser)

    const aggregatePipeline = [
      { $match: { _id: new ObjectId(courseId) , isDelete: false} },
      {
        $lookup: {
          from: "courseenrollments",
          let: { courseId: "$_id", studentId: new ObjectId(decodedUser._id) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$courseId", "$$courseId"] },
                    { $eq: ["$studentId", "$$studentId"] },
                    { $eq: ["$isEnrolled", true] },
                  ],
                },
              },
            },
          ],
          as: "isStudentEnrolled",
        },
      },
      {
        $addFields: {
          isStudentEnrolled: {
            $cond: {
              if: { $gt: [{ $size: "$isStudentEnrolled" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      },

      {
        $lookup: {
          from: "CourseEnrollment",
          let: { courseId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$courseId", "$$courseId"] },
              },
            },
            {
              $count: "enrollmentCount",
            },
          ],
          as: "enrollmentCount",
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $addFields: {
          instructor: { $arrayElemAt: ["$instructor", 0] },
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "courseId",
          as: "videos",
          pipeline: [
            {
              $project: {
                videoTitle: 1,
              },
            },
          ],
        },
      },
    ];
    const data = await model.aggregatePipeline(aggregatePipeline);
    return data[0];
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
