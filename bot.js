const Discord = require("discord.js");
const client = new Discord.Client();

var msgs = ["Maybe yes. Maybe no. Maybe go fuck yourself.",
            "Technically correct. The only kind of correct that matters.",
            "Yeetus that fetus.",
            "reeeeeeeeeeeeeeeeeee",
            "*clattering background noise* (afk)",
            "Citation needed",
            "Big daddy pull!",
            "So, how bout that Trump?",
            "You out of the closet yet, Casey?",
            "Good talk.",
            "Ya like jazz?",
            "Whew lad",
            "oh boiii",
            "This is bullshit! I did naaaaaaaaaaaaaaht."];

function send_maxbot_msg (prev_msg, channel) {
  var message = msgs[Math.floor(Math.random()*msgs.length)];
      if (prev_msg == null) {
        prev_msg = message;
      } else {
        while (message == prev_msg) {
          message = msgs[Math.floor(Math.random()*msgs.length)];
        }
      }
      console.log(message);
      channel.send(message, {tts: true}).catch(console.error);
  return message;
}

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity("the auction house");
  
  client.guilds.forEach((guild) => {
    var prev_msg = null;
    var last_seen_msg = new Object();
    last_seen_msg.createdTimestamp = 0;
    var msg_count = 3; //to be changed to dynamic msg count
    var msg_prob = 0.5;
    var conv_flag = false;
    
    //guild.defaultChannel.send("Skynet online, launching nukes", {tts: true}).catch(console.error);
    client.on ("message", curr_msg => {
      if (curr_msg.content == "!maxbot-disable") {
        prev_msg = null;
        last_seen_msg = new Object();
        last_seen_msg.createdTimestamp = 2535066508;
        msg_count = -1; //to be changed to dynamic msg count
        conv_flag = false;
        console.log("Disable command received and processed")
      }
      
      if (curr_msg.content == "!maxbot-reset") {
        prev_msg = null;
        last_seen_msg = new Object();
        last_seen_msg.createdTimestamp = 0;
        msg_count = 3; //to be changed to dynamic msg count
        conv_flag = false;
        curr_msg.bot = true;
        console.log("Reset command received and processed")
      }
      
      if (!curr_msg.author.bot) {
        if ((conv_flag || (curr_msg.createdTimestamp - last_seen_msg.createdTimestamp > 3600000)) && (Math.random() < msg_prob)) {
          //console.log("New timestamp: " + curr_msg.createdTimestamp)
          //console.log("Old timestamp: " + last_seen_msg.createdTimestamp)
          prev_msg = send_maxbot_msg (prev_msg, curr_msg.channel);
          conv_flag = true;
          msg_count = msg_count - 1;
          if (msg_count == 0) {
            conv_flag = false;
            msg_count = 3; //to be changed to dynamic msg count
            console.log("Exiting conversation mode")
          }
        }
        
        last_seen_msg = curr_msg;
      }
    });
  })
});

client.login(process.env.BOT_TOKEN);
