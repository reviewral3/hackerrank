'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

function climbingLeaderboard(ranked, player) {
    const ranked_set = new Set(ranked)
    ranked = Array.from(ranked_set)
    player.reverse()
    
    let players_rank = []
    let n = 1
    
    if (ranked[ranked.length-1] > player[1]) {
        n = ranked.length
    }   

    let player_rank = n
     
    for (let i = 0; i < player.length; i++) {
        let pushed = false
        let j = player_rank-1
        console.log(j)
        player_rank = n
        for (j; j < ranked.length; j++) {
            if (ranked[j] <= player[i]) {
                players_rank.push(j+1)  
                pushed = true
                break
            } else {
                player_rank += 1
            }
        }
        if (!pushed) {
            players_rank.push(j+1)            
        }
    }
    return players_rank.reverse()
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const rankedCount = parseInt(readLine().trim(), 10);

    const ranked = readLine().replace(/\s+$/g, '').split(' ').map(rankedTemp => parseInt(rankedTemp, 10));

    const playerCount = parseInt(readLine().trim(), 10);

    const player = readLine().replace(/\s+$/g, '').split(' ').map(playerTemp => parseInt(playerTemp, 10));

    const result = climbingLeaderboard(ranked, player);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
