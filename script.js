/* ===================================================
                DISASTER OS
             MAIN SCRIPT (PART 1)
===================================================*/

/* =========================
        MAP SETUP
========================= */

const map = L.map("map").setView([12.9716, 77.5946], 10);

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
    attribution:"© OpenStreetMap"
}
).addTo(map);

/* =========================
      GLOBAL VARIABLES
========================= */

let ambulances = 15;
let rescueTeams = 12;
let medicalKits = 120;
let foodKits = 230;

let incidentMarkers = [];

/* =========================
      DEFAULT INCIDENTS
========================= */

let incidents = [

{
id:101,
lat:12.9716,
lng:77.5946,
type:"Flood",
location:"Bangalore East",
people:120,
severity:"High",
status:"Active"
},

{
id:102,
lat:13.0216,
lng:77.6246,
type:"Fire",
location:"Industrial Zone",
people:45,
severity:"Medium",
status:"Active"
}

];

/* =========================
      LOAD SAVED INCIDENTS
========================= */

const savedIncidents =
JSON.parse(localStorage.getItem("incidents")) || [];

savedIncidents.forEach(item=>{

incidents.push({

id:item.id,

lat:12.95+Math.random()*0.08,

lng:77.55+Math.random()*0.08,

type:item.type,

location:item.location,

people:item.people,

severity:item.severity,

status:item.status

});

});

/* =========================
      DRAW INCIDENTS
========================= */

function loadIncidents(){

incidentMarkers.forEach(marker=>{

map.removeLayer(marker);

});

incidentMarkers=[];

incidents.forEach(incident=>{

let color="red";

switch(incident.type){

case "Fire":

color="orange";

break;

case "Earthquake":

color="purple";

break;

case "Cyclone":

color="blue";

break;

case "Landslide":

color="brown";

break;

default:

color="red";

}

const marker=L.circleMarker(

[incident.lat,incident.lng],

{

radius:8,

color:color,

fillColor:color,

fillOpacity:1

}

).addTo(map);

marker.bindPopup(

`
<b>${incident.type}</b>

<br>

Location : ${incident.location}

<br>

Severity : ${incident.severity}

<br>

People : ${incident.people}

`
);

incidentMarkers.push(marker);

});

}

loadIncidents();

/* =========================
      USER LOCATION
========================= */

if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(

(position)=>{

L.marker([

position.coords.latitude,

position.coords.longitude

])

.addTo(map)

.bindPopup("📍 Your Location");

}

);

}

/* ===================================================
            DISASTER OS
         MAIN SCRIPT (PART 2)
===================================================*/

/* =========================
      LIVE CLOCK
========================= */

function updateClock(){

const clock =
document.getElementById("liveClock");

if(clock){

clock.innerHTML =
new Date().toLocaleTimeString();

}

const sync =
document.getElementById("lastSync");

if(sync){

sync.innerHTML =
new Date().toLocaleTimeString();

}

}

updateClock();

setInterval(updateClock,1000);

/* =========================
      RESCUE TEAM
========================= */

let rescueTeam = {

lat:12.93,

lng:77.65

};

const rescueMarker =

L.marker([

rescueTeam.lat,

rescueTeam.lng

])

.addTo(map)

.bindPopup("🟢 Alpha Rescue Team");

setInterval(()=>{

rescueTeam.lat += 0.002;

rescueTeam.lng += 0.0015;

rescueMarker.setLatLng([

rescueTeam.lat,

rescueTeam.lng

]);

},3000);

/* =========================
      INCIDENT FEED
========================= */

const liveFeed=[

"🚨 Flood reported near Whitefield",

"🔥 Fire detected in Koramangala",

"⛰ Landslide warning issued",

"🌪 Cyclone alert updated",

"🚑 Medical Team dispatched",

"🚒 Fire Brigade reached incident",

"🏠 Evacuation in progress"

];

function updateIncidentFeed(){

const feed =

document.getElementById("incidentFeed");

if(!feed) return;

const message =

liveFeed[

Math.floor(

Math.random()*liveFeed.length

)

];

const severity =

["high","medium","low"][

Math.floor(Math.random()*3)

];

feed.innerHTML =

`

<div class="incident ${severity}">

<span>${message}</span>

<span>

${severity.toUpperCase()}

</span>

</div>

` + feed.innerHTML;

}

updateIncidentFeed();

setInterval(updateIncidentFeed,7000);

/* =========================
      RESOURCE PANEL
========================= */

function updateResources(){

const vehicles =
document.getElementById("ambulances");

const teams =
document.getElementById("teams");

const medical =
document.getElementById("medical");

const food =
document.getElementById("food");

const boats =
document.getElementById("boats");

const helicopters =
document.getElementById("helicopters");

if(vehicles)
vehicles.innerHTML=ambulances;

if(teams)
teams.innerHTML=rescueTeams;

if(medical)
medical.innerHTML=medicalKits;

if(food)
food.innerHTML=foodKits;

if(boats)
boats.innerHTML=8;

if(helicopters)
helicopters.innerHTML=3;

}

updateResources();

/* =========================
      DASHBOARD STATS
========================= */

function updateStats(){

const total =
document.getElementById("totalIncidents");

if(total)
total.innerHTML=incidents.length;

const active =
document.getElementById("activeIncidents");

if(active){

let count=

incidents.filter(

i=>i.status==="Active"

).length;

active.innerHTML=count;

}

const resolved =
document.getElementById("resolvedIncidents");

if(resolved){

let count=

incidents.filter(

i=>i.status==="Resolved"

).length;

resolved.innerHTML=count;

}

const high =
document.getElementById("highPriority");

if(high){

let count=

incidents.filter(

i=>i.severity==="High"

).length;

high.innerHTML=count;

}

const counter =
document.getElementById("incidentCount");

if(counter)
counter.innerHTML=incidents.length;

}

updateStats();

/* =========================
      NOTIFICATIONS
========================= */

function addNotification(message){

const panel =

document.getElementById("notifications");

if(!panel) return;

panel.innerHTML=

`

<p>

${new Date().toLocaleTimeString()}

—

${message}

</p>

`

+ panel.innerHTML;

}

addNotification("🟢 DisasterOS Started Successfully");


/* ===================================================
            DISASTER OS
         MAIN SCRIPT (PART 3)
===================================================*/

/* =========================
      INCIDENT FORM
========================= */

const incidentForm =
document.getElementById("incidentForm");

if(incidentForm){

incidentForm.addEventListener("submit",function(e){

e.preventDefault();

/* -------------------------
   GET FORM DATA
------------------------- */

const type =
document.getElementById("type").value;

const location =
document.getElementById("location").value || "Unknown Location";

const people =
Number(document.getElementById("people").value) || 0;

const description =
document.getElementById("description").value || "No Description";

/* -------------------------
   SEVERITY
------------------------- */

let severity="Medium";

switch(type){

case "Flood":
severity="High";
break;

case "Fire":
severity="Medium";
break;

case "Earthquake":
severity="Critical";
break;

case "Cyclone":
severity="Critical";
break;

case "Landslide":
severity="High";
break;

default:
severity="Medium";

}

/* -------------------------
   AI RESPONSE
------------------------- */

let response="Deploy emergency team.";

switch(type){

case "Flood":
response="Deploy rescue boats and medical teams.";
break;

case "Fire":
response="Dispatch fire brigade immediately.";
break;

case "Cyclone":
response="Open relief shelters.";
break;

case "Earthquake":
response="Mobilize search & rescue units.";
break;

case "Landslide":
response="Block nearby roads and deploy rescue teams.";
break;

}

/* -------------------------
   AI CONFIDENCE
------------------------- */

const confidence =
90 + Math.floor(Math.random()*10);

/* -------------------------
   RANDOM MAP LOCATION
------------------------- */

const lat =
12.95 + Math.random()*0.08;

const lng =
77.55 + Math.random()*0.08;

/* -------------------------
   CREATE INCIDENT
------------------------- */

const incident={

id:Date.now(),

lat:lat,

lng:lng,

type:type,

location:location,

people:people,

description:description,

severity:severity,

status:"Active",

time:new Date().toLocaleString()

};

/* -------------------------
   SAVE INCIDENT
------------------------- */

incidents.push(incident);

let history =
JSON.parse(localStorage.getItem("incidents")) || [];

history.push(incident);

localStorage.setItem(

"incidents",

JSON.stringify(history)

);

/* -------------------------
   UPDATE MAP
------------------------- */

loadIncidents();

/* -------------------------
   UPDATE AI PANEL
------------------------- */

const priority =
document.getElementById("priorityIncident");

if(priority)
priority.innerHTML=type;

const risk =
document.getElementById("riskLevel");

if(risk)
risk.innerHTML=severity;

const impact =
document.getElementById("estimatedImpact");

if(impact)
impact.innerHTML=people;

const deploy =
document.getElementById("deployment");

if(deploy)
deploy.innerHTML="Alpha Rescue Team";

const score =
document.getElementById("confidence");

if(score)
score.innerHTML=confidence+"%";

const updated =
document.getElementById("lastUpdated");

if(updated)
updated.innerHTML=new Date().toLocaleTimeString();

/* -------------------------
   UPDATE AI RESULT
------------------------- */

const result =
document.getElementById("result");

if(result){

result.style.display="block";

result.innerHTML=`

<h3>

AI INCIDENT ASSESSMENT

</h3>

<br>

<strong>Category :</strong>

${type}

<br><br>

<strong>Severity :</strong>

${severity}

<br><br>

<strong>Estimated Affected Population :</strong>

${people}

<br><br>

<strong>Priority Score :</strong>

${(8+Math.random()*2).toFixed(1)} / 10

<br><br>

<strong>AI Confidence :</strong>

${confidence}%

<br><br>

<strong>Recommended Response :</strong>

<ul style="margin-top:10px;padding-left:20px;">

<li>${response}</li>

<li>Notify nearby hospitals</li>

<li>Deploy Alpha Rescue Team</li>

</ul>

`;

}

/* -------------------------
   UPDATE RESOURCES
------------------------- */

if(ambulances>0)
ambulances--;

if(rescueTeams>0)
rescueTeams--;

updateResources();

/* -------------------------
   UPDATE DASHBOARD
------------------------- */

updateStats();

/* -------------------------
   NOTIFICATION
------------------------- */

addNotification(

`🚨 ${type} reported at ${location}`

);

/* -------------------------
   CLEAR FORM
------------------------- */

incidentForm.reset();

});

}

/* ===================================================
            DISASTER OS
         MAIN SCRIPT (PART 4)
===================================================*/

/* =========================
      LOCATE ME BUTTON
========================= */

const locateBtn = document.getElementById("locateBtn");

if (locateBtn) {

    locateBtn.addEventListener("click", () => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition((position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            map.setView([lat, lng], 14);

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("📍 Your Current Location")
                .openPopup();

        });

    });

}

/* =========================
      REFRESH MAP
========================= */

const refreshBtn = document.getElementById("refreshBtn");

if (refreshBtn) {

    refreshBtn.addEventListener("click", () => {

        loadIncidents();

        addNotification("🔄 Map Refreshed");

    });

}

/* =========================
      QUICK ACTION BUTTONS
========================= */

const deployBtn =
document.getElementById("deployBtn");

if(deployBtn){

deployBtn.addEventListener("click",()=>{

addNotification("🚑 Alpha Rescue Team Deployed");

alert("Alpha Rescue Team Dispatched!");

});

}

const evacuateBtn =
document.getElementById("evacuateBtn");

if(evacuateBtn){

evacuateBtn.addEventListener("click",()=>{

addNotification("🏠 Evacuation Started");

alert("Evacuation Order Issued!");

});

}

const medicalBtn =
document.getElementById("medicalBtn");

if(medicalBtn){

medicalBtn.addEventListener("click",()=>{

addNotification("🏥 Medical Support Activated");

alert("Medical Teams Activated!");

});

}

const refreshDashboard =
document.getElementById("refreshDashboard");

if(refreshDashboard){

refreshDashboard.addEventListener("click",()=>{

updateStats();

updateResources();

loadIncidents();

addNotification("📊 Dashboard Updated");

});

}

/* =========================
      INCIDENT HISTORY
========================= */

const incidentTable =
document.querySelector("#incidentTable tbody");

if(incidentTable){

const history =

JSON.parse(localStorage.getItem("incidents")) || [];

history.forEach(item=>{

incidentTable.innerHTML += `

<tr>

<td>${item.id}</td>

<td>${item.type}</td>

<td>${item.location}</td>

<td>${item.severity}</td>

<td>${item.status}</td>

<td>${item.time}</td>

</tr>

`;

});

}

/* =========================
      SEARCH INCIDENTS
========================= */

const search =
document.getElementById("search");

if(search){

search.addEventListener("keyup",()=>{

const filter =
search.value.toLowerCase();

const rows =
document.querySelectorAll("#incidentTable tbody tr");

rows.forEach(row=>{

const text =
row.innerText.toLowerCase();

row.style.display =
text.includes(filter)
?
""
:
"none";

});

});

}

/* =========================
      GENERATE REPORT
========================= */

const reportBtn =
document.getElementById("generateReport");

if(reportBtn){

reportBtn.addEventListener("click",()=>{

const history =
JSON.parse(localStorage.getItem("incidents")) || [];

let flood=0;
let fire=0;
let earthquake=0;
let cyclone=0;
let landslide=0;

history.forEach(i=>{

switch(i.type){

case "Flood":
flood++;
break;

case "Fire":
fire++;
break;

case "Earthquake":
earthquake++;
break;

case "Cyclone":
cyclone++;
break;

case "Landslide":
landslide++;
break;

}

});

alert(

`DISASTER REPORT

Total Incidents : ${history.length}

Flood : ${flood}

Fire : ${fire}

Earthquake : ${earthquake}

Cyclone : ${cyclone}

Landslide : ${landslide}

Generated :
${new Date().toLocaleString()}`

);

});

}

/* =========================
      INITIAL LOAD
========================= */

updateResources();

updateStats();

loadIncidents();

console.log("✅ DisasterOS Loaded Successfully");