import express from 'express';
import { createCheckouts, getCheckouts, editCheckouts, patchCheckouts } from '../controllers/checkout.controller.js';

const route = express.Router();

route.post('/', createCheckouts)

route.get('/:id', getCheckouts)

route.put('/:id', editCheckouts)

route.patch('/:id', patchCheckouts)

export default route;