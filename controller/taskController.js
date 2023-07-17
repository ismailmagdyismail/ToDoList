const Task = require('../models/taskModel');

module.exports.getTasks = async function getTasks(req,res){
    try {
        const tasks = await Task.find({})
        res.status(200).json({
            "status":"success",
            "data":{
                "tasks":tasks
            }
        });
    }catch (err){
        res.status(500).json({
            "status":"fail",
            "message": err.message
        });
    }
};

module.exports.createTask = async function(req,res){
    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            "status":"success",
            "data":{
                "tasks":task
            }
        });
    }catch (err){
        res.status(500).json({
            "status":"fail",
            "message": err.message
        });
    }
};

module.exports.deleteTask = async function(req,res){
    try {
        if(!req.params.id){
            res.status(400).json({
                "status":"fail",
                "message": "didn't specify ID"
            });
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).json({
            "status":"success",
            "data":null
        });
    }catch (err){
        res.status(500).json({
            "status":"fail",
            "message": err.message
        });
    }
};

module.exports.getTaskByID = async function(req,res){
    try {
        if(!req.params.id){
            res.status(400).json({
                "status":"fail",
                "message": "didn't specify ID"
            });
        }
        const task = await Task.find({_id:req.params.id});
        res.status(200).json({
            "status":"success",
            "data":{
                "task":task
            }
        });
    }catch (err){
        res.status(500).json({
            "status":"fail",
            "message": err.message
        });
    }
};

module.exports.updateTask = async function(req,res){
    try {
        if(!req.params.id){
            res.status(400).json({
                "status":"fail",
                "message": "didn't specify ID"
            });
        }
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });
        res.status(200).json({
            "status":"success",
            "data":{
                "task":task
            }
        })
    }catch (err){
        res.status(500).json({
            "status":"fail",
            "message": err.message
        });
    }
}