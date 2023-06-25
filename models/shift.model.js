module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            created_at: {
                type: Date,
                required: true
            },
            ended_at: {
                type: Date
            },
            employees: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Employee",
                required: true
            }],
        }
    );

    return mongoose.model("Shift", schema);
};