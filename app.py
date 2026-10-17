from flask import Flask, render_template, jsonify

app = Flask(__name__)

MOVIES = [
    {"id":1,"title":"Pushpa 2: The Rule","year":2024,"genre":"Action","rating":"8.1","duration":"3h 20m","tag":"TRENDING #1","palette":"fire","initial":"P2","description":"A fearless smuggler faces new rivals as his empire grows.","emoji":"🔥"},
    {"id":2,"title":"RRR","year":2022,"genre":"Action","rating":"8.7","duration":"3h 7m","tag":"BLOCKBUSTER","palette":"ocean","initial":"RRR","description":"Two legendary revolutionaries form an unforgettable friendship.","emoji":"⚡"},
    {"id":3,"title":"Kalki 2898 AD","year":2024,"genre":"Sci-Fi","rating":"8.0","duration":"3h 1m","tag":"SCI-FI HIT","palette":"violet","initial":"K","description":"A futuristic adventure where mythology meets science fiction.","emoji":"🚀"},
    {"id":4,"title":"Devara: Part 1","year":2024,"genre":"Action","rating":"7.3","duration":"2h 58m","tag":"FAN FAVORITE","palette":"teal","initial":"D","description":"A coastal warrior's legend unfolds across generations.","emoji":"🌊"},
    {"id":5,"title":"Hi Nanna","year":2023,"genre":"Romance","rating":"8.2","duration":"2h 35m","tag":"FEEL GOOD","palette":"rose","initial":"HN","description":"A touching story about family, love, and second chances.","emoji":"💗"},
    {"id":6,"title":"Hanu-Man","year":2024,"genre":"Fantasy","rating":"8.0","duration":"2h 38m","tag":"SUPERHERO","palette":"gold","initial":"HM","description":"An ordinary young man discovers extraordinary powers.","emoji":"✨"},
    {"id":7,"title":"Lucky Baskhar","year":2024,"genre":"Thriller","rating":"8.1","duration":"2h 30m","tag":"TOP PICK","palette":"emerald","initial":"LB","description":"An ambitious banker takes risks that change everything.","emoji":"💸"},
    {"id":8,"title":"Sita Ramam","year":2022,"genre":"Romance","rating":"8.5","duration":"2h 43m","tag":"ROMANTIC","palette":"sunset","initial":"SR","description":"A timeless romance told through letters and memories.","emoji":"💌"},
    {"id":9,"title":"Salaar: Part 1","year":2023,"genre":"Action","rating":"7.8","duration":"2h 55m","tag":"ACTION","palette":"steel","initial":"S","description":"An old friendship collides with a violent kingdom.","emoji":"⚔️"},
    {"id":10,"title":"Jersey","year":2019,"genre":"Drama","rating":"8.5","duration":"2h 40m","tag":"INSPIRING","palette":"blue","initial":"J","description":"A former cricketer makes one last attempt at his dream.","emoji":"🏏"},
    {"id":11,"title":"Mahanati","year":2018,"genre":"Drama","rating":"8.4","duration":"2h 57m","tag":"CLASSIC","palette":"plum","initial":"M","description":"The extraordinary life of a beloved cinema icon.","emoji":"🎞️"},
    {"id":12,"title":"Eega","year":2012,"genre":"Fantasy","rating":"8.0","duration":"2h 25m","tag":"CULT FAVORITE","palette":"lime","initial":"E","description":"An inventive revenge tale with a tiny hero.","emoji":"🪰"},
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/movies')
def movies():
    return jsonify(MOVIES)

@app.route('/health')
def health():
    return jsonify(status='ok', app='CineTelugu')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
