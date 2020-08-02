function display(){
    for(var i = 0; i < arguments.length; i++){
        console.log(arguments[i] + " ");
    }
}

// display notify ------------------
function displayNotify(id){
    var id = document.getElementById(id);
    id.style.display = "block";
}

// hide notify ---------------------
 function hideNotify(){
    var notify = document.querySelectorAll(".notify-section .notify");
    notify.forEach( (item) => { item.style.display = "none"; } )
} 

//created a function to count the attempts made to submit the correct pin
window.onload = function(){
    var attemptCount = 3;

    //section for generating a random pin (1000 to 9999):
    const generateRandomPin = document.getElementById('generate-random-pin');
    generateRandomPin.addEventListener('click', function(){
        const randomPin = Math.round(1000 + Math.random() * 9000);
        document.getElementById('random-pin-display').value = randomPin;
        hideNotify();
    })

    //entering the generated pin using the calculator buttons:
    var calcButtonClass = document.getElementsByClassName("button");
    for(var i = 0; i < calcButtonClass.length; i++){
        calcButtonClass[i].addEventListener("click",function(){
            var buttonText = this.innerText;
            
            if(buttonText >= "0" && buttonText <= "9"){
                document.getElementById("pin-input-display").value += buttonText;
            }
            else if(buttonText == "<"){
                var newNumber = document.getElementById("pin-input-display").value.slice(0, -1);
                document.getElementById("pin-input-display").value = newNumber;
            }
            else if(buttonText == "C"){
                document.getElementById("pin-input-display").value = "";
            }
            display(document.getElementById("pin-input-display").value);
            hideNotify();
        })
    }

    // action after clicking submit button:
    var submitButton = document.getElementById("pin-submit");
    submitButton.addEventListener("click",function(){
        hideNotify(); // clear notify section
        attemptCount--; //"attemptCount" has been declared at line 21
        var generatedPinValue = document.getElementById("random-pin-display").value;
        var pinInputValue = document.getElementById("pin-input-display").value;
        
        if(generatedPinValue == "" || pinInputValue == ""){
            displayNotify("empty");
        }
        else if( pinInputValue == generatedPinValue){
            displayNotify("correct");
            attemptCount = 3;
        }else{
            displayNotify("wrong");
        }
        //attempts made to enter the correct pin are being handled here:
        if(attemptCount >= 0){
            document.getElementById("attempt-left").innerText = attemptCount + " attempt left";
        }
    })
}
