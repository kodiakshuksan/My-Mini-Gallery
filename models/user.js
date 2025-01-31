const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const commentSchema = new Schema({
    _id: { type: Number, required: true },
    content: { type: String, required: true },
    date: { type: Date }
})

const genreSchema = new Schema({
    keyword: { type: String, required: true },
});


const artSchema = new Schema([{
    title: { type: String, required: true },
    description: { type: String, required: true },
    src: { type: String, required: true },
    tags: [{ type: String, required: true }],
    user: { type: String, required: true },
    genre: [genreSchema],
    date: { type: Date },
    width: {type: Number, required: true },
    height: {type: Number, required: true },
    widthRatio: { type: Number },
    heightRatio: { type: Number },
    comments: [commentSchema]
}]);


const avatarSchema = new Schema({
    avatarSrc: { type: String },
    avatarWidthRatio: { type: Number },
    avatarHeightRatio: { type: Number }
})

const userSchema = new Schema({
    firstName: { type: String },
    username: { type: String, required: true },
    avatar: avatarSchema,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    description: { type: String },
    password: {
        type: String,
        trim: true,
        required: "Password is Required",
        validate: [({ length }) => length >= 6, "Password should be longer."]
    },
    // art: [{type: mongoose.Schema.Types.ObjectId, ref:"Art"}]
    art:[{type:String}]
});

const User = mongoose.model("User", userSchema);
const Art = mongoose.model("Art", artSchema)
const Genre = mongoose.model("Genre", genreSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Avatar = mongoose.model("Avatar", avatarSchema);

module.exports = { User,Art,Comment,Genre,Avatar };


