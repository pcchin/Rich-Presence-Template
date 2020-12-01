# Rich Presence JavaScript example
> Template code to use Rich Presence on Discord.

Discord ~recently~ added [Rich Presence](https://discordapp.com/developers/docs/rich-presence/best-practices) for game developers but it can also be used by regular users.

![](https://i.imgur.com/p6WUZoi.png)

## Disclaimer
I don't claim to be good at JavaScript and this code is probably not optimized.
Feel free to contribute any optimization.

> Discord Rich Presence itself isn't that stable either so that may affect performance.

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win)|[Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)|[MacOS](https://git-scm.com/download/mac)) or [GitHub Desktop](https://desktop.github.com/) installed
- `node` [Version 8.4.0 or higher](https://nodejs.org)
- [Discord Application](https://discordapp.com/developers/applications/me)
- [pm2](https://pm2.keymetrics.io/) (Optional)

> NOTE: You can't use a VPS for hosting unless you implement it in something like a selfbot.

> NOTE 2: pm2 can only be installed after node is installed.

## Downloading

In a command prompt in your projects folder (wherever that may be) run the following:

`git clone https://github.com/pcchin/Rich-Presence-Template.git`

If you are using GitHub Desktop, then clone this repository (`https://github.com/pcchin/Rich-Presence-Template.git`) to your preferred location via the GUI.

Once finished: 

- Navigate to your projects folder in a command prompt
- Run `npm install`
- If there are any vulnerabilities, run `npm audix fix`
- Edit `config.json` and set it to your personal preferences. See [Configuration](#config).


## <a name="config"></a>Configuration

```json
{
    "Client_Id": "See step 5 of Creating your RPC application",

    "Rich_Presence":{
        "details": "[0]",
        "state": "[1]",
        "username": "[2]",
        "file_username": "[3]",
        "bannername": "[4]",
        "file_bannername": "[5]",
        "partysize": [6],
        "maxpartysize": [7],
        "countdown_start": [8],
        "countdown_end": [9],
        "countdown_duration": [10],
        "use_countdown_end": [11],
        "count_up": [12],
        "disable_timer": [13],
        "timezone": "[14]",
        "refresh": [15],
        "refresh_time": [16]
    },
    
    "Dont_Touch":{
        "updatecounter": 0
    }
}
```

0. `String` The text under your Application name. [Template strings](#template) can be used.
1. `String` Game state which will be placed on the left of your party information. [Template strings](#template) can be used. To not have a large asset, leave it blank.
2. `String` Text that will appear if mouse hovers over the small icon. [Template strings](#template) can be used.
3. `String` Filename of small asset you uploaded to your application. [See step 4 of Creating your RPC application](#createrpc). To not have a small asset, leave it blank.
4. `String` Text that will appear if mouse hovers over the large icon. [Template strings](#template) can be used.
5. `String` Filename of large asset you uploaded to your application. [See step 4 of Creating your RPC application](#createrpc).
6. `Int` The party size `Y` e.g. `(Y of X)`. [Special integer values](#template) can be used.
7. `Int` Max party size `X` e.g. `(Y of X)`. [Special integer values](#template) can be used.
8. `Int` Start time of the countdown in [Epochs](https://www.epochconverter.com/).
9. `Int` End time of the countdown in [Epochs](https://www.epochconverter.com/).
10. `Int` The duration of the countdown from the start time in seconds.
11. `Bool` Whether `countdown_end` or `countdown_duration` will be used. If `countdown_end` is used, `countdown_duration` will not be taken into account and vice versa. Defaults to `true`.
12. `Bool` If you want to show a count up instead of a countdown. If this is set to `true`, the values of \[9\], \[10\] and \[11\] will be ignored. Defaults to `false`.
13. `Bool` If you want to disable the timer entirely (no count ups or countdowns). If this is set to `true`, the values of \[8\], \[9\], \[10\], \[11\] and \[12\] will be ignored.
14: `Float` The hours difference from UTC that your time zone is located in. ***Must be a valid double enclosed in a string, such as "7.5"***
15. `Bool` If you want the RPC to update or not, defaults to `true`.
16. `Int` The time in seconds you want it to refresh. ***Must be >= 20***

## <a name="createrpc"></a>Creating your RPC application

0. [Create your application](https://discordapp.com/developers/applications/me).
1. Press **New app**.
2. Give your application an **App Name**. This will also be the main title of your Rich Presence and cannot be changed in config.json.
3. Press **Create App**. Scroll down and press **Enable Rich Presence**. 
> ***DON'T CREATE A BOT USER!***
4. Upload a large and/or small asset and name it to something easy to remember. (Optional)
5. Copy the Client Id and paste it in `config.json` in `Client_Id`.

> **You can safely share the application ID with others.**

## Starting the Rich Presence

To start the Rich Presence, in the command prompt, run the following command:
`node app.js`

If you are using pm2, the run the following in the command prompt: `pm2 node app.js` followed by `pm2 save`. If you would like to start the app again (such as after a restart), run `pm2 resurrect`.

> If it doesn't set immediately please wait for it to refresh (if set) or just re-node `app.js`

> This should only be started once your Discord is already running.

> NOTE: pm2 would not show you if the app fails to run. Hence, run the app with the same configurations first using just `node app.js` before running it in pm2.

If you need help or have questions add `Indy#6602` on Discord.

## Failure Conditions

The app will fail under the following circumstances:

- `timezone` is not a valid float.
- The value of `refresh_time` is less than 20
- `maxpartysize` is less than `partysize`
- `partysize` or `maxpartysize` is a decimal value
- `partysize` or `maxpartysize` is a negative integer and is not any of the [special integer values](#template).
- `countdown_end` has a smaller value than `countdown_start` (The countdown ends before it is even started). This is not checked if `countdown_end` is not used.

## Release History

* 0.2.0
    * Added template strings and special integer values
    * Added config options
    * Added failure conditions
* 0.1.1
    * Improved user friendliness.
    * ADD: `readme.md` for instructions.
    * ADD: `config.json` for the people that don't want to touch the code.
* 0.1.0
    * Custom RPC.
    * CHANGE: `app.js` now has more comments which is good.. I guess.
* 0.0.1
    * Functional performance. Very important.

## Contributing

1. Fork it (https://github.com/IndyV/Rich-Presence-Template/fork)
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

> NOTE: As the original repository has been archived, I'm not sure whether pull requests are still being accepted. - pcchin

## <a name="template"></a>Template Strings and Special Integer Values (SIV)

Template strings can be used to replace a specific string in your text with a dynamic value. For instance, a string countaining `${totalDaysRemaining} days / ${totalHoursRemaining} hours left` might be replaced with `5 days / 131 hours left`.

Certain integer values, similar to template strings, can be used to replace a specific integer (number) with a dynamic value. Those values are called special integer values, or SIV for short. For instance, a integer with the value of `-1` might be replaced with the total days of the countdown.

The table for the possible template strings, their special integer values their corresponding values are shown below. The example uses a countdown of `5 days, 13 hours, 44 minutes and 31 seconds` and `2 days, 15 hours, 6 minutes and 7 seconds` has elapsed. For the count up, the example assumes that `3 days, 17 hours, 13 minutes and 55 seconds` has elapsed. The current date in the example is `17 December 2020 15:34`

| Template String | SIV | Dynamic Values | Example Countdown | Example Count Up |
|-|-|-|-|-|
| ${totalDays} | -1 ||||
| ${totalHours} | -2 ||||
| ${totalMins} | -3 ||||
| ${totalSeconds} | -4 ||||
| ${totalHoursInDay} | -5 ||||
| ${totalMinsInDay} | -6 ||||
| ${totalSecondsInDay} | -7 ||||
| ${totalMinsInHour} | -8 ||||
| ${totalSecondsInHour} | -9 ||||
| ${totalSecondsInMin} | -10 ||||
| ${elapsedDays} | -11 ||||
| ${elapsedHours} | -12 ||||
| ${elapsedMins} | -13 ||||
| ${elapsedHoursInDay} | -14 ||||
| ${elapsedMinsInDay} | -15 ||||
| ${elapsedMinsInHour} | -16 ||||
| ${remainingDays} | -17 ||||
| ${remainingHours} | -18 ||||
| ${remainingMins} | -19 ||||
| ${remainingHoursInDay} | -20 ||||
| ${remainingMinsInDay} | -21 ||||
| ${remainingMinsInHour} | -22 ||||
| ${currentYear} | -23 ||||
| ${currentMonthNumber} | -24 ||||
| ${currentMonthTextShort} | -25 ||||
| ${currentMonthTextLong} | -26 ||||
| ${currentDayInYear} | -27 ||||
| ${currentDayInMonth} | -28 ||||
| ${currentHourInYear} | -29 ||||
| ${currentHourInMonth} | -30 ||||
| ${current24Hour} | -31 ||||
| ${current12Hour} | -32 ||||
| ${currentAMOrPM} | -33 ||||
| ${currentMinuteInYear} | -34 ||||
| ${currentMinuteInMonth} | -35 ||||
| ${currentMinuteInDay} | -36 ||||
| ${currentMinuteInHour} | -37 ||||

// TODO: Complete

> NOTE: All the dynamic values are rounded down.

## Contact

Add `Indy#6602` on Discord!

This fork is currently being maintained by `Pcchin#6153`.

Distributed under the MIT license. See ``LICENSE`` for more information.

## Thanks to

* Jackz#7627
* [devsnek](https://github.com/devsnek)
