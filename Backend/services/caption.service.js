import Caption from "../models/caption.model.js";

export const createCaption = async ({
    firstName,
    lastName,
    email,
    password,
    color,
    vehicleType,
    capacity,
    plate,
}) => {
    if (
        !firstName ||
        !email ||
        !password ||
        !color ||
        !vehicleType ||
        !capacity ||
        !plate
    ) {
        throw new Error("All fields are required");
    }

    const caption = await Caption.create({
        fullName: {
            firstName,
            lastName,
        },
        email,
        password,
        vehicle: {
            color,
            vehicleType,
            capacity,
            plate,
        },
    });

    return caption;
};
