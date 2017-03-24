from flask import Flask, json, render_template

app = Flask(__name__)
API_KEYS_F = "config/keys.json"

with open(API_KEYS_F, "r") as keys_f:
    API_KEYS = json.load(keys_f)

MAPS_API = API_KEYS["maps_api"]


@app.route('/')
def index():
    return render_template("index.html", MAPS_API=MAPS_API)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
