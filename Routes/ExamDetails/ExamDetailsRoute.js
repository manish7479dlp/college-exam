const express = require("express");
const router = express.Router();
const ExamDetails = require("../../Schema/ExamDetails/ExamDetailsSchema");

//Get Current Date;

const getCurrentDate = () => {
    const DateObject = new Date();
    let day = DateObject.getDate();
    let month = DateObject.getMonth();
    let year = DateObject.getFullYear();
    month++;

    day = day >= 1 && day <= 9 ? "0" + day : day;
    month = month >= 1 && month <= 9 ? "0" + month : month;
    return year + "-" + month + "-" + day;
};

const getCurrentTime = () => {
    const TimeObj = new Date();
    let hour = TimeObj.getHours();
    let minutes = TimeObj.getMinutes();
    hour = hour >= 1 && hour <= 9 ? "0" + hour : hour;
    minutes = minutes >= 1 && minutes <= 9 ? "0" + minutes : minutes;
    const time = hour + ":" + minutes;

    return time;
};

// calculate the exam  end time
const examEndTimeCalculator = (startTime, duration) => {
    // gives start time minutes and convert into number
    let stm = startTime.substring(3);
    stm -= "0";
    // gives start time hours and convert into number
    let sth = startTime.substring(0, 2);
    sth -= "0";

    // convert the exam duration into number.
    let d = duration - "0";

    // Total minutes
    const tm = stm + d;

    let etm = tm % 60;
    let eth = tm >= 60 ? (sth += parseInt(tm / 60)) : sth;

    etm = (etm >= 0) & (etm <= 9) ? "0" + etm : etm;
    eth = (eth >= 0) & (eth <= 9) ? "0" + eth : eth;

    const examEndTime = eth + ":" + etm;

    //    console.log(examEndTime);
    return examEndTime;
};
// gives the total duration of exam left for end exam
const examDurationLeft = (startTime, duration) => {
    const examEndTime = examEndTimeCalculator(startTime, duration);
    const currentTime = getCurrentTime();

    let examEndMinutes = examEndTime.substring(3);
    let currentTimeMinutes = currentTime.substring(3);

    examEndMinutes -= "0";
    currentTimeMinutes -= "0";

    let examEndHour = examEndTime.substring(0, 2);
    let currentTimeHour = currentTime.substring(0, 2);

    examEndHour -= "0";
    currentTimeHour -= "0";

    let tml = examEndMinutes - currentTimeMinutes;
    let thl = examEndHour - currentTimeHour;

    tml = thl > 0 ? thl * 60 + tml : tml;

    // console.log(tml);
    return tml;
};

// examDurationLeft("08:50", "20");

router.get("/exam_details", async (req, res) => {
    try {
        const response = await ExamDetails.find();
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/current_date_time", async (req, res) => {
    try {
        const data = {
            currentDate: getCurrentDate(),
            currentTime: getCurrentTime(),
        };
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/exam_details/:department", async (req, res) => {
    try {
        const response = await ExamDetails.find(req.params);
        console.log(response);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.get("/exam_details/:department/:semester", async (req, res) => {
    try {
        // const temp = req.params.semesterNumber;
        // console.log(req.params);
        const response = await ExamDetails.find(req.params);
        const CurrentDate = getCurrentDate();
        const result = response.filter((data) => {
            return data.examDate === CurrentDate;
        });

        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.post("/exam_details", async (req, res) => {
    try {
        const response = await ExamDetails(req.body);
        const result = await response.save();
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// this router return the examDuration left
router.get("/exam_duration_left/:department/:semester", async (req, res) => {
    try {
        const response = await ExamDetails.find(req.params);
        const CurrentDate = getCurrentDate();
        const result = response.filter((data) => {
            return data.examDate === CurrentDate;
        });
        const edl = examDurationLeft(result[0].examStartTime , result[0].examDuration);
        // console.log(typeof edl);
        res.send({edl});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = router;
