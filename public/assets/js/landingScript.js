document.addEventListener("DOMContentLoaded",(e)=>
{
M.AutoInit();
let submitEl = document.querySelector(".submit")
submitEl.addEventListener("click",(e)=>
{
    e.preventDefault()
    let userData = {
        username: document.querySelector("#username-signup").value.trim(),
        email: document.querySelector("#email-signup").value.trim(),
        password: document.querySelector("#password-signup").value.trim(),
        location: document.querySelector("#medium").value.trim(),
    }
    if (!userData.username || !userData.password || !userData.email || !userData.location) {
        return;
    }
    console.log(userData)
    $.post("/signup",userData).then(()=>{
        console.log("success!")

    }).catch(()=>{
        console.log("error")
    }
    )

})
});