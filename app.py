from flask import Flask, json, render_template

app = Flask(__name__)
API_KEYS_F = "config/keys.json"

with open(API_KEYS_F, "r") as keys_f:
    API_KEYS = json.load(keys_f)

MAPS_API = API_KEYS["maps_api"]

# Tuples stored are of the following format:
# (Cateygory search label,
#  Google Places API search type,
#  Font Awesome icon label)
SEARCH_TYPES = [
    ("Restaurants", "restaurant", "fa-cutlery"),
    ("Stores", "store", "fa-shopping-bag"),
    ("Subway Stations", "subway_station", "fa-subway")
]


@app.route('/')
def index():
    return render_template("index.html", MAPS_API=MAPS_API,
                           SEARCH_TYPES=SEARCH_TYPES)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
