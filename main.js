
function getCadetInfo() {
    //console.log("Testing...Testing...1.2.3...");
    let cadetName = document.getElementById("cadetName").value;
    let monLunch = (document.getElementById("monLunch").value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("monLunch").value;
    let tuesLunch = (document.getElementById("tuesLunch").value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("tuesLunch").value;
    let thursLunch = (document.getElementById("thursLunch").value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("thursLunch").value;
    let friLunch = (document.getElementById("friLunch").value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("friLunch").value; \

    console.log(`Cadet ${cadetName}: ${monLunch} on Monday, ${tuesLunch} on Tuesday, ${thursLunch} on Thursday, ${friLunch} on Friday`);
    let tableBody = document.getElementById("tableBody");
    let rowContent = `<tr><th>${cadetName}</th><th>|</th><th>${monLunch}</th><th>${tuesLunch}</th><th>${thursLunch}</th><th>${friLunch}</th></tr>`;
    tableBody.innerHTML += rowContent;

    //document.getElementById("cadetName").value = "";
    //document.getElementById("monLunch").value = "Daily Lunches";
    //document.getElementById("tuesLunch").value = "Daily Lunches";
    //document.getElementById("thursLunch").value = "Daily Lunches";
    //document.getElementById("friLunch").value = "Daily Lunches";

}