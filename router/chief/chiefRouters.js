import express from 'express';
import { addInstitutionDetails } from '../../controller/chief/chiefController.js';



const chiefRouters = express.Router();

// GET Methods




// POST Methods
chiefRouters.post('/add-institution', addInstitutionDetails);



// PUT Methods




// DELETE Methods




export default chiefRouters;