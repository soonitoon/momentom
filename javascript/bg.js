const body = document.querySelector("body");
const UNSPLASH_API_KEY = "PDe-zjoECeto35laG7vlHXqRbi72rij-hMVKcZNrFjk";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape`;

function getImage() {
    fetch(UNSPLASH_URL)
        .then((response) => response.json())
        .then((json) => {
            const url = json.urls.full;
            if (url) {
                const img = new Image();
                img.src = url;
                body.appendChild(img);
            } else {
                getImage();
            }     
    });
}

 getImage();