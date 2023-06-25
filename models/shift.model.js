module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            started_at: {
                type: Date,
                required: true
            },
            ends_at: {
                type: Date,
                required: true
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