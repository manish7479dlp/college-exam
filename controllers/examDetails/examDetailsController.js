const examDetailsModel = require("../../models/examDetails/examDetails");

// get all examDetails
const getAllExamDetails = async (req, res) => {
    try {
        const response = await examDetailsModel.find();
        if (response.length === 0) {
            res.send({ status: false, message: "No Data Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//get particular Exam Details on the basis of subject Name.
const getParticularExamDetails = async (req, res) => {
    try {
        const subject = req.params.subject;
        const response = await examDetailsModel.find({ subject });

        if (response.length === 0) {
            res.send({ status: false, message: "Exam Details Not Found" });
        } else {
            res.send({ status: true, response: response });
        }
    } catch (error) {
        res.send(error);
    }
};

//register exam details
const registerExamDetails = async (req, res) => {
    try {
        const { semester, subject, examDate, examStartTime, examDuration } =
            req.body;

        const validation = await examDetailsModel.findOne({ subject });
        console.log(validation);
        if (validation) {
            res.send({
                status: false,
                message: "Question details already Present",
            });
        } else {
            const response = new examDetailsModel({
                semester,
                subject,
                examDate,
                examStartTime,
                examDuration,
            });
            const result = await response.save();
            res.status(201).send({
                status: true,
                message: "Data Inserted Sucessfully",
            });
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

//update exam details on the basis of id.
const updateParticularExamDetails = async (req, res) => {
    try {
        const { semester, subject, examDate, examStartTime, examDuration } =
            req.body;
        const id = req.params._id;
        await examDetailsModel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    semester,
                    subject,
                    examDate,
                    examStartTime,
                    examDuration,
                },
            }
        );

        res.send({ status: true, message: "Details Updated Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

//delete particular exam details on the basis of id..
const deleteParticularExamDetails = async (req, res) => {
    try {
        const id = req.params._id;
        await examDetailsModel.findByIdAndDelete({ _id: id });
        res.send({ status: true, message: "Data Deleted Sucessfully" });
    } catch (error) {
        res.send(error);
    }
};

//check today is any exam.
const isAnyExamToday = async (req, res) => {
    try {
        const { semester } = req.params;
        const now = new Date();
        const month = now.getMonth() + 1;
        const date = now.getDate();
        //generate today date in yyyy-mm-dd formate
        const toDayDate = `${now.getFullYear()}-${
            month >= 1 && month <= 9 ? "0" + month : month
        }-${date >= 1 && date <= 9 ? "0" + date : date}`;
        const response = await examDetailsModel.find({ semester });

        if (response.length === 0) {
            res.send({ status: false, message: "Exam Details not Found." });
        } else {
            const result = response.filter((data) => {
                return data.examDate === toDayDate;
            });

            if (result.length === 0) {
                res.send({ status: false, message: "Today There is No Exam" });
            } else {
                res.send({ status: true, response: result });
            }
        }
    } catch (error) {
        res.send(error);
    }
};

const getCurrentTime = () => {
    const now = new Date();
    const minute = now.getMinutes();
    const hour = now.getHours();

    const currTime = `${hour >= 1 && hour <= 9 ? "0" + hour : hour}:${
        minute >= 1 && minute <= 9 ? "0" + minute : minute
    }`;

    return currTime;
};

const calExamEndtime = (examStartTime, examDuration) => {
    // const now = new Date();
    let minute = examStartTime.substring(3, 5);
    let hour = examStartTime.substring(0, 2);

    minute = parseInt(minute);
    examDuration = parseInt(examDuration);

    const temp = examDuration + minute;

    if (temp > 59) {
        hour = parseInt(hour) + parseInt(temp / 60);
        minute = temp % 60;
    } else {
        minute = temp;
    }

    minute = minute >= 1 && minute <= 9 ? "0" + minute : minute;
    // hour = hour >= 1 && hour <= 9 ? "0" + hour : hour;

    return `${hour}:${minute}`;
};

// return value is -ve means exam end or positive means either exam is happending and over if return value is greater than examDuration means exam over
const isValidTimeForExamination = (examStartTime, examDuration) => {
    const currTime = getCurrentTime();
    let currTimeHour = currTime.substring(0, 2);
    currTimeHour = parseInt(currTimeHour);
    let currTimeMinutes = currTime.substring(3, 5);
    currTimeMinutes = parseInt(currTimeMinutes);

    const examEndTime = calExamEndtime(examStartTime, examDuration);
    let examEndTimeHour = examEndTime.substring(0, 2);
    examEndTimeHour = parseInt(examEndTimeHour);
    let examEndTimeMinutes = examEndTime.substring(3, 5);
    examEndTimeMinutes = parseInt(examEndTimeMinutes);

    // console.log("Current Time = " + currTime);
    // console.log("End Time = " + examEndTime);

    let timeLeft = (examEndTimeHour - currTimeHour) * 60;
    timeLeft = timeLeft + examEndTimeMinutes - currTimeMinutes;

    return timeLeft;
};

// console.log(isValidTimeForExamination("11:50", "30"))

const mayStartExam = async (req, res) => {
    try {
        const _id = req.params._id;
        const response = await examDetailsModel.findById({ _id });

        const examStartConfirmation = isValidTimeForExamination(
            response.examStartTime,
            response.examDuration
        );

        if (examStartConfirmation < 0) {
            res.send({ status: false , message: "Exam is Over." });
        } else if(examStartConfirmation > response.examDuration){
            res.send({ status: false, message: "Exam is not Started" });
        } else {
            res.send({status: true})
        }
    } catch (error) {
        res.send(error);
    }
};

module.exports = {
    getAllExamDetails,
    getParticularExamDetails,
    deleteParticularExamDetails,
    updateParticularExamDetails,
    registerExamDetails,
    isAnyExamToday,
    mayStartExam,
};
