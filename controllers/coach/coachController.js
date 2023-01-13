const { default: mongoose } = require("mongoose");
const Coach = require("../../models/Coach");
const _ = require('underscore');


const getCoaches = async (req, res) => {

    const coach = await Coach.find();
    res.status(200).json({
        success: true,
        count: coach.length,
        data: coach,
    });

}

const getCoach = async (req, res) => {

    try {
        const coach = await Coach.aggregate([
            {
                $match: { _id: mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "_id",
                    foreignField: "coachId",
                    as: "packages"
                }
            }
        ]);
        if (!coach.length > 0) {
            res.status(404).json({
                success: false,
                error: `Coach not found with the id ${req.params.id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: coach,
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }
}

const updateCoach = async (req, res) => {


    try {

        const id = req.params.id;
        const data = req.body;
        data.modifiedOn = new Date();

        // making unique arrays before update
        data.language = _.uniq(data.laxguage);
        data.targetAudience = _.uniq(data.targetAudience);
        data.Specialties = _.uniq(data.Specialties);
        data.coachingTypes = _.uniq(data.coachingTypes);

        // updating record
        const coach = await Coach.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!coach) {
            res.status(404).json({
                success: false,
                error: `Coach record  not found with the id ${id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: coach,
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }


}

const deleteCoach = async (req, res) => {

    try {

        const id = req.params.id;
        const coach = await Coach.findByIdAndDelete(id);
        if (!coach) {
            res.status(404).json({
                success: false,
                error: `Coach record not found with the id  ${id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                msg: `Coach record deleted with the id ${id}`,
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }



}


module.exports = { getCoaches, getCoach, updateCoach, deleteCoach }