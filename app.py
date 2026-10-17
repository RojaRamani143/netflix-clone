from flask import Flask, render_template, jsonify

app = Flask(__name__)

movies = [
    {
        "id": 1,
        "title": "Pushpa 2: The Rule",
        "hero": "Allu Arjun",
        "genre": "Action",
        "year": 2024,
        "rating": "8.2",
        "image": "pushpa2.jpg",
        "description": "Pushpa Raj returns in an action-packed battle for power and respect."
    },
    {
        "id": 2,
        "title": "Devara",
        "hero": "Jr. NTR",
        "genre": "Action",
        "year": 2024,
        "rating": "7.8",
        "image": "devara.jpg",
        "description": "A fearless warrior fights to protect his people."
    },
    {
        "id": 3,
        "title": "Salaar",
        "hero": "Prabhas",
        "genre": "Action",
        "year": 2023,
        "rating": "8.1",
        "image": "salaar.jpg",
        "description": "Two childhood friends become involved in a violent power struggle."
    },
    {
        "id": 4,
        "title": "Kalki 2898 AD",
        "hero": "Prabhas",
        "genre": "Sci-Fi",
        "year": 2024,
        "rating": "8.4",
        "image": "kalki.jpg",
        "description": "A futuristic adventure inspired by Indian mythology."
    },
    {
        "id": 5,
        "title": "Game Changer",
        "hero": "Ram Charan",
        "genre": "Action",
        "year": 2025,
        "rating": "7.5",
        "image": "gamechanger.jpg",
        "description": "An honest officer challenges corruption and injustice."
    },
    {
        "id": 6,
        "title": "Guntur Kaaram",
        "hero": "Mahesh Babu",
        "genre": "Drama",
        "year": 2024,
        "rating": "7.6",
        "image": "gunturkaaram.jpg",
        "description": "A family drama filled with emotion and action."
    },
    {
        "id": 7,
        "title": "They Call Him OG",
        "hero": "Pawan Kalyan",
        "genre": "Action",
        "year": 2025,
        "rating": "8.0",
        "image": "og.jpg",
        "description": "A powerful gangster returns to confront his enemies."
    },
    {
        "id": 8,
        "title": "HIT: The Third Case",
        "hero": "Nani",
        "genre": "Thriller",
        "year": 2025,
        "rating": "8.1",
        "image": "hit3.jpg",
        "description": "A determined police officer investigates a dangerous case."
    },
    {
        "id": 9,
        "title": "Dasara",
        "hero": "Nani",
        "genre": "Action",
        "year": 2023,
        "rating": "8.0",
        "image": "dasara.jpg",
        "description": "A gripping story of friendship, love and revenge."
    },
    {
        "id": 10,
        "title": "Rangasthalam",
        "hero": "Ram Charan",
        "genre": "Drama",
        "year": 2018,
        "rating": "8.5",
        "image": "rangasthalam.jpg",
        "description": "A village drama about courage and fighting injustice."
    },
    {
        "id": 11,
        "title": "RRR",
        "hero": "Ram Charan & Jr. NTR",
        "genre": "Action",
        "year": 2022,
        "rating": "8.8",
        "image": "rrr.jpg",
        "description": "Two revolutionaries join forces in an epic adventure."
    },
    {
        "id": 12,
        "title": "Baahubali",
        "hero": "Prabhas",
        "genre": "Fantasy",
        "year": 2015,
        "rating": "8.7",
        "image": "bahubali.jpg",
        "description": "A legendary warrior discovers his royal destiny."
    }
]


@app.route("/")
def home():
    return render_template("index.html", movies=movies)


@app.route("/api/movies")
def get_movies():
    return jsonify(movies)


@app.route("/health")
def health():
    return jsonify({"status": "healthy"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
