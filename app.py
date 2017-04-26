from flask import Flask, json, render_template

app = Flask(__name__)
API_KEYS_F = "config/keys.json"

with open(API_KEYS_F, "r") as keys_f:
    API_KEYS = json.load(keys_f)

MAPS_API = API_KEYS["maps_api"]

SEARCH_TYPES = [
    ("Restaurants", "restaurant"),
    ("Stores", "store")
]


@app.route('/')
def index():
    return render_template("index.html", MAPS_API=MAPS_API,
                           SEARCH_TYPES=SEARCH_TYPES)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
