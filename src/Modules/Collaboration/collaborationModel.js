const CollaborationSchema = new mongoose.Schema(
  {
    paperId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    postedBy: {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
    },
    collaborators: [
      {
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      },
    ],
  },
  { timestamps: true }
);

const Collaboration = mongoose.model("Collaboration", CollaborationSchema);
