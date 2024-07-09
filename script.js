const apikeyy = '06f2a7988c984a608e12e2526d95488e';
const blogcontainer = document.getElementById("blogcontainer");
const searchfield = document.getElementById('searchinput');
const searchbtn = document.getElementById('searchbtn');
const fallbackImage = 'https://via.placeholder.com/400x200.png?text=Advertisement'; // Placeholder image URL for Google advertisement

// Fallback data in case the API request fails
const fallbackArticles = [
    {
        title: "Discover the Latest Tech Trends",
        description: "Stay updated with the newest advancements in technology. Click to learn more.",
        urlToImage: 'https://source.unsplash.com/random/400x200?technology',
        url: "https://example.com/tech-trends"
    },
    {
        title: "Exclusive Travel Deals",
        description: "Find the best travel deals and discounts for your next vacation.",
        urlToImage: 'https://source.unsplash.com/random/400x200?travel',
        url: "https://example.com/travel-deals"
    },
    {
        title: "Boost Your Business with These Tips",
        description: "Learn how to take your business to the next level with expert advice.",
        urlToImage: 'https://source.unsplash.com/random/400x200?business',
        url: "https://example.com/business-tips"
    }
];

searchbtn.addEventListener("click", async () => {
    const query = searchfield.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchnewsquery(query);
            displayblog(articles);
        } catch (error) {
            console.error("Error fetching news by query", error);
            displayblog(fallbackArticles); // Display fallback data on error
        }
    }
});

async function fetchnewsquery(query) {
    try {
        const apiupi = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikeyy}`;
        const response = await fetch(apiupi);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query:", error);
        return fallbackArticles; // Return fallback data on error
    }
}

async function fetchRandomNews() {
    try {
        const apiupi = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apikeyy}`;
        const response = await fetch(apiupi);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news:", error);
        return fallbackArticles; // Return fallback data on error
    }
}

function displayblog(articles) {
    blogcontainer.innerHTML = "";
    if (articles && articles.length > 0) {
        articles.forEach((article) => {
            const blogcard = document.createElement("div");
            blogcard.classList.add("blogcard");

            const img = document.createElement("img");
            img.src = article.urlToImage || fallbackImage;
            img.alt = article.title || 'No image available';
            img.onerror = function() {
                this.onerror = null; // Prevent infinite loop if fallback image also fails
                this.src = fallbackImage;
            };

            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
            title.textContent = truncatedTitle;

            const description = document.createElement("p");
            const truncatedDescription = article.description && article.description.length > 120 ? article.description.slice(0, 120) + "..." : article.description;
            description.textContent = truncatedDescription;

            blogcard.appendChild(img);
            blogcard.appendChild(title);
            blogcard.appendChild(description);

            blogcard.addEventListener('click', () => {
                window.open(article.url, "_blank"); // Open article in a new tab
            });

            blogcontainer.appendChild(blogcard);
        });
    } else {
        const noData = document.createElement("p");
        noData.textContent = "No articles available.";
        blogcontainer.appendChild(noData);
    }
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayblog(articles);
    } catch (error) {
        console.error("Error displaying blog:", error);
        displayblog(fallbackArticles); // Display fallback data on error
    }
})();





