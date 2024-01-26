
function PowerUsers(props){
    let activities = props.activities;
    let activityCount = new Map();
    for(let activity of activities){
        let userId = activity.userId
        if(!activityCount.has(userId)){
            activityCount.set(userId, 0);
        }
        activityCount.set(userId, activityCount.get(userId)+1);
    }
    let powerUsers = getPowerUsers(activityCount, props.users);
    



    return <h1>power users</h1>
}

function getPowerUsers(hashmap, users) {
    const entries = Array.from(hashmap);
    entries.sort((a, b) => b[1] - a[1]);
        
    const top20Index = Math.ceil(entries.length * 0.2);

    const top20 = entries.slice(0, top20Index).map((entry) => entry[0]);

    const bottom80 = entries.slice(top20Index).map((entry) => entry[0]);
    
    const split = {
        Power: top20,
        Normal: bottom80
    }
    let emailSplit = {
        Power: [],
        Normal: []
    }
    let totalActivitiesSplit ={
        Power: 0,
        Normal: 0
    }
    for(let user of users){
        let userId = user._id
        let email = user.email
        
        if(split.Power.includes(userId)){
            emailSplit.Power.push(email);
            totalActivitiesSplit.Power += hashmap.get(userId);
        }
        else if(split.Normal.includes(userId)){
            emailSplit.Normal.push(email);
            totalActivitiesSplit.Normal += hashmap.get(userId);
        }
    }
    //console.log(emailSplit)
    console.log(totalActivitiesSplit);
    return split;
}

export default PowerUsers;