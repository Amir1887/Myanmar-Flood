const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

// Check if a like exists  
router.get("/likes/check-user", async (req, res) => {  
  const { postId, userId } = req.query;  
  
  try {  
    const existingUserLike = await prisma.like.findFirst({  
      where: {  
        postId: parseInt(postId),  
        userId: parseInt(userId)   
      },  
    });  
    res.status(200).json(existingUserLike);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to check like status of user Post" });  
  }  
});  
// Check if a like exists  
router.get("/likes/check-org", async (req, res) => {  
  const { postId, organizationId } = req.query;  
  
  try {  
    const existingOrgLike = await prisma.like.findFirst({  
      where: {  
        postId: parseInt(postId),  
        organizationId: parseInt(organizationId)   
      },  
    });  
    res.status(200).json(existingOrgLike);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to check like status of org Post" });  
  }  
});  

// Handle like creation  
router.post("/make-likes-user", async (req, res) => {  
  const { postId, userId } = req.body;  

  try {  
    const existingLike = await prisma.like.findFirst({  
      where: {  
        postId: parseInt(postId),  
        userId: parseInt(userId)   
      },  
    });  

    if (existingLike) {  
      return res.status(409).json({ message: "Already liked" });  
    }  

    const newLikeData = await prisma.like.create({  
      data: { postId: parseInt(postId), userId: parseInt(userId) , organizationId:  undefined }
    });  
    res.status(201).json(newLikeData);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to insert new like data" });  
  }  
});  
// Handle like creation  
router.post("/make-likes-org", async (req, res) => {  
  const { postId,  organizationId } = req.body;  

  try {  
    const existingLike = await prisma.like.findFirst({  
      where: {  
        postId: parseInt(postId),  
        organizationId:  parseInt(organizationId)   
      },  
    });  

    if (existingLike) {  
      return res.status(409).json({ message: "Already liked" });  
    }  

    const newLikeData = await prisma.like.create({  
      data: { postId: parseInt(postId), userId: undefined, organizationId: parseInt(organizationId) },  
    });  
    res.status(201).json(newLikeData);  
  } catch (error) {  
    res.status(500).json({ error: "Failed to insert new like data" });  
  }  
});  

// Get like count for a specific post
router.get("/likes/count", async (req, res) => {
  const { postId } = req.query;

  try {
    const likeCount = await prisma.like.count({
      where: { postId: parseInt(postId) },
    });
    res.status(200).json({ count: likeCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch like count" });
  }
});


// Delete a like  
router.delete("/delete-user-likes", async (req, res) => {  
  const { postId, userId } = req.query;  

  try {  
    const deletedLike = await prisma.like.deleteMany({  
      where: {  
        postId: parseInt(postId),  
        ...(userId ? { userId: parseInt(userId) } : {}) 
      },  
    });  

    if (deletedLike.count === 0) {  
      return res.status(404).json({ message: "Like not found" });  
    }  

    res.status(204).json({ message: "Like removed" });  
  } catch (error) {  
    res.status(500).json({ error: "Failed to delete like" });  
  }  
});
// Delete a like  
router.delete("/delete-org-likes", async (req, res) => {  
  const { postId, organizationId } = req.query;  

  try {  
    const deletedLike = await prisma.like.deleteMany({  
      where: {  
        postId: parseInt(postId),   
        ...(organizationId ? { organizationId: parseInt(organizationId) } : {}),  
      },  
    });  

    if (deletedLike.count === 0) {  
      return res.status(404).json({ message: "Like not found" });  
    }  

    res.status(204).json({ message: "Like removed" });  
  } catch (error) {  
    res.status(500).json({ error: "Failed to delete like" });  
  }  
});
 



module.exports = router;
