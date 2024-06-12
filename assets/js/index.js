const URL_BASE = "https://jsonplaceholder.typicode.com/posts";

const searchButton = document.getElementById("traerPost");
const postData = document.getElementById("postData")

searchButton.addEventListener("click", async function() {
    console.log("clickeaste, buscando información de los post...");
    const posts = await getPost(URL_BASE);
    posts === null ? showError(): printCard(posts);
});

async function getPost(apiURL) {
    try {
        const apiData = await fetch(apiURL);
        console.dir(apiData)
        if (apiData.ok){
            const jsonData = await apiData.json();
            return jsonData;
        };
        throw new Error("hubo un error");
    } catch (error) {
        console.log("¡Hay un error en la petición!", error);
        return null;
    }
}

function printCard(posts) {
    posts.forEach(post => {
      const card = `
    <div>
        <ul>
            <h2>Title: ${post.title}</h2><hr>
            <p>${post.body}</p>
        </ul>
    </div> 
    <br>
    `;
postData.innerHTML += card;
    }) 
}

function showError(){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hay un error en la petición de posts!",
        footer: ''
      });
};