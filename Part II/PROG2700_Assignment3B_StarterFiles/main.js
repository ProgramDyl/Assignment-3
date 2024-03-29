// IIFE
(() => {

	//Choose an array method to implement for each of the incomplete functions.
	//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

	//Remember, you can chain together array function calls to attain your goals.
	// Ex: array.filter().map()

	//Get data for the TV Show "Friends"
	fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){    

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

	// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
	// (or a combination) ON THE PROVIDED JSON DATA

	// Define the required ten functions below this line...

        

    //FUNCTION 1
        // Create a function called getGuntherCount
        const getGuntherCount = function(jsonData) {

            const guntherArray = jsonData._embedded.episodes.filter(
                episode => episode.summary.includes("Gunther"));
            
            return guntherArray.length;
        };

    //FUNCTION 2
        //Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes

        //EXPECTED ANSWER 7080

        const getTotalRuntimeMinutes = function(jsonData){

            const totalRuntime = jsonData._embedded.episodes.reduce(
                (total,episode) => total + parseInt(episode.runtime),0);

            return totalRuntime;
        }; 

    //FUNCTION 3
        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000

       const getTotalEpisodesInYear = function(jsonData, year){
        const yearArray = jsonData._embedded.episodes.filter(
            episode => episode.airdate.includes(year));

        return yearArray.length;

       };

        //EXPECTED ANSWER 25
        

    //FUNCTION 4
        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.

        const getFemaleCastMembers = function(jsonData) {
            const femaleCastMembers = jsonData._embedded.cast.filter(
                castMember => castMember.person.gender === "Female").map(castMember => castMember.person.name);

                return femaleCastMembers;

            };
        //EXPECTED ANSWER [JENNIFER ANISTON, COURTNEY COX, LISA KUDROW]

    //FUNCTION 5
        //5 - Create a function called getEpisodeTitles() which returns a list of episodes that mentioned "Ursula"
        //    where the argument string is found in the episode summary.

        //EXPECTED ANSWER - "array[3]"

        const getEpisodeTitles = function(jsonData, searchValue) {

            const episodeTitles = jsonData._embedded.episodes.filter( 
                episode => episode.summary.includes(searchValue)).map(episode => episode.name);
            
            return episodeTitles;
        };

       


    //FUNCTION 6
        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.

        //EXPECTED ANSWER - COURTNEY COX, LISA KUDROW, DAVID SCHWIMMER

        const getCastMembersOver55 = function(jsonData){

            const currentDate = new Date();
            const dateOf55YearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 55));

            const olderCastArray = 
                jsonData._embedded.cast.filter(
                    castMember => new Date(castMember.person.birthday) < dateOf55YearsAgo).map(
                        castMember => castMember.person.name);

                
            return olderCastArray;
        };

    //FUNCTION 7
        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6

        // EXPECTED ANSWER 6330

        const getTotalRuntimeMinutesExcludingSeasonSix = function(jsonData){ 

            const totalRuntimeMinusSix = jsonData._embedded.episodes.filter(
                episode => episode.season !== "6").reduce(
                    (total, episode) => total + parseInt(episode.runtime), 0);

            return totalRuntimeMinusSix;
        };

    //FUNCTION 8
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name

        //EXPECTED ANSWER - JSON OBJECT OF EPISODE NAMES 

        const getFirstFourSeasons = function(jsonData){

            const getFirstFourSeasonEpisodes = jsonData._embedded.
            episodes.filter(
                episode => parseInt(episode.season) <= 4
                )
                .map(
                    (episode) => ({
                    season: episode.season,
                    name: episode.name
                })
            );
            return getFirstFourSeasonEpisodes;
        };

    //FUNCTION 9 
        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season

        // EXPECTED ANSWER: array = [24,24,25,24,24,25,24,24,24,18] 

        const getEpisodeTallyBySeason = function(jsonData){

            const seasonEpisodeTallies = jsonData._embedded.
            episodes.reduce(
                (totals, episode) => {
                    if(totals[episode.season]){
                        totals[episode.season] += 1;
                    }
                    else {
                        totals[episode.season] = 1;
                    }
                    return totals;
                }, {}
            );
                return seasonEpisodeTallies;
        };
        


    //FUNCTION 10
        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.

        //EXPECTED ANSWER - array[236]
                // names capitalized in SUMMARY and in TITLE

        const capitalizeTheFriends = function(jsonData){

            const friendNames = ["Joey", "Chandler", "Monica", "Rachel", "Phoebe", "Ross"]; 

            const capitalizeFriendsInEpisodes = jsonData._embedded.episodes.map(
                (episode) => ({
                    name: episode.name.replace(friendNames[0],friendNames[0].toUpperCase()),
                    summary: episode.summary.replace(friendNames[0],friendNames[0].toUpperCase())
                }))
                .map(
                    (episode) => ({
                        name: episode.name.replace(friendNames[1], friendNames[1].toUpperCase()),
                        summary: episode.summary.replace(friendNames[1],
                        friendNames[1].toUpperCase())
                }))
                .map(
                    (episode) => ({
                        name: episode.name.replace(friendNames[2], friendNames[2].toUpperCase()),
                        summary: episode.summary.replace(friendNames[2],
                            friendNames[2].toUpperCase())
                }))
                .map(
                    (episode) => ({
                        name: episode.name.replace(friendNames[3], friendNames[3].toUpperCase()),
                        summary: episode.summary.replace(friendNames[3],
                            friendNames[3].toUpperCase())
                }))
                .map(
                    (episode) => ({
                        name: episode.name.replace(friendNames[4], friendNames[4].toUpperCase()),
                        summary: episode.summary.replace(friendNames[4],
                            friendNames[4].toUpperCase())
                }))
                .map(
                    (episode) => ({
                        name: episode.name.replace(friendNames[5], friendNames[5].toUpperCase()),
                        summary: episode.summary.replace(friendNames[5],
                            friendNames[5].toUpperCase())
                }));

                return capitalizeFriendsInEpisodes;
                
        };

        
})(); // end IIFE

