const DiscordRPC = require('discord-rpc');
const config = require('./config.json');
const rpc = new DiscordRPC.Client({
	transport: 'ipc'
});
rpc.config = config;

// Gets all the variables needed
const countdownStart = config.Rich_Presence.countdown_start;
const countdownEnd = config.Rich_Presence.countdown_end;
const countdownDuration = config.Rich_Presence.countdown_duration;
const useCountdownEnd = config.Rich_Presence.use_countdown_end;
const countUp = config.Rich_Presence.count_up;
const disableTimer = config.Rich_Presence.disable_timer;
const refresh = config.Rich_Presence.refresh;
const refreshTime = config.Rich_Presence.refresh_time;

// The RPC object that is initialized
var rpcObject = {
	details: config.Rich_Presence.details,
	state: config.Rich_Presence.state,
	largeImageKey: config.Rich_Presence.file_bannername,
	largeImageText: config.Rich_Presence.bannername,
	smallImageKey: config.Rich_Presence.file_username,
	smallImageText: config.Rich_Presence.username,
	instance: false,
	partySize: config.Rich_Presence.partysize,
	partyMax: config.Rich_Presence.maxpartysize
};

// Sets the start time and end time for the RPC
function setRPCTime() {
	// Deletes the original variables first
	delete rpcObject.startTimestamp;
	delete rpcObject.endTimestamp;
	if (!disableTimer) {
		if (countUp) {
			// Count up, so only set the starting timestamp
			rpcObject.startTimestamp = countdownStart;
		} else if (useCountdownEnd) {
			rpcObject.startTimestamp = countdownStart;
			rpcObject.endTimestamp = countdownStart + countdownDuration;
		} else {
			rpcObject.startTimestamp = countdownStart;
			rpcObject.endTimestamp = countdownEnd;
		}
	}
}

rpc.on('ready', () => {
	console.clear();
	console.log(banner);
	console.log("Setting RPC activity...");
	
	//Sets the initial Rich Presence
	setRPCTime();
	rpc.setActivity(rpcObject).then(console.clear(), console.log(`RPC is now up and running!`))
	.catch(err => { });
	
	if (refresh) {
		// Activity can only be set every 15 seconds
		setInterval(() => {
		setRPCTime();
		rpc.setActivity(rpcObject).then(console.clear(), console.log(`Updated the RPC ${++config.Dont_Touch.updatecounter} time(s)!`)).catch(err => {});
	  }, (refreshTime * 1000));
	}
});
rpc.login(config.Client_Id).catch(console.error);