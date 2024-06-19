import User from "../model/User.js";

const addUser = async (req,res) => {
  try {
    const { email, name, address, contactNo, companyName } = req.body;

    if (!email || !name ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const imageDetail={
        imageName:req.file.originalname,
        bucketName:req.file.bucket,
        key:req.file.key
    }
    const newUser = new User({
      email,
      name,
      address,
      contactNo,
      companyName,
      image:imageDetail
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      newUser,
      message: "Successfully Got presigned URL",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while getting presigned URL",
    });
  }
};

export { addUser };
