// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     default: ""
//   },
//   imageUrl: {
//     type: String,
//     default: ""
//   },
//   videoUrl: {
//     type: String,
//     default: ""
//   },
//   seen: {
//     type: Boolean,
//     default: false
//   },
//   msgByUserId:{
//     type: mongoose.Schema.ObjectId,
//     required: true,
//     ref: 'User'
//   }
// }, {
//   timestamps: true
// });

// const conversationSchema = new mongoose.Schema({
//   sender: {
//     type: mongoose.Schema.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   receiver: {
//     type: mongoose.Schema.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   messages: [{
//     type: mongoose.Schema.ObjectId,
//     ref: 'Message'
//   }]
// }, {
//   timestamps: true
// });

// const MessageModel = mongoose.model('Message', messageSchema);
// const ConversationModel = mongoose.model('Conversation', conversationSchema);

// export  { MessageModel };

// export{ConversationModel}
















//...............................New Code Encrypt messages

import mongoose from 'mongoose';
import crypto from 'crypto';

const encryptionKey = '12345678901234567890123456789012'; 
const iv = '1234567890123456'; 

const isHex = (str) => /^[0-9a-fA-F]+$/.test(str);

const encrypt = (text) => {      
  if (!text) return ""; 
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);//create cipher
  let encrypted = cipher.update(text, 'utf8', 'hex');//encrypt text utf-8 to hex
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) return ""; 
  if (!isHex(encryptedText)) {
    return encryptedText; 
  }

  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv); //same param as a encr 
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8'); //hex to ut8
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    return encryptedText; 
  }
};

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    default: "",
    set: (text) => encrypt(text),  
    get: (encryptedText) => decrypt(encryptedText) 
  },
  imageUrl: {
    type: String,
    default: ""
  },
  
  videoUrl: {
    type: String,
    default: ""
  },

  seen: {
    type: Boolean,
    default: false
  },
  msgByUserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { getters: true }, 
  toObject: { getters: true }
});

const conversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  },
  messages: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true
});


const MessageModel = mongoose.model('Message', messageSchema);
const ConversationModel = mongoose.model('Conversation', conversationSchema);

export { MessageModel, ConversationModel };
