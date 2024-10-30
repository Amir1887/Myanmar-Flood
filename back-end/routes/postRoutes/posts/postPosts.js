const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../../../uploadedPosts")); // Folder to save files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

const upload = multer({ storage: storage });
router.post("/posts", upload.single("photo"), async (req, res) => {
  const prsedOrgId = req.body.organizationId
    ? parseInt(req.body.organizationId)
    : null;
  // Log the uploaded file for debugging
  console.log("Uploaded file: ", req.file);
  console.log("Uploaded text: ", req.content);
  console.log("Request Body From posts: ", req.body);
  try {
    const {
      content,
      imageUrl,
      createdAt,
      updatedAt,
      userId,
      orgMemberId,
      higherOrgId,
      decisionMakerId,
    } = req.body;

    // Construct a URL for the image if the file was uploaded
    const newPhoto = req.file ? `/uploadedPosts/${req.file.filename}` : null;

    const newPostData = await prisma.post.create({
      data: {
        content,
        imageUrl: newPhoto, // Use the image path here if provided
        createdAt,
        updatedAt,
        userId: userId ? parseInt(userId) : null,
        organizationId: prsedOrgId, // Use the parsed organizationId
        orgMemberId: orgMemberId ? parseInt(orgMemberId) : null,
        higherOrgId: higherOrgId ? parseInt(higherOrgId) : null,
        decisionMakerId: decisionMakerId ? parseInt(decisionMakerId) : null,
      },
    });

    res.status(201).json(newPostData);
  } catch (error) {
    console.error("Error inserting new Post Data: ", error);
    res.status(500).json({
      error: "Failed to insert newPostData ",
      details: error.message,
    });
  }
});

module.exports = router;
