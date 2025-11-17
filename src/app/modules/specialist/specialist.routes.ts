import express, { NextFunction, Request, Response } from 'express';
import { UserRole } from '@prisma/client';
import { fileUploader } from '../../helper/fileUploader';
import { SpecialistsController } from './specialist.controller';
import { SpecialistsValidtaion } from './specialist.validation';
import { auth } from '../../middlewares/auth';


const router = express.Router();


// Task 1: Retrieve Specialties Data

/**
- Develop an API endpoint to retrieve all specialties data.
- Implement an HTTP GET endpoint returning specialties in JSON format.
- ENDPOINT: /specialties
*/
router.get(
    '/',
    SpecialistsController.getAllFromDB
);

router.post(
    '/',
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = SpecialistsValidtaion.create.parse(JSON.parse(req.body.data))
        return SpecialistsController.inserIntoDB(req, res, next)
    }
);



// Task 2: Delete Specialties Data by ID

/**
- Develop an API endpoint to delete specialties by ID.
- Implement an HTTP DELETE endpoint accepting the specialty ID.
- Delete the specialty from the database and return a success message.
- ENDPOINT: /specialties/:id
*/

router.delete(
    '/:id',
    auth(UserRole.ADMIN, UserRole.ADMIN),
    SpecialistsController.deleteFromDB
);

export const SpecialistsRoutes = router;