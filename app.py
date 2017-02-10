from flask import Flask, json, render_template

app = Flask(__name__)
API_KEYS_F = "config/keys.json"
with open(API_KEYS_F, "r") as keys_f:
    API_KEYS = json.load(keys_f)


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
