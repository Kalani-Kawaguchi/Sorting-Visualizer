const max = 100;
const min = 1;
const n = 100;
const speed = 10;
const arr = [];

let audioCtx = null;

function playNote(freq){
    if(audioCtx == null){
        audioCtx = new(AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const dur = 0.1;
    const osc = audioCtx.createOscillator();
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
    const node = audioCtx.createGain();
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(0, audioCtx.currentTime+dur);
    osc.connect(node);
    node.connect(audioCtx.destination);
}

function playArray(arr){
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i]);
    }
}

function init(){
    for(let i = 0; i < n; i++){
        arr[i] = (Math.floor(Math.random() * (max - min + 1) + min));
    }
    showBars();
}

function bubbleSort(){
    const copy = arr.slice();
    const moves = bubbleSortHelper(copy);
    animate(moves);
}

function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    const [i,j] = move.indices;
    if(move.type == "swap"){
        [arr[i],arr[j]] = [arr[j],arr[i]];
    }
    showBars(move);
    playNote(300+arr[i]*7);
    playNote(300+arr[j]*7);
    setTimeout(function(){
        animate(moves);
    }, speed);
}

function bubbleSortHelper(arr){
    const moves = [];
    do{
        var swapped = false;
        for(let i = 1; i < arr.length; i++){
            //moves.push({indices: [i-1, i], type:"comp"});
            if(arr[i - 1] > arr[i]){
                moves.push({indices: [i-1, i], type:"swap"});
                [arr[i-1], arr[i]] = [arr[i], arr[i-1]];
                swapped = true;
            }
            
        }
    }while(swapped);
    return moves;
}

function showBars(move){
    document.getElementById("array-container").innerHTML = "";
    for(let i=0; i<arr.length; i++){
        const bar = document.createElement("div");
        bar.style.height = arr[i]/max * 80 + "%";
        bar.classList.add("array-bar");
        // document.getElementById("array-container").insertAdjacentHTML("beforeend",`<div class="array-bar" style="height: ${arr[i]/max * 80}%"></div>`);
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = move.type=="swap" ? "red" : "orange";
            // playNote(arr[i]);
        }
        document.getElementById("array-container").appendChild(bar);
    }
}

Window.onload = init();
