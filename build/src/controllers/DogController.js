"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemperament = exports.getDogById = exports.updateDog = exports.postDog = exports.getAllDogs = void 0;
const Dog_1 = require("../models/Dog");
const Temperament_1 = require("../models/Temperament");
const getAllDogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { temperament } = req.query;
    const order = parseInt(req.query.order);
    const { height, weight, search, alphabet } = req.query;
    const options = {
        limit: 9,
        page: parseInt(req.query.page),
        sort: { name: order },
    };
    console.log(alphabet);
    console.log(search);
    try {
        if (!height && !weight && !search && !alphabet) {
            const dogs = yield Dog_1.DogModel.paginate({ temperament: { "$regex": `${temperament}`, "$options": "i" },
            }, options);
            return res.status(200).json(dogs);
        }
        const dogs = yield Dog_1.DogModel.paginate({ temperament: { "$regex": `${temperament}`, "$options": "i" },
            height: { "$regex": `${height}`, "$options": "$gte" },
            weight: { "$regex": `${weight}`, "$options": "$gte" },
            name: { "$regex": `/^${alphabet}/i` },
        }, options);
        res.status(200).json(dogs);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllDogs = getAllDogs;
const postDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, weight, height, life_span, image, temperament, user } = req.body;
    console.log(req.body);
    try {
        const newDog = new Dog_1.DogModel({ name, weight, height, life_span, image, temperament, user });
        yield newDog.save();
        res.status(200).json(newDog);
    }
    catch (error) {
        next(error);
    }
});
exports.postDog = postDog;
const updateDog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    try {
        const dog = yield Dog_1.DogModel.findByIdAndUpdate(id, { $set: body }, { new: true });
        if (!dog) {
            res.status(400).json({ error: true, msg: 'the dog was not found' });
        }
        res.status(200).json(dog);
    }
    catch (error) {
        next(error);
    }
});
exports.updateDog = updateDog;
const getDogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const matchDog = yield Dog_1.DogModel.findById(id);
        if (!matchDog) {
            res.status(400).json({ error: true, msg: 'the dog was not found' });
        }
        else {
            res.status(200).json(matchDog);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getDogById = getDogById;
const getTemperament = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const {data} = await axios<dogApi[]>('https://api.thedogapi.com/v1/breeds')
        //  const temperaments = data.map(e=> e.temperament).join(',').replace('  ', '').split(',').filter(j => j !== '')
        //   const noSpace = [...temperaments].map(el  => el.trim())
        // const temperamentNoRepeats = new Set(noSpace)
        const temperaments = yield Temperament_1.TemperamentModel.find().sort({ name: 1 });
        if (!temperaments)
            res.status(400).json({ error: true, msg: 'there are no temperaments' });
        res.status(200).json(temperaments);
    }
    catch (error) {
        next(error);
    }
});
exports.getTemperament = getTemperament;
