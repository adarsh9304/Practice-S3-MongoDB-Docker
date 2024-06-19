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
    const newUser = new User({
      email,
      name,
      address,
      contactNo,
      companyName,
    });
    await newUser.save();

    return res.status(200).json({
      success: true,
      newUser,
      message: "New User Added",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error while adding User",
    });
  }
};

export { addUser };
