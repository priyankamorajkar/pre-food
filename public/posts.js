const posts = [
            {
                id: 1,
                title: "Strawberries are the only fruit with seeds on the outside.",
                content: "An individual strawberry boasts about 200 seeds on the outside of its skin. They also aren’t exactly berries- they’re what’s known as “accessory fruits”, meaning that they don’t come from a single ovary.",
                category: "funfact",
                image: "images/strawberry.jpg"

            },
            {
                id: 2,
                title: "Fresh eggs sink.",
                content: "Do the test! Typical egg shelf life is anywhere from 4-5 weeks, but don’t trust the date stamped on the carton. Eggshells become more porous as they age;  allowing air to enter into the air sac of the egg. Any egg that floats needs to be tossed in the garbage immediately to prevent it from making you sick!",
                category: "funfact",
                image: "images/eggs.jpg"

            },
            {
                id: 3,
                title: "Pineapple eats your mouth.",
                content: "The enzyme bromelain breaks down proteins, including those found in your mouth and body. If your mouth tingles and burns when you eat pineapple, you’re extra sensitive to bromelain’s effects. Interestingly, cooking pineapple reduces the effects due to the chemical reaction that occurs. ",
                category: "funfact",
                image: "images/pineapple.jpg"
            },
            {
                id: 4,
                title: "How To Make Rotis Soft",
                content: "Knead the dough with warm water. You can also do the finger test after kneading the dough, just poke the dough slightly with one finger, and if it feels soft, then you are good to go! Make sure to rest the dough for at least 15 minutes before cooking!",
                category: "tips",
                image: "images/roti.jpg"
            },
            {
                id: 5,
                title: "How To Peel Garlic Quickly",
                content: "You can first peel a lot of garlic together and blend a paste out of it. Then add it in a ziplock and store it in the freezer. If you want to make your garlic peeling time faster then add the garlic buds in an container and shake them so that the skin comes out from the pods. ",
                category: "tips",
                image: "images/garlic.jpg"
            },
            {
                id: 6,
                title: "Chickpeas and almonds contains almost as much protein as steak",
                content: '"If you follow a vegetarian or vegan diet, as long as you eat a wide variety of foods, you can usually get the protein you need." While eating 100g of steak could contain up to 25g of protein, the same amount of chick peas contains 21g and almonds a whopping 28g!',
                category: "funfact",
                image: "images/chickenpeas.jpg"
            },
            {
                id: 7,
                title: "How To Reduce Excess Salt In Curries",
                content: "There are high chances that you might get the measurements wrong sometimes. And in that process, most of us usually add extra salt to our food. So if you are looking for a way to neutralize that extra salt, you can either add milk or malai to it-that way, the taste of the salt is reduced.",
                category: "tips",
                image: "images/highsalt.jpg"
            },
            {
                id: 8,
                title: "How to make crispy pooris",
                content: "Do your pooris also get a little soggy after cooking it? If they do, simply add rava to your dough as it helps the pooris be crispy and tasty.",
                category: "tips",
                image: "images/puri.jpg"
            }
        ];

        function displayPosts(posts) {
            const postsContainer = document.getElementById("posts-container");

            postsContainer.innerHTML = "";

            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.classList.add("card");
                postElement.innerHTML = `
                    <div class="bg"></div>
                    <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                        <img src="${post.image}" class="card-img-top" alt="${post.title}">
                        <div class="card-body">
                            
                            <p class="card-text">${post.content}</p>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postElement);
            });
        }

        function filterPostsByCategory(category) {
            let filteredPosts = posts;

            if (category !== "all") {
                filteredPosts = posts.filter(post => post.category === category);
            }

            displayPosts(filteredPosts);
        }

        function searchPosts() {
            const searchInput = document.getElementById("search-input");
            const searchTerm = searchInput.value.toLowerCase();

            let filteredPosts = posts;

            if (searchTerm) {
                filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm) || post.content.toLowerCase().includes(searchTerm));
            }

            displayPosts(filteredPosts);
        }

        const categories = document.querySelectorAll(".category");
        categories.forEach(category => category.addEventListener("click", e => {
            e.preventDefault();
            const selectedCategory = category.getAttribute("data-value");
            filterPostsByCategory(selectedCategory);
        }));

        const searchInput = document.getElementById("search-input");
        searchInput.addEventListener("keyup", searchPosts);

        displayPosts(posts);