import { Request } from "express";
import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../shared/prisma";
import { Specialist } from "@prisma/client";

const inserIntoDB = async (req: Request) => {

    const file = req.file;

    if (file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialist.create({
        data: req.body
    });

    return result;
};

const getAllFromDB = async (): Promise<Specialist[]> => {
    return await prisma.specialist.findMany();
}

const deleteFromDB = async (id: string): Promise<Specialist> => {
    const result = await prisma.specialist.delete({
        where: {
            id,
        },
    });
    return result;
};

export const SpecialistsService = {
    inserIntoDB,
    getAllFromDB,
    deleteFromDB
}