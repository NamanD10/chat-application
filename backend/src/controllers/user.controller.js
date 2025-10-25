import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers (req, res) {

    try{
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and : [
                {_id: {$ne : currentUserId}},
                {$id: {$in : currentUser.friends}},
                { isOnboarded: true },
            ]
        });
        res.status(200).json(recommendedUsers);
    }catch (error) {
        console.error("Error in getRecommendedUsers controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }


};


export async function getUserFriends (req, res) {
    try{
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic interests");

        res.status(200).json(user.friends);

    }catch(error) {

        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({
            message: "Internal server Error"
        });
    }

};

export async function sendFriendRequest (req, res) { 
    try{
        const myId = req.user.id;
        const {id : recipientId} = req.params.id;

        if(myId == recipientId){
            return res.status(400).json({
                message: "You can't send a friend request to yourself"
            });
        }

        const recipient = await User.findById(recipientId);
        if(!recipient) {
            return res.status(404).json({
                message: "Recipient not found"
            });
        }

        //check if user is already friends
        if(recipient.friends.includes(myId)) {
            return res.status(400).json({
                message: "You are already friends with this user"
            });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient:myId},
            ],
        });

        if(existingRequest) {
            return res.status(400).json({
                message: "A friend request between users already exists"
            });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json({
            friendRequest
        });

    } catch(error) {

    }
};

export async function acceptFriendRequest (req, res) {
    try {
        const { id: requestId } = req.params;

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ 
                message: "Friend request not found" 
            });
        }

        // To verify the current user is the recipient
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ 
                message: "You are not authorized to accept this request" 
            });
        }

        friendRequest.status = "accepted";
        await friendRequest.save();

        // add each user to the other's friends array
        // $addToSet: adds elements to an array only if they do not already exist.
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { 
                friends: friendRequest.recipient 
            },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { 
                friends: friendRequest.sender 
            },
        });

        res.status(200).json({ 
            message: "Friend request accepted" 
        });
  
    } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
    }
};

export async function getFriendRequests (req, res) {

    try{
        const incomingreqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName, profilePic, interests");

        const acceptedReqs = await FriendRequest.find({
            recipient: req.user.id,
            status: "accepted",
        }).populate("recipient", "fullName, profilePic");
    
    } catch (error) {
        console.log("Error in getPendindFriendRequests controller", error.message);
        res.status(500).json({
            message: "Internal server error"
        });
    }

};

export async function getOutgoingFriendRequests (req, res) {
    try{
        const outgoingFriendRequest = FriendRequest.find({
            sender: req.user.id,
            status: "pending",
        })
        .populate("recipient", "fullName profilePic interests");
    } catch (error) { 
        console.error("Error in getOutgoingFriendRequests controller", error.message);
        res.send(500).json({
            message: "Internal Server Error"
        });
    } 
};