const {db} = require('../util/admin');
exports.getAllChats = (req, res) => {
    db.collection('chats')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let chats = [];
        data.forEach((doc) => {
            chats.push({
                chatId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt,
                userImage: doc.data().userImage
            })
        })
        return res.json(chats)
    })
    .catch((err) => console.log(err))
}
exports.sendAChat = (req, res) => {
    if(req.body.body.trim() === ''){
        return res.status(400).json({body: 'Please fill this textfield out before sending a message'})
    }
    const newChat = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString()
    }
    db.collection('chats')
    .add(newChat)
    .then(doc => {
        const resChat = newChat;
        resChat.chatId = doc.id;
        res.json(resChat);
    })
    .catch(err => {
        res.status(500).json({err: 'Something went Wrong'})
        console.log(err);
    })
}
//Send personal chats as well here
//Create Rooms as well  