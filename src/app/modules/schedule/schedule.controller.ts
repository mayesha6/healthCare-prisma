import { NextFunction, Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";

const insertIntoDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
   
    const result = await ScheduleService.insertIntoDB(req.body);
    
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Schedule created successfully.",
      data: result
    });
  }
);
const schedulesForDoctor = catchAsync(
  async (req: Request & {user?: IJWTPayload}, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ["startDateTime", "endDateTime"])
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])
   
    const user = req.user
    const result = await ScheduleService.schedulesForDoctor(user as IJWTPayload, filters, options);
    
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Schedule fetched successfully.",
      meta: result.meta,
      data: result.data
    });
  }
);
const deleteSchedulesFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
   
    const result = await ScheduleService.deleteSchedulesFromDB(id);
    
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Delete schedule successfully.",
      data: result
    });
  }
);

export const ScheduleController = {
  insertIntoDB,
  schedulesForDoctor,
  deleteSchedulesFromDB
};
