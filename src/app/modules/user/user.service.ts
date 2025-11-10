import { Request } from "express";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async(req: Request)=>{
    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.patient.profilePhoto = uploadResult?.secure_url
        console.log(uploadResult)
    }
    const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER_BCRYPTJS))

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashPassword,
            }
        })

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result
}
const createDoctor = async(req: Request)=>{
    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.doctor.profilePhoto = uploadResult?.secure_url
        console.log(uploadResult)
    }
    const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER_BCRYPTJS))

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data: {
                email: req.body.doctor.email,
                password: hashPassword,
            }
        })

        return await tnx.doctor.create({
            data: req.body.doctor
        })
    })

    return result
}
const createAdmin = async(req: Request)=>{
    if(req.file){
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.admin.profilePhoto = uploadResult?.secure_url
        console.log(uploadResult)
    }
    const hashPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT_NUMBER_BCRYPTJS))

    const result = await prisma.$transaction(async(tnx)=>{
        await tnx.user.create({
            data: {
                email: req.body.admin.email,
                password: hashPassword,
            }
        })

        return await tnx.admin.create({
            data: req.body.admin
        })
    })

    return result
}

export const UserService = {
    createPatient,
    createDoctor,
    createAdmin,
}