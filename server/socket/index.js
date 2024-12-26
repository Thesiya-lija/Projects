// // import express from 'express';
// // import http from 'http';
// // import { Server } from 'socket.io';
// // import cors from 'cors';
// // import UserDetailToken from '../helper/UserDetailToken.js';
// // import UserModel from '../models/UserModel.js';
// // import { ConversationModel, MessageModel } from '../models/ConversationModel.js';

// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //   cors: {
// //     origin: 'http://localhost:3000',
// //     credentials: true,
// //   },
// // });

// // const onlineUser = new Set();

// // io.on('connection', async (socket) => {
// //   console.log('connected user', socket.id);
// //   const token = socket.handshake.auth.token;
// //   const user = await UserDetailToken(token);

// //   if (user) {
// //     socket.join(user._id.toString());
// //     onlineUser.add(user._id.toString());
// //     console.log('user', user);
// //     io.emit('onlineUser', Array.from(onlineUser));

// //     socket.on('message-page', async (userId) => {
// //       try {
// //         console.log('Userid', userId);
// //         const userDetails = await UserModel.findById(userId).select('-password');
// //         const payload = {
// //           _id: userDetails._id,
// //           name: userDetails.name,
// //           email: userDetails.email,
// //           profile_pic: userDetails.profile_pic,
// //           online: onlineUser.has(userId),
// //         };
// //         console.log('Sending user data:', payload);
// //         socket.emit('message-user', payload);
// //       } catch (error) {
// //         console.error('Error fetching user details:', error);
// //       }
// //     });

// //     socket.on('new message', async (data) => {
// //       try {
// //         let conversation = await ConversationModel.findOne({
// //           $or: [
// //             { sender: data.sender, receiver: data.receiver },
// //             { sender: data.receiver, receiver: data.sender },
// //           ],
// //         });
// //         if (!conversation) {
// //           const createConversation = new ConversationModel({
// //             sender: data.sender,
// //             receiver: data.receiver,
// //           });
// //           conversation = await createConversation.save();
// //         }

// //         const message = new MessageModel({
// //           text: data.text,
// //           msgByUserId: data.msgByUserId,
// //         });
// //         const saveMessage = await message.save();

// //         await ConversationModel.updateOne(
// //           { _id: conversation._id },
// //           { $push: { messages: saveMessage._id } }
// //         );

// //         const getConversationMessage = await ConversationModel.findOne({
// //           $or: [
// //             { sender: data.sender, receiver: data.receiver },
// //             { sender: data.receiver, receiver: data.sender },
// //           ],
// //         })
// //           .populate('messages')
// //           .sort({ updatedAt: -1 });

// //         io.to(data.sender).emit('message', getConversationMessage.messages);
// //         io.to(data.receiver).emit('message', getConversationMessage.messages);
// //       } catch (error) {
// //         console.error('Error handling new message:', error);
// //       }
// //     });

// //     socket.on('disconnect', () => {
// //       onlineUser.delete(user._id);
// //       console.log('disconnect', socket.id);
// //       io.emit('onlineUser', Array.from(onlineUser));
// //     });
// //   }
// // });

// // export { app, server };
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import UserDetailToken from '../helper/UserDetailToken.js';
// import UserModel from '../models/UserModel.js';
// import { ConversationModel, MessageModel } from '../models/ConversationModel.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     credentials: true,
//   },
// });

// const onlineUser = new Set();

// io.on('connection', async (socket) => {
//   console.log('connected user', socket.id);
//   const token = socket.handshake.auth.token;

//   let user;

//   try {
//     user = await UserDetailToken(token);
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     socket.emit('error', { message: 'Token expired or invalid. Please re-authenticate.' });
//     socket.disconnect();
//     return;
//   }

//   if (user) {
//     const userId = user._id.toString();
//     socket.join(userId);
//     onlineUser.add(userId);
//     console.log('user', user);
//     io.emit('onlineUser', Array.from(onlineUser));

//     socket.on('message-page', async (userId) => {
//       try {
//         console.log('Userid', userId);
//         const userDetails = await UserModel.findById(userId).select('-password');
//         const payload = {
//           _id: userDetails._id,
//           name: userDetails.name,
//           email: userDetails.email,
//           profile_pic: userDetails.profile_pic,
//           online: onlineUser.has(userId),
//         };
//         console.log('Sending user data:', payload);
//         socket.emit('message-user', payload);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     });

//     socket.on('new message', async (data) => {
//       try {
//         let conversation = await ConversationModel.findOne({
//           $or: [
//             { sender: data.sender, receiver: data.receiver },
//             { sender: data.receiver, receiver: data.sender },
//           ],
//         });

//         if (!conversation) {
//           const createConversation = new ConversationModel({
//             sender: data.sender,
//             receiver: data.receiver,
//           });
//           conversation = await createConversation.save();
//         }

//         const message = new MessageModel({
//           text: data.text,
//           msgByUserId: data.msgByUserId,
//         });
//         const saveMessage = await message.save();

//         await ConversationModel.updateOne(
//           { _id: conversation._id },
//           { $push: { messages: saveMessage._id } }
//         );

//         const getConversationMessage = await ConversationModel.findOne({
//           $or: [
//             { sender: data.sender, receiver: data.receiver },
//             { sender: data.receiver, receiver: data.sender },
//           ],
//         })
//           .populate('messages')
//           .sort({ updatedAt: -1 });

//         io.to(data.sender).emit('message', getConversationMessage.messages);
//         io.to(data.receiver).emit('message', getConversationMessage.messages);
//       } catch (error) {
//         console.error('Error handling new message:', error);
//       }
//     });

//     socket.on('disconnect', () => {
//       onlineUser.delete(userId);
//       console.log('disconnect', socket.id);
//       io.emit('onlineUser', Array.from(onlineUser));
//     });
//   }
// });

// export { app, server };

// Existing importsimport express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import UserDetailToken from '../helper/UserDetailToken.js';
import UserModel from '../models/UserModel.js';
import { ConversationModel, MessageModel } from '../models/ConversationModel.js';
import express from 'express'
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

const onlineUser = new Set();

io.on('connection', async (socket) => {
  console.log('Connected user:', socket.id);
  const token = socket.handshake.auth.token;

  let user;

  try {
    user = await UserDetailToken(token);
  } catch (error) {
    console.error('Error verifying token:', error);
    socket.emit('error', { message: 'Token expired or invalid. Please re-authenticate.' });
    socket.disconnect();
    return;
  }
  
  if (user) {
    const userId = user._id.toString();
    socket.join(userId);
    onlineUser.add(userId);
    console.log('User:', user);
    io.emit('onlineUser', Array.from(onlineUser));

    socket.on('message-page', async (userId) => {
      try {
        console.log('User ID:', userId);
        const userDetails = await UserModel.findById(userId).select('-password');
        const payload = {
          _id: userDetails._id,
          name: userDetails.name,
          email: userDetails.email,
          profile_pic: userDetails.profile_pic,
          online: onlineUser.has(userId),
        };
        console.log('Sending user data:', payload);
        socket.emit('message-user', payload);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    });

    socket.on('new message', async (data) => {
      try {
        let conversation = await ConversationModel.findOne({
          $or: [
            { sender: data.sender, receiver: data.receiver },
            { sender: data.receiver, receiver: data.sender },
          ],
        });

        if (!conversation) {
          const createConversation = new ConversationModel({
            sender: data.sender,
            receiver: data.receiver,
          });
          conversation = await createConversation.save();
        }

        const message = new MessageModel({
          text: data.text,
          msgByUserId: data.msgByUserId,
        });
        const saveMessage = await message.save();

        await ConversationModel.updateOne(
          { _id: conversation._id },
          { $push: { messages: saveMessage._id } }
        );

        const getConversationMessage = await ConversationModel.findOne({
          $or: [
            { sender: data.sender, receiver: data.receiver },
            { sender: data.receiver, receiver: data.sender },
          ],
        })
          .populate('messages')
          .sort({ updatedAt: -1 });

        io.to(data.sender).emit('message', getConversationMessage.messages);
        io.to(data.receiver).emit('message', getConversationMessage.messages);
      } catch (error) {
        console.error('Error handling new message:', error);
      }
    });

    socket.on('delete message', async ({ messageId, sender, receiver }) => {
      try {
        const message = await MessageModel.findById(messageId);

        if (!message) {
          return socket.emit('error', { message: 'Message not found.' });
        }

        if (message.msgByUserId.toString() !== userId) {
          return socket.emit('error', { message: 'You are not authorized to delete this message.' });
        }

        await ConversationModel.updateOne(
          { messages: messageId },
          { $pull: { messages: messageId } }
        );

        await MessageModel.findByIdAndDelete(messageId);

        const updatedConversation = await ConversationModel.findOne({
          $or: [
            { sender: sender, receiver: receiver },
            { sender: receiver, receiver: sender },
          ],
        }).populate('messages');

        io.to(sender).emit('message', updatedConversation.messages);
        io.to(receiver).emit('message', updatedConversation.messages);

      } catch (error) {
        console.error('Error deleting message:', error);
        socket.emit('error', { message: 'Error!!!' });
      }
    });

    socket.on('disconnect', () => {
      if (user) {
        const userId = user._id;
        onlineUser.delete(userId);
        console.log('Disconnected:', socket.id);
        io.emit('onlineUser', Array.from(onlineUser));
      }
    });
  }
});

export { app, server };
