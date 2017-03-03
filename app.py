from flask import Flask, json, render_template

app = Flask(__name__)
API_KEYS_F = "config/keys.json"

with open(API_KEYS_F, "r") as keys_f:
    API_KEYS = json.load(keys_f)

MAPS_API = API_KEYS["maps_api"]
PLACES_API = API_KEYS["places_api"]


@app.route('/')
def index():
    return render_template("index.html", maps_api=MAPS_API, places_api=PLACES_API)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
