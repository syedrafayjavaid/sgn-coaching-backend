const Package = require("../../models/Package");


const getCoachPackages = async (req, res) => {


    try {
        const coachId = req.params.id;
        const packages = await Package.find({ coachId });
        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }

}

const createCoachPackage = async (req, res) => {

    const data = req.body;
    try {
        const packages = await Package.create(data);
        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
            errorCode: error.code
        })
    }

}

const updateCoachPackage = async (req, res) => {

    try {
        const id = req.body.id;
        const data = req.body;
        data.modifiedOn = new Date();

        // updating record
        const package = await Package.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!package) {
            res.status(404).json({
                success: false,
                error: `Package record  not found with the id ${id}`
            })
        }
        else {
            res.status(200).json({
                success: true,
                data: package,
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

const deleteCoachPackage = async (req, res) => {


    try {
        const id = req.body.id;
        const package = await Package.findByIdAndDelete(id);
        if (!package) {
            return res.status(404).json({
                success: false,
                error: `Package record not found with the id ${id}`
            })
        }
        else {
            return res.status(200).json({
                success: true,
                msg: `Package record deleted with the id ${id}`,
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


module.exports = { getCoachPackages, createCoachPackage, updateCoachPackage, deleteCoachPackage }