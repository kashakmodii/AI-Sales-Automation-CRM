// ===============================
// AI CRM Lead Form Submission
// ===============================

const webhookURL = "https://ata360.app.n8n.cloud/webhook-test/lead-capture";


document
.getElementById("leadForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();


    const leadData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        phone: document.getElementById("phone").value,

        service: document.getElementById("service").value,

        business_type: document.getElementById("business_type").value,

        budget: document.getElementById("budget").value,

        message: document.getElementById("message").value,

        source: "Website"

    };


    const responseMessage =
    document.getElementById("responseMessage");


    responseMessage.innerHTML =
    "⏳ Sending your request...";


    try {


        const response = await fetch(webhookURL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },


            body: JSON.stringify(leadData)

        });


        if (response.ok) {


            responseMessage.innerHTML =
            "✅ Thank you! Your request has been submitted successfully.";


            document
            .getElementById("leadForm")
            .reset();


        } 
        
        else {


            responseMessage.innerHTML =
            "❌ Failed to submit your request.";

        }


    } 
    
    catch(error) {


        console.error(error);


        responseMessage.innerHTML =
        "❌ Unable to connect to CRM server.";

    }


});




// ===============================
// AI CRM Chatbot
// ===============================


const chatBox =
document.getElementById("chat-box");


const chatInput =
document.getElementById("chat-input");


const sendButton =
document.getElementById("send-btn");




function addMessage(sender, message) {


    const messageElement =
    document.createElement("div");


    messageElement.classList.add("chat-message");


    if(sender === "user") {

        messageElement.innerHTML =
        "👤 You: " + message;

    }

    else {


        messageElement.innerHTML =
        "🤖 AI: " + message;

    }


    chatBox.appendChild(messageElement);


    chatBox.scrollTop =
    chatBox.scrollHeight;


}




function getBotResponse(message) {


    message =
    message.toLowerCase();



    if(message.includes("hello") || message.includes("hi")) {


        return "Hello! Welcome to our AI CRM services. How can I assist you today?";


    }


    if(message.includes("service")) {


        return "We provide Website Development, AI Automation, CRM Setup and Digital Marketing services.";


    }


    if(message.includes("price") || message.includes("budget")) {


        return "Our pricing depends on your requirements. Please fill the lead form and our team will provide a custom quote.";


    }


    if(message.includes("contact")) {


        return "Please submit your details using the lead form. Our team will contact you within 24 hours.";


    }


    if(message.includes("ai")) {


        return "We build AI chatbots, automation systems, AI CRM solutions and intelligent workflows.";


    }


    return "I didn't understand that. Please ask about our services, pricing, AI solutions or contact process.";

}



// Send button click

sendButton.addEventListener("click", function() {


    const userMessage =
    chatInput.value.trim();



    if(userMessage === "") {


        return;

    }



    addMessage("user", userMessage);



    setTimeout(function() {


        const reply =
        getBotResponse(userMessage);


        addMessage("bot", reply);


    }, 500);



    chatInput.value = "";


});




// Enter key support


chatInput.addEventListener("keypress", function(e) {


    if(e.key === "Enter") {


        sendButton.click();


    }


});