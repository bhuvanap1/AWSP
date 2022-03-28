module.exports = (mongoose) => {
  const Todo = mongoose.model(
  'Todo',
    mongoose.Schema(
      {
        title: String,
        dueDate: String,
        createdDate: String,
        createdBy: String,
        assignedTo: String,
        completed: Number,
      },
      { timestamps: true }
    )
  );

  return Todo;
};

