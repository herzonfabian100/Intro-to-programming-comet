let today = new Date();
const ThisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("P"); // Create paragraph
copyright.innerHTML = `&copy;Fabian Aparicio  ${ThisYear}`;
footer.appendChild(copyright);

const skills = ["Web sides", "JavaScript", "Html", "Internet Conection", "GIT", "GitHub", "Visual Studio"];
const skillsSection = document.getElementById("skills1");
const skillsList = skillsSection.querySelector("ul");
//Show up skill
for (let i = 0; i < skills.length; i++) {
    var skill = document.createElement("li");
    skill.innerHTML = `${skills[i]}`;
    skillsList.appendChild(skill);
}
// Get Form with DOM
const messageForm = document.querySelector('form[name="leave_message"]');
console.log(messageForm);
const submit = document.querySelector('button[type="submit"]');
console.log(submit);



function HideMessages() {
    document.getElementById("messages").style.visibility = "hidden";
}
HideMessages();

function ShowMessages() {
    document.getElementById("messages").style.visibility = "visible";

}




function ResetForm() {
    document.getElementById("Form_Message").reset();
}

submit.addEventListener('click', ButtonElements);



function ButtonElements(event) {
    event.preventDefault();
    ShowMessages();

    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const textarea = document.querySelector('textarea[name="message"]');
    console.log(name.value);
    console.log(email.value);
    console.log(textarea.value);
    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');




    //Create message 
    newMessage.innerHTML = `<div>
        <span class="strong">${textarea.value}</span>
        <p>${today.toLocaleString()} from <a class="link" href="mailto:${
        email.value
      }">${name.value}</a> &nbsp;</p>
      </div>`;
    messageList.appendChild(newMessage);

    //Create BUTTON

    const removeButton = document.createElement('BUTTON');
    removeButton.innerText = 'remove';
    removeButton.setAttribute('type', 'button');
    newMessage.appendChild(removeButton);
    removeButton.addEventListener('click', deleteItem)

    function deleteItem(e) {
        const entry = e.target.parentNode;
        entry.remove();
        console.log(entry);

    }

    ResetForm();
}
//Display Projects in GitHub
const githubRequest = new XMLHttpRequest();

githubRequest.onreadystatechange = function() {
    if (githubRequest.readyState === 4 && githubRequest.status === 200) {
        var repositories = JSON.parse(this.response);
        console.log(repositories);

        var projectSection = document.querySelector('#projects');
        var projectList = projectSection.getElementsByTagName('ul')[0];

        for (let i = 0; i < repositories.length; i += 1) {
            let project = document.createElement("li");
            let UrlRepo = document.createElement("a");
            UrlRepo.href = repositories[i].html_url;
            //project.innerText = $repositories[i].name " Date " created_at;
            project.innerHTML = `<div>
            <span class="strong"> ${repositories[i].name }</span>
            <span> Created  :  ${ new Date(repositories[i].created_at).toDateString()}</span>
            </div>`;
            UrlRepo.appendChild(project);
            projectList.appendChild(UrlRepo);



        }


    }
};
githubRequest.open('GET', 'https://api.github.com/users/herzonfabian100/repos');
githubRequest.send();